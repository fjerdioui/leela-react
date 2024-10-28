// src/components/EventMap.tsx
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { Event } from "../types";
import partyIcon from "../assets/party-icon.png";

interface EventMapProps {
  events: Event[];
  selectedPartyId: string | null;
  onMapClick: (id: string) => void;
}

const EventMap: React.FC<EventMapProps> = ({ events, selectedPartyId, onMapClick }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);
  const markerRefs = useRef<{ [key: string]: L.Marker }>({});

  useEffect(() => {
    if (!leafletMapRef.current && mapRef.current) {
      console.log("Initializing map...");
      leafletMapRef.current = L.map(mapRef.current).setView([51.505, -0.09], 13);

      L.tileLayer(
        //   "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        //   attribution: '&copy; OpenStreetMap contributors'
        // }
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 18,
        }
      ).addTo(leafletMapRef.current);

      markerLayerRef.current = L.layerGroup().addTo(leafletMapRef.current);
    }
  }, []);

  useEffect(() => {
    if (leafletMapRef.current && markerLayerRef.current && events.length > 0) {
      markerLayerRef.current.clearLayers(); // Clear previous markers
      console.log("Adding markers to map...");

      const customIcon = L.icon({
        iconUrl: partyIcon,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      events.forEach((event: Event) => {
        if (event.location?.lat && event.location?.lon) {
          const marker = L.marker([event.location.lat, event.location.lon], { icon: customIcon });
          marker.addTo(markerLayerRef.current as L.LayerGroup);
          markerRefs.current[event._id] = marker;

          marker.on("click", () => {
            console.log(`Marker clicked: ${event.name}`);
            onMapClick(event._id);
            marker.openPopup();
          });

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
        } else {
          console.warn(`Event location missing: ${event.name}`);
        }
      });
    }
  }, [events, onMapClick]);

  useEffect(() => {
    if (selectedPartyId && leafletMapRef.current) {
      const selectedEvent = events.find(event => event._id === selectedPartyId);
      if (selectedEvent && selectedEvent.location?.lat && selectedEvent.location?.lon) {
        console.log(`Moving map to selected event: ${selectedEvent.name}`);
        leafletMapRef.current.setView([selectedEvent.location.lat, selectedEvent.location.lon], 13);
        const selectedMarker = markerRefs.current[selectedPartyId];
        selectedMarker?.openPopup();
      }
    }
  }, [selectedPartyId, events]);

  return <div ref={mapRef} id="map" className="map-container" style={{ height: "100%", width: "100%" }} />;
};

export default EventMap;
