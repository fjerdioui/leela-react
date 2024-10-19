import React from 'react';
import { useParams } from 'react-router-dom';
import events from '../mockData';

const PartyDetails: React.FC = () => {
  const { id } = useParams();
  const event = events.find((event) => event.id === id);

  return (
    <div>
      <h1>{event?.name}</h1>
      <p>{event?.address}</p>
      <p>{event?.musicStyle}</p>
      <p>{event?.price}</p>
    </div>
  );
};

export default PartyDetails;
