const admin = require('firebase-admin');
const serviceAccount = require('./leela-b1fe9-firebase-adminsdk-6pdtm-3f1da12c6b.json');  // Adjust the path as necessary
const data = require('./Events.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const batchUpload = async () => {
  const batch = db.batch();
  const collectionRef = db.collection('events');

  data.forEach(event => {
    const docRef = collectionRef.doc(); // Auto-generate an ID
    batch.set(docRef, event);
  });

  await batch.commit();
  console.log('Batch upload completed successfully.');
};

batchUpload().catch(console.error);
