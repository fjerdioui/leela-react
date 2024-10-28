// src/components/MapWithList.tsx
import React, { useEffect, useState } from "react";
import EventMap from "./EventMap";
import PartyList from "./PartyList";
import { Event } from "../types";
// import { mockEvents } from "../mockData"; // Uncomment to switch to mock data

interface MapWithListProps {
  selectedPartyId: string | null;
  setSelectedPartyId: (id: string | null) => void;
}

const MapWithList: React.FC<MapWithListProps> = ({
  selectedPartyId,
  setSelectedPartyId,
}) => {
  const [events, setEvents] = useState<Event[]>([]); // Default to empty array
  const [loading, setLoading] = useState<boolean>(true);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/events`);
        const eventsList = await response.json();
        setEvents(eventsList); // Set real data
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]); // Set to empty if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [API_BASE_URL]);

  const handleMapClick = (id: string) => {
    setSelectedPartyId(id);
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
            selectedPartyId={selectedPartyId}
            onMapClick={handleMapClick}
          />
        ) : (
          <div className="no-events">No events available.</div> // Message if no events
        )}
      </div>
      <div className="list-container">
        <PartyList
          events={events}
          selectedPartyId={selectedPartyId}
          onPartySelect={setSelectedPartyId}
        />
      </div>
    </div>
  );
};

export default MapWithList;
