import React, { useEffect, useRef } from 'react';
import mockEvents from '../mockData';
import { Event } from '../types';

interface PartyListProps {
  selectedPartyId: string | null;
  onPartySelect: (id: string) => void;
}

const PartyList: React.FC<PartyListProps> = ({ selectedPartyId, onPartySelect }) => {
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (selectedPartyId && listRef.current) {
      const selectedElement = document.getElementById(`party-item-${selectedPartyId}`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedPartyId]);

  return (
    <ul ref={listRef} className="party-list">
      {mockEvents.map((event: Event) => (
        <li
          key={event.id}
          id={`party-item-${event.id}`} // Assign a unique ID for scrolling
          onClick={() => onPartySelect(event.id)}
          className={`party-item ${selectedPartyId === event.id ? 'highlighted' : ''}`}
        >
          <div className="party-item-content">
            <h3 className="party-item-name">{event.name}</h3>
            <p className="party-item-info">{event.musicStyle} - £{event.price}</p>
            <p className="party-item-description">{event.description}</p>
            <a href={event.ticketLink} target="_blank" rel="noopener noreferrer" className="party-item-link">
              Buy Tickets
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PartyList;
