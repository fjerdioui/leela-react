const puppeteer = require('puppeteer');

async function scrapeSource1() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com/london-events');

  const events = await page.evaluate(() => {
    const eventElements = document.querySelectorAll('.event-card');
    return Array.from(eventElements).map(event => ({
      name: event.querySelector('.event-title').innerText,
      date: event.querySelector('.event-date').innerText,
      venue: event.querySelector('.event-venue').innerText,
      price: event.querySelector('.event-price').innerText,
      ticketLink: event.querySelector('.event-ticket-link').href,
    }));
  });

  await browser.close();
  return events;
}

module.exports = puppeteerScrap;
