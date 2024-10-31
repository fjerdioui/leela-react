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
  date: {
    start: string;
    end: string;
  };
  description: string;
  ticketLink: string;
  source: string;
  thumbnailImage?: string;
}

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
  dates: {
    start: {
      localDate: string;
      localTime: string;
      dateTime: string;
    };
    end: {
      localTime: string;
      dateTime: string;
    };
    timezone: string;
    status: string;
  };
  sales: {
    startDateTime: string;
    endDateTime: string;
  };
}
