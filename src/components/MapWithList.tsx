import React, { useEffect, useState } from "react";
import EventMap from "./EventMap";
import EventList from "./EventList";
import { EventDetails } from "../types";

interface MapWithListProps {
  selectedEventId: string | null;
  setSelectedEventId: (id: string | null) => void;
}

const MapWithList: React.FC<MapWithListProps> = ({
  selectedEventId,
  setSelectedEventId,
}) => {
  const [events, setEvents] = useState<EventDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/events`);
        const eventsList = await response.json();
        setEvents(eventsList);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [API_BASE_URL]);

  const handleMapClick = (id: string) => {
    setSelectedEventId(id);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="phone-and-list-container">
      <div className="phone-frame">
        {events.length > 0 ? (
          <EventMap
            events={events}
            selectedEventId={selectedEventId}
            onMapClick={handleMapClick}
          />
        ) : (
          <div className="no-events">No events available.</div>
        )}
      </div>
      <div className="list-container">
        <EventList
          events={events}
          selectedEventId={selectedEventId}
          onEventSelect={setSelectedEventId}
          onNameClick={(id: string) => `/eventDetails/${id}`}
        />
      </div>
    </div>
  );
};

export default MapWithList;
