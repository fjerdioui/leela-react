import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import events from '../mockData';
import 'leaflet/dist/leaflet.css';
import '../styles/modules/_map.scss';

const partyIcon = new L.Icon({
  iconUrl: '/assets/party-icon.png',
  iconSize: [30, 30],
});

const EventMap: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {events.map((event) => (
        <Marker
          key={event.id}
          position={[event.location.lat, event.location.lon]}
          icon={partyIcon}
          eventHandlers={{
            click: () => setSelectedEvent(event.id),
          }}
        >
          <Popup>{event.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default EventMap;
