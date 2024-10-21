const admin = require('firebase-admin');
const fetch = require('node-fetch');

const db = admin.firestore();

const EVENTBRITE_TOKEN = 'your-eventbrite-api-token';

const fetchEventbriteEvents = async () => {
  const response = await fetch(
    `https://www.eventbriteapi.com/v3/events/search/?location.address=
    London&location.within=10km&token=${EVENTBRITE_TOKEN}`
  );
  const data = await response.json();
  const events = data.events;

  for (const event of events) {
    const eventId = `${event.name.text}-${event.venue ? event.venue.latitude : ''}
    -${event.venue ? event.venue.longitude : ''}`; // Create unique event ID

    const existingEventSnapshot = await db.collection('events').doc(eventId).get();
    const existingEvent = existingEventSnapshot.exists ? existingEventSnapshot.data() : null;

    const eventData = {
      name: event.name.text,
      address: event.venue ? event.venue.address.localized_address_display : 'Unknown',
      location: event.venue ? new admin.firestore.GeoPoint(event.venue.latitude, event.venue.longitude) : null,
      description:
        existingEvent && existingEvent.description
          ? existingEvent.description
          : event.description
            ? event.description.text
            : '',
      ticketLink: existingEvent && existingEvent.ticketLink ? existingEvent.ticketLink : event.url,
      musicStyle: existingEvent && existingEvent.musicStyle ? existingEvent.musicStyle : 'Varies',
      price: event.is_free ? 'Free' : 'Paid',
      source: existingEvent ? existingEvent.source + ', Eventbrite' : 'Eventbrite', // Merge sources
    };

    await db.collection('events').doc(eventId).set(eventData);
    console.log(`Added or updated event: ${eventData.name}`);
  }
};
