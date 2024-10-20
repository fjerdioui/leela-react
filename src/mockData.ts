const mockEvents = [
  {
    id: "1",
    name: "Party 1",
    address: "Covent Garden",
    musicStyle: "Pop",
    price: 20,
    location: { lat: 51.5113, lon: -0.1233 },
    description: "A fun pop music party in the heart of London.",
    ticketLink: "https://example.com/party1-tickets"
  },
  {
    id: "2",
    name: "Party 2",
    address: "Shoreditch",
    musicStyle: "House",
    price: 25,
    location: { lat: 51.527, lon: -0.078 },
    description: "House music extravaganza in Shoreditch.",
    ticketLink: "https://example.com/party2-tickets"
  },
  {
    id: "3",
    name: "Party 3",
    address: "Camden Town",
    musicStyle: "Rock",
    price: 18,
    location: { lat: 51.539, lon: -0.142 },
    description: "A rocking party in the vibrant Camden Town.",
    ticketLink: "https://example.com/party3-tickets"
  },
  {
    id: "4",
    name: "Party 4",
    address: "Brixton",
    musicStyle: "Reggae",
    price: 22,
    location: { lat: 51.463, lon: -0.1145 },
    description: "Reggae vibes and a chill night in Brixton.",
    ticketLink: "https://example.com/party4-tickets"
  },
  {
    id: "5",
    name: "Party 5",
    address: "Notting Hill",
    musicStyle: "Jazz",
    price: 30,
    location: { lat: 51.5096, lon: -0.206 },
    description: "Smooth jazz night in Notting Hill.",
    ticketLink: "https://example.com/party5-tickets"
  },
  {
    id: "6",
    name: "Party 6",
    address: "Greenwich",
    musicStyle: "Electronic",
    price: 35,
    location: { lat: 51.482, lon: -0.005 },
    description: "A high-energy electronic music party in Greenwich.",
    ticketLink: "https://example.com/party6-tickets"
  },
  {
    id: "7",
    name: "Party 7",
    address: "Clapham",
    musicStyle: "Hip-Hop",
    price: 15,
    location: { lat: 51.461, lon: -0.138 },
    description: "Hip-Hop beats in Clapham all night long.",
    ticketLink: "https://example.com/party7-tickets"
  },
  {
    id: "8",
    name: "Party 8",
    address: "Chelsea",
    musicStyle: "Classical",
    price: 40,
    location: { lat: 51.487, lon: -0.168 },
    description: "A night of classical music in Chelsea.",
    ticketLink: "https://example.com/party8-tickets"
  },
  {
    id: "9",
    name: "Party 9",
    address: "Islington",
    musicStyle: "Indie",
    price: 28,
    location: { lat: 51.536, lon: -0.105 },
    description: "An indie music night in Islington.",
    ticketLink: "https://example.com/party9-tickets"
  },
  {
    id: "10",
    name: "Party 10",
    address: "Soho",
    musicStyle: "Disco",
    price: 25,
    location: { lat: 51.5145, lon: -0.1314 },
    description: "A groovy disco night in Soho.",
    ticketLink: "https://example.com/party10-tickets"
  },
  {
    id: "11",
    name: "Party 11",
    address: "Hackney",
    musicStyle: "Garage",
    price: 20,
    location: { lat: 51.546, lon: -0.058 },
    description: "An underground garage music event in Hackney.",
    ticketLink: "https://example.com/party11-tickets"
  },
  {
    id: "12",
    name: "Party 12",
    address: "Kings Cross",
    musicStyle: "Techno",
    price: 30,
    location: { lat: 51.530, lon: -0.123 },
    description: "A night of heavy techno beats in Kings Cross.",
    ticketLink: "https://example.com/party12-tickets"
  },
  {
    id: "13",
    name: "Party 13",
    address: "Wimbledon",
    musicStyle: "Funk",
    price: 22,
    location: { lat: 51.421, lon: -0.205 },
    description: "Funky tunes and a dance-filled night in Wimbledon.",
    ticketLink: "https://example.com/party13-tickets"
  },
  {
    id: "14",
    name: "Party 14",
    address: "Hampstead",
    musicStyle: "Blues",
    price: 35,
    location: { lat: 51.555, lon: -0.176 },
    description: "A blues night in the peaceful Hampstead area.",
    ticketLink: "https://example.com/party14-tickets"
  },
  {
    id: "15",
    name: "Party 15",
    address: "Chiswick",
    musicStyle: "Soul",
    price: 25,
    location: { lat: 51.491, lon: -0.256 },
    description: "A soulful evening in Chiswick.",
    ticketLink: "https://example.com/party15-tickets"
  },
  {
    id: "16",
    name: "Party 16",
    address: "Fulham",
    musicStyle: "Drum & Bass",
    price: 27,
    location: { lat: 51.481, lon: -0.195 },
    description: "Drum & Bass vibes all night in Fulham.",
    ticketLink: "https://example.com/party16-tickets"
  },
  {
    id: "17",
    name: "Party 17",
    address: "Richmond",
    musicStyle: "Country",
    price: 18,
    location: { lat: 51.461, lon: -0.304 },
    description: "A country music night in Richmond.",
    ticketLink: "https://example.com/party17-tickets"
  },
  {
    id: "18",
    name: "Party 18",
    address: "Westminster",
    musicStyle: "Jazz",
    price: 40,
    location: { lat: 51.501, lon: -0.124 },
    description: "A smooth jazz evening in Westminster.",
    ticketLink: "https://example.com/party18-tickets"
  },
  {
    id: "19",
    name: "Party 19",
    address: "Southwark",
    musicStyle: "Folk",
    price: 16,
    location: { lat: 51.503, lon: -0.091 },
    description: "A cozy folk music night in Southwark.",
    ticketLink: "https://example.com/party19-tickets"
  },
  {
    id: "20",
    name: "Party 20",
    address: "Kensington",
    musicStyle: "Opera",
    price: 50,
    location: { lat: 51.499, lon: -0.193 },
    description: "A night of operatic performances in Kensington.",
    ticketLink: "https://example.com/party20-tickets"
  }
];

// Mock data for settings
// const mockSettings = {
//   theme: "light",
//   notifications: true,
//   language: "English",
// };

export default mockEvents;
