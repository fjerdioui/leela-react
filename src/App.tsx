// party-app/src/App.tsx
import React, { useState, useEffect } from "react";
import "./styles/layout/_layout.scss";
import "./styles/theme/_colors.scss";

import PartyList from "./components/PartyList";
import EventMap from "./components/EventMap";
import mockData from "./mockData";

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

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  useEffect(() => {
    setEvents(mockData);
  }, []);

  const handleEventSelect = (eventId: string) => {
    setSelectedEvent(eventId);
  };

  return (
    <div style={{ display: "flex" }}>
      <EventMap
        events={events}
        selectedEvent={selectedEvent}
        onSelectEvent={handleEventSelect}
      />
      <PartyList
        events={events}
        selectedEvent={selectedEvent}
        onSelectEvent={handleEventSelect}
      />
    </div>
  );
};

export default App;
