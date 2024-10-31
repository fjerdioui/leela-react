export interface EventDetails {
  _id: string;
  name: string;
  description: string;
  ticketLink: string;
  priceRanges: { min: number; max: number }[];
  classifications: {
    segment: string;
    genre: string;
    subGenre?: string;
  }[];
  images: {
    ratio: string;
    url: string;
    width: number;
    height: number;
    fallback: boolean;
  }[];
  venue: {
    name: string;
    address: string;
    location: {
      latitude: string;
      longitude: string;
    };
    city: string;
    country: string;
    postalCode: string;
  };
}
