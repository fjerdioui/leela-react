// src/components/EventMap.tsx

import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "../styles/modules/_map.scss";

// Define the structure of each event
interface Event {
  id: string;
  name: string;
  location: {
    lat: number;
    lon: number;
  };
}

// Define the props for the EventMap component
interface EventMapProps {
  events: Event[]; // Array of events to display on the map
  selectedEvent?: string | null | undefined; // Optional selected event ID
  onSelectEvent: (id: string) => void; // Function to handle event selection
}

const EventMap: React.FC<EventMapProps> = ({
  events,
  selectedEvent,
  onSelectEvent,
}) => {
  const partyIcon = new L.Icon({
    iconUrl: "/party-icon.png",
    iconSize: [25, 25],
  });

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} className="map-container">
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
      {events.map((event) => (
        <Marker
          key={event.id}
          position={[event.location.lat, event.location.lon]}
          icon={partyIcon}
          eventHandlers={{
            click: () => onSelectEvent(event.id),
          }}
        />
      ))}
    </MapContainer>
  );
};

export default EventMap;
