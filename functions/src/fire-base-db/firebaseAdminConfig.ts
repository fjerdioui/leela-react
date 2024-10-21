import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

// Import your service account JSON object
import * as serviceAccountKey from './leela-b1fe9-firebase-adminsdk-6pdtm-3f1da12c6b.json';

// Initialize Firebase admin with the correct type
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as ServiceAccount),
  databaseURL: 'https://<your-project-id>.firebaseio.com',
});

// Initialize Firestore (Admin SDK)
const db = getFirestore();

export { db };
