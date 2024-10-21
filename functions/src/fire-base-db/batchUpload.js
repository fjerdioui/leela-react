const scrapeSource1 = require('./scrapers/puppeteerScrap');
const scrapeSource2 = require('./scrapers/axiosCheerioScraper');
const consolidateEvents = require('./consolidation');
const { db } = require('./firebaseConfig');

async function batchUpload() {
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
    console.log('Data successfully uploaded to Firestore!');
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}

batchUpload();
