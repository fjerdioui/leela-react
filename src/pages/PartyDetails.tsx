// party-app/src/pages/PartyDetails.tsx
import React from "react";

interface Event {
  id: string;
  name: string;
  address: string;
  musicStyle: string;
  price: number;
  location: {
    lat: number;
    lon: number;
  };
}

interface PartyDetailsProps {
  event: Event | null;
}

const PartyDetails: React.FC<PartyDetailsProps> = ({ event }) => {
  if (!event) {
    return (
      <div>Please select a party from the map or list to see the details.</div>
    );
  }

  return (
    <div>
      <h1>{event.name}</h1>
      <p>
        <strong>Address:</strong> {event.address}
      </p>
      <p>
        <strong>Music Style:</strong> {event.musicStyle}
      </p>
      <p>
        <strong>Price:</strong> £{event.price}
      </p>
    </div>
  );
};

export default PartyDetails;
