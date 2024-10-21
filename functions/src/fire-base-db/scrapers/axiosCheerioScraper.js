const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeSource2() {
  const { data } = await axios.get('https://another-example.com/events-london');
  const $ = cheerio.load(data);

  const events = [];
  $('.event-item').each((index, element) => {
    const name = $(element).find('.title').text();
    const date = $(element).find('.date').text();
    const venue = $(element).find('.venue').text();
    const price = $(element).find('.price').text();
    const ticketLink = $(element).find('.ticket-link').attr('href');
    events.push({ name, date, venue, price, ticketLink });
  });

  return events;
}

module.exports = axiosCheerioScraper;
