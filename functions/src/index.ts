import * as functions from 'firebase-functions/v2'; // Firebase Functions import
import express, { Request, Response } from 'express'; // Correct Express import
import scrapeSource1 from './fire-base-db/scrapers/puppeteerScrap';
import scrapeSource2 from './fire-base-db/scrapers/axiosCheerioScraper';
import consolidateEvents from './fire-base-db/consolidation';
import { db } from './fire-base-db/firebaseAdminConfig'; // Ensure your Firebase Admin SDK is correctly configured

// Set up Express app
const app = express();

app.get('/manual-run', async (req: Request, res: Response) => {
  try {
    // Scrape from multiple sources
    const eventsSource1 = await scrapeSource1();
    const eventsSource2 = await scrapeSource2();

    // Consolidate data to remove duplicates
    const consolidatedEvents = consolidateEvents([eventsSource1, eventsSource2]);

    // Batch write to Firestore
    const batch = db.batch();
    consolidatedEvents.forEach(event => {
      const docRef = db.collection('events').doc(); // Auto-generate ID
      batch.set(docRef, event);
    });

    await batch.commit();
    res.status(200).send('Data successfully uploaded to Firestore!');
  } catch (error) {
    console.error('Error uploading data:', error);
    res.status(500).send('Error uploading data.');
  }
});

// Export the HTTP function
export const manualRunFunction = functions.https.onRequest(app);
