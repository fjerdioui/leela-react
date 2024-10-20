import * as admin from 'firebase-admin';
import * as fs from 'fs';

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert('./path/to/serviceAccountKey.json'), // Path to your service account key
});

const db = admin.firestore();

// Read and parse JSON data
const eventsData = JSON.parse(fs.readFileSync('./events.json', 'utf8'));

interface Event {
  name: string;
  address: string;
  musicStyle: string;
  price: number;
  location: {
    _latitude: number;
    _longitude: number;
  };
  description: string;
  ticketLink: string;
}

// Batch upload function
const batchUpload = async () => {
  const batch = db.batch();

  try {
    (eventsData as Event[]).forEach((event) => {
      const docRef = db.collection('events').doc(); // Auto-generate ID
      batch.set(docRef, event);
    });

    await batch.commit();
    console.log('Batch upload completed successfully.');
  } catch (error) {
    console.error('Error during batch upload:', error);
  }
};

// Call the upload function
batchUpload();
