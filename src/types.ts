export interface Event {
  id: string;
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
}
