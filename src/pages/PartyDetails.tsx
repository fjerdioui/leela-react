// src/pages/PartyDetails.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { mockEvents } from "../mockData";

const PartyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const event = mockEvents.find((event) => event._id === id);

  return (
    <div>
      <h2>{event?.name}</h2>
      <p>Address: {event?.address}</p>
      <p>Music Style: {event?.musicStyle}</p>
      <p>Price: £{event?.price}</p>
    </div>
  );
};

export default PartyDetails;
