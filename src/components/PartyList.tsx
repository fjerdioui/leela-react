import React, { useEffect, useRef, useState } from "react";
import { Event } from "../types";

interface PartyListProps {
  selectedPartyId: string | null;
  onPartySelect: (id: string) => void;
}

const PartyList: React.FC<PartyListProps> = ({
  selectedPartyId,
  onPartySelect,
}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const listItemRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  useEffect(() => {
    // Fetch events from your backend API connected to MongoDB
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/getEvents'); // Adjust this endpoint if necessary
        const eventsList = await response.json();
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
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedPartyId]);

  return (
    <ul className="party-list">
      {events.map((event: Event) => (
        <li
          key={event.id}
          ref={(el) => (listItemRefs.current[event.id] = el)}
          onClick={() => onPartySelect(event.id)}
          className={`party-item ${selectedPartyId === event.id ? "highlighted" : ""}`}
        >
          <div className="party-item-content">
            <h3 className="party-item-name">{event.name}</h3>
            <p className="party-item-info">
              {event.musicStyle} - £{event.price}
            </p>
            <p className="party-item-description">{event.description}</p>
            <a
              href={event.ticketLink}
              target="_blank"
              rel="noopener noreferrer"
              className="party-item-link"
            >
              Buy Tickets
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PartyList;
