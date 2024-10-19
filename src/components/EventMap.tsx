import React, { useEffect, useRef } from 'react';
import L from 'leaflet'; // Leaflet for the map
import mockEvents from '../mockData';
import { Event } from '../types';

interface EventMapProps {
  selectedPartyId: string | null;
}

const EventMap: React.FC<EventMapProps> = ({ selectedPartyId }) => {
  const mapRef = useRef<HTMLDivElement | null>(null); // To hold the reference to the map container
  const leafletMapRef = useRef<L.Map | null>(null); // To hold the Leaflet map instance

  useEffect(() => {
    // Initialize the map if it hasn't been initialized yet
    if (!leafletMapRef.current && mapRef.current) {
      const map = L.map(mapRef.current).setView([51.505, -0.09], 13); // Center on London
      leafletMapRef.current = map;

      // Add a tile layer (for the map background)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Add markers for each event
      mockEvents.forEach((event: Event) => {
        const marker = L.marker([event.location.lat, event.location.lon]).addTo(map);

        // Show popup on marker click
        marker.bindPopup(`
          <div>
            <h3>${event.name}</h3>
            <p>Address: ${event.address}</p>
            <p>Music Style: ${event.musicStyle}</p>
            <p>Price: £${event.price}</p>
          </div>
        `);
      });
    }

    // Highlight the selected event on the map
    if (selectedPartyId && leafletMapRef.current) {
      const selectedEvent = mockEvents.find(event => event.id === selectedPartyId);
      if (selectedEvent) {
        // Zoom in on the selected event
        leafletMapRef.current.setView([selectedEvent.location.lat, selectedEvent.location.lon], 15);
      }
    }

    // Cleanup function to remove the map when the component unmounts
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [selectedPartyId]);

  return <div ref={mapRef} id="map" className="map-container" style={{ height: '100%', width: '100%' }} />;
};

export default EventMap;
