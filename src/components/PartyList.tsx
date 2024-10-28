// src/components/PartyList.tsx
import React, { useEffect, useRef } from "react";
import { Event } from "../types";

interface PartyListProps {
  events: Event[];
  selectedPartyId: string | null;
  onPartySelect: (id: string) => void;
}

const PartyList: React.FC<PartyListProps> = ({ events, selectedPartyId, onPartySelect }) => {
  const listItemRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  useEffect(() => {
    if (selectedPartyId && listItemRefs.current[selectedPartyId]) {
      listItemRefs.current[selectedPartyId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedPartyId]);

  return (
    <ul className="party-list">
      {events.map((event: Event) => (
        <li
          key={event._id}
          ref={(el) => (listItemRefs.current[event._id] = el)}
          onClick={() => onPartySelect(event._id)}
          className={`party-item ${selectedPartyId === event._id ? "highlighted" : ""}`}
        >
          <div className="party-item-content">
            <h3 className="party-item-name">{event.name}</h3>
            <p className="party-item-info">
              {event.musicStyle} - £{event.price}
            </p>
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
