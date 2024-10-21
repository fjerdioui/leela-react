import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet'; // Leaflet for the map
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Event } from '../types';
import partyIcon from '../assets/party-icon.png';

interface EventMapProps {
  selectedPartyId: string | null;
  onMapClick: (id: string) => void;
}

const EventMap: React.FC<EventMapProps> = ({ selectedPartyId, onMapClick }) => {
  const mapRef = useRef<HTMLDivElement | null>(null); // To hold the reference to the map container
  const leafletMapRef = useRef<L.Map | null>(null); // To hold the Leaflet map instance
  const markerLayerRef = useRef<L.LayerGroup | null>(null); // Reference for managing marker layers
  const [events, setEvents] = useState<Event[]>([]); // Use events from Firebase
  const markerRefs = useRef<{ [key: string]: L.Marker }>({}); // To hold references to markers

  // Fetch events from Firebase
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const fetchedEvents: Event[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          location: {
            lat: doc.data().location._latitude,
            lon: doc.data().location._longitude,
          }
        })) as Event[];
        setEvents(fetchedEvents); // Set events after fetching
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();

    // Initialize the map if not already initialized
    if (!leafletMapRef.current && mapRef.current) {
      const map = L.map(mapRef.current).setView([51.505, -0.09], 13); // Center on London
      leafletMapRef.current = map;

      // Add tile layer for map background
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      }).addTo(map);

      // Initialize the marker layer group
      markerLayerRef.current = L.layerGroup().addTo(map);
    }
  }, []);

  // Add markers when events and map are initialized
  useEffect(() => {
    if (leafletMapRef.current && markerLayerRef.current && events.length > 0) {
      markerLayerRef.current.clearLayers(); // Clear any existing markers

      const customIcon = L.icon({
        iconUrl: partyIcon,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      events.forEach((event: Event) => {

        // Ensure the event has valid lat/lon values
        if (event.location?.lat && event.location?.lon) {
          const marker = L.marker([event.location.lat, event.location.lon], { icon: customIcon }).addTo(
            markerLayerRef.current as L.LayerGroup
          );

          // Store marker reference for later use (for popup control)
          markerRefs.current[event.id] = marker;

          // When marker is clicked, trigger the scroll and highlight
          marker.on('click', () => {
            onMapClick(event.id);
            marker.openPopup();
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
        } else {
          console.error(`Invalid location for event ${event.name}:`, event.location); // Log invalid location
        }
      });
    }
  }, [events, onMapClick]);

  // Handle highlighting the selected event on the map
  useEffect(() => {
    if (selectedPartyId && leafletMapRef.current) {
      const selectedEvent = events.find((event) => event.id === selectedPartyId);
      if (selectedEvent && selectedEvent.location?.lat && selectedEvent.location?.lon) {
        leafletMapRef.current.setView([selectedEvent.location.lat, selectedEvent.location.lon], 11);
        markerRefs.current[selectedPartyId].openPopup(); // Show the popup for the selected even
      }
    }
  }, [selectedPartyId, events]);

  return <div ref={mapRef} id="map" className="map-container" style={{ height: '100%', width: '100%' }} />;
};

export default EventMap;
