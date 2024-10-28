// src/pages/EventDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventDetails } from "../types";

const EventDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/eventDetails/${id}`);
        const data = await response.json();
        setEventDetails(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{eventDetails.name}</h2>
      <p>Address: {eventDetails.venue.address}</p>
      <p>Music Style: {eventDetails.classifications[0].genre}</p>
      <p>Price: £{eventDetails.priceRanges?.[0]?.min || 'N/A'}</p>
      <div className="event-gallery">
        {eventDetails.images.map((img, index) => (
          <img key={index} src={img.url} alt={eventDetails.name} style={{ width: '100px', height: 'auto', margin: '5px' }} />
        ))}
      </div>
      <p>Description: {eventDetails.description}</p>
      <a href={eventDetails.ticketLink} target="_blank" rel="noopener noreferrer">Buy Tickets</a>
    </div>
  );
};

export default EventDetailsPage;
