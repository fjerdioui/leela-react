import React from 'react';
import mockEvents from '../mockData';
import { Event } from '../types';

interface PartyListProps {
  onPartySelect: (id: string) => void;
}

const PartyList: React.FC<PartyListProps> = ({ onPartySelect }) => {
  return (
    <ul className="party-list">
      {mockEvents.map((event: Event) => (
        <li
          key={event.id}
          onClick={() => {
            onPartySelect(event.id);
          }}
          className="party-item"
        >
          {event.name} - {event.musicStyle} - £{event.price}
        </li>
      ))}
    </ul>
  );
};

export default PartyList;
