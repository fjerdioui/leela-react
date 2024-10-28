// src/components/EventList.tsx
import React, { useEffect, useRef } from "react";
import { Event } from "../types";

interface EventListProps {
  events: Event[];
  selectedEventId: string | null;
  onEventSelect: (id: string) => void;
  onNameClick: (id: string) => void;
}

const EventList: React.FC<EventListProps> = ({ events, selectedEventId, onEventSelect, onNameClick }) => {
  const listItemRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  useEffect(() => {
    if (selectedEventId && listItemRefs.current[selectedEventId]) {
      listItemRefs.current[selectedEventId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedEventId]);

  return (
    <ul className="event-list">
      {events.map((event: Event) => (
        <li
          key={event._id}
          ref={(el) => (listItemRefs.current[event._id] = el)}
          onClick={() => onEventSelect(event._id)}
          className={`event-item ${selectedEventId === event._id ? "highlighted" : ""}`}
        >
          <div className="event-item-content">
            <h3
              className="event-item-name"
              style={{ cursor: 'pointer', color: 'blue' }}
              onClick={(e) => {
                e.stopPropagation();
                onNameClick(event._id);
              }}
            >
              {event.name}
            </h3>
            <p className="event-item-info">
              {event.musicStyle} - £{event.price}
            </p>
            <p className="event-item-date">
              {event.date.start.toLocaleString()} - {event.date.end.toLocaleString()}
            </p>
            <p className="event-item-description">{event.description}</p>
            <a href={event.ticketLink} target="_blank" rel="noopener noreferrer" className="event-item-link">
              Buy Tickets
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default EventList;
