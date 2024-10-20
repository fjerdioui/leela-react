import React, { useEffect, useRef } from 'react';
import mockEvents from '../mockData';
import { Event } from '../types';

interface PartyListProps {
  selectedPartyId: string | null;
  onPartySelect: (id: string) => void;
}

const PartyList: React.FC<PartyListProps> = ({ selectedPartyId, onPartySelect }) => {
  const listItemRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  // Scroll the selected party into view whenever it's selected
  useEffect(() => {
    if (selectedPartyId && listItemRefs.current[selectedPartyId]) {
      listItemRefs.current[selectedPartyId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedPartyId]);

  return (
    <ul className="party-list">
      {mockEvents.map((event: Event) => (
        <li
          key={event.id}
          ref={el => (listItemRefs.current[event.id] = el)} // Store reference to each list item
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
