const admin = require('firebase-admin');
const fetch = require('node-fetch');

const db = admin.firestore();
const FACEBOOK_TOKEN = 'your-facebook-api-token';

const fetchFacebookEvents = async () => {
  const response = await fetch(
    `https://graph.facebook.com/v11.0/search?type=event&q=London&access_token=${FACEBOOK_TOKEN}`
  );
  const data = await response.json();
  const events = data.data;

  for (const event of events) {
    const eventId = `${event.name}-${event.place ? event.place.location.latitude : ''}-
    ${event.place ? event.place.location.longitude : ''}`; // Create unique event ID

    const existingEventSnapshot = await db.collection('events').doc(eventId).get();
    const existingEvent = existingEventSnapshot.exists ? existingEventSnapshot.data() : null;

    const eventData = {
      name: event.name,
      address: event.place ? event.place.name : 'Unknown',
      location: event.place
        ? new admin.firestore.GeoPoint(event.place.location.latitude, event.place.location.longitude)
        : null,
      description: existingEvent && existingEvent.description ? existingEvent.description : event.description || '',
      ticketLink:
        existingEvent && existingEvent.ticketLink
          ? existingEvent.ticketLink
          : event.id
            ? `https://www.facebook.com/events/${event.id}`
            : '',
      musicStyle: existingEvent && existingEvent.musicStyle ? existingEvent.musicStyle : 'Varies',
      price: existingEvent && existingEvent.price ? existingEvent.price : 'Unknown',
      source: existingEvent ? existingEvent.source + ', Facebook' : 'Facebook',
    };

    await db.collection('events').doc(eventId).set(eventData);
    console.log(`Added or updated event: ${eventData.name}`);
  }
};
