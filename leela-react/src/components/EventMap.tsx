// src/components/EventMap.tsx
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import { Event } from "../types";
import eventIcon from "../assets/party-icon.png";

interface EventMapProps {
  events: Event[];
  selectedEventId: string | null;
  onMapClick: (id: string) => void;
}

const EventMap: React.FC<EventMapProps> = ({ events, selectedEventId, onMapClick }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);
  const markerRefs = useRef<{ [key: string]: L.Marker }>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!leafletMapRef.current && mapRef.current) {
      leafletMapRef.current = L.map(mapRef.current).setView([51.505, -0.09], 13);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
          maxZoom: 18,
        }
      ).addTo(leafletMapRef.current);

      markerLayerRef.current = L.layerGroup().addTo(leafletMapRef.current);
    }
  }, []);

  useEffect(() => {
    if (leafletMapRef.current && markerLayerRef.current && events.length > 0) {
      markerLayerRef.current.clearLayers();

      const customIcon = L.icon({
        iconUrl: eventIcon,
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
            onMapClick(event._id);
            marker.openPopup();
          });

          marker.bindPopup(`
              <div>
                <h3 class="popup-title" data-id="${event._id}">${event.name}</h3>
                <img src="${event.thumbnailImage}" alt="${event.name}" style="width:100%; height:auto; margin-bottom:5px;"/>
                <p><strong>Address:</strong> ${event.address}</p>
                <p><strong>Music Style:</strong> ${event.musicStyle}</p>
                <p><strong>Price:</strong> £${event.price}</p>
                <p><strong>Start Date:</strong> ${event.date?.start ? new Date(event.date.start).toLocaleString() : "Not available"}</p>
                <p><strong>End Date:</strong> ${event.date?.end ? new Date(event.date.end).toLocaleString() : "Not available"}</p>
              </div>
          `);
        }
      });
    }
  }, [events, onMapClick]);

  useEffect(() => {
    if (selectedEventId && leafletMapRef.current) {
      const selectedEvent = events.find(event => event._id === selectedEventId);
      if (selectedEvent && selectedEvent.location?.lat && selectedEvent.location?.lon) {
        leafletMapRef.current.setView([selectedEvent.location.lat, selectedEvent.location.lon], 13);
        const selectedMarker = markerRefs.current[selectedEventId];
        selectedMarker?.openPopup();
      }
    }
  }, [selectedEventId, events]);

  useEffect(() => {
    const handlePopupClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("popup-title")) {
        const id = target.getAttribute("data-id");
        if (id) navigate(`/eventDetails/${id}`);
      }
    };

    mapRef.current?.addEventListener("click", handlePopupClick);
    return () => mapRef.current?.removeEventListener("click", handlePopupClick);
  }, [navigate]);

  return <div ref={mapRef} id="map" className="map-container" style={{ height: "100%", width: "100%" }} />;
};

export default EventMap;
