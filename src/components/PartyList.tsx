// party-app/src/components/PartyList.tsx
import React, { useEffect, useRef } from "react";
import "../styles/modules/_list.scss";

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

interface PartyListProps {
  events: Event[];
  selectedEvent: string | null;
  onSelectEvent: (id: string) => void;
}

const PartyList: React.FC<PartyListProps> = ({
  events,
  selectedEvent,
  onSelectEvent,
}) => {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (selectedEvent && listRef.current) {
      const selectedElement = document.getElementById(`party-${selectedEvent}`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [selectedEvent]);

  return (
    <ul
      ref={listRef}
      style={{ width: "35%", maxHeight: "100vh", overflowY: "auto" }}
    >
      {events.map((event) => (
        <li
          key={event.id}
          id={`party-${event.id}`}
          onClick={() => onSelectEvent(event.id)}
          style={{
            padding: "10px",
            cursor: "pointer",
            backgroundColor: selectedEvent === event.id ? "#f0f0f0" : "#fff",
          }}
        >
          {event.name} - {event.musicStyle}
        </li>
      ))}
    </ul>
  );
};

export default PartyList;
