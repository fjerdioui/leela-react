// src/types.ts
export interface Event {
  _id: string;
  name: string;
  address: string;
  musicStyle: string;
  price: number;
  location: {
    lat: number;
    lon: number;
  };
  description: string;
  ticketLink: string;
  source: string;
}
