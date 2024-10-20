import React, { useEffect, useRef } from 'react';
import L from 'leaflet'; // Leaflet for the map
import mockEvents from '../mockData';
import { Event } from '../types';
import partyIcon from '../assets/party-icon.png';

interface EventMapProps {
  selectedPartyId: string | null;
  onMapClick: (id: string) => void;
}

const EventMap: React.FC<EventMapProps> = ({ selectedPartyId, onMapClick }) => {
  const mapRef = useRef<HTMLDivElement | null>(null); // To hold the reference to the map container
  const leafletMapRef = useRef<L.Map | null>(null); // To hold the Leaflet map instance

  useEffect(() => {
    // Initialize the map if it hasn't been initialized yet
    if (!leafletMapRef.current && mapRef.current) {
      const map = L.map(mapRef.current).setView([51.505, -0.09], 13); // Center on London
      leafletMapRef.current = map;

      // Add a tile layer (for the map background)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
      }).addTo(map);
      // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //   attribution: '&copy; OpenStreetMap contributors'
      // }).addTo(map);

      // Create a custom icon
      const customIcon = L.icon({
        iconUrl: partyIcon, // Use your custom icon here
        iconSize: [32, 32], // Size of the icon [width, height]
        iconAnchor: [16, 32], // The point of the icon which will correspond to marker's location
        popupAnchor: [0, -32], // The point from which the popup should open relative to the iconAnchor
      });

      // Add markers for each event
      mockEvents.forEach((event: Event) => {
        const marker = L.marker([event.location.lat, event.location.lon], { icon: customIcon }).addTo(map);

        // When marker is clicked, trigger the scroll and highlight
        marker.on('click', () => {
          onMapClick(event.id); // Pass the event id to handle the click
        });

        // Show popup on marker click
        marker.bindPopup(`
          <div>
            <h3>${event.name}</h3>
            <p><strong>Address:</strong> ${event.address}</p>
            <p><strong>Music Style:</strong> ${event.musicStyle}</p>
            <p><strong>Price:</strong> £${event.price}</p>
            <p><strong>Description:</strong> ${event.description}</p>
            <a href="${event.ticketLink}" target="_blank">Buy Tickets</a>
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
  }, [selectedPartyId, onMapClick]);

  return <div ref={mapRef} id="map" className="map-container" style={{ height: '100%', width: '100%' }} />;
};

export default EventMap;
