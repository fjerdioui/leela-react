import React, { useEffect, useRef, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Event } from '../types';

interface PartyListProps {
  selectedPartyId: string | null;
  onPartySelect: (id: string) => void;
}

const PartyList: React.FC<PartyListProps> = ({ selectedPartyId, onPartySelect }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const listItemRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const eventsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Event));
        setEvents(eventsList);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, []);

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
      {events.map((event: Event) => (
        <li
          key={event.id}
          ref={el => (listItemRefs.current[event.id] = el)}
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
