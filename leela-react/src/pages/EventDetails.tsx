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
        const response = await fetch(process.env.REACT_APP_API_BASE_URL + `/events/details/${id}`);
        if (!response.ok) throw new Error("Failed to fetch event details");
        const data = await response.json();
        setEventDetails(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (!eventDetails) return <div>Loading...</div>;

  return (
    <div>
      <h2>{eventDetails.name}</h2>
      <p>{eventDetails.description}</p>
      <p><strong>Venue:</strong> {eventDetails.venue.name}, {eventDetails.venue.address}</p>
      <p>
        <strong>Date:</strong>
        {eventDetails.dates.start.localDate} {eventDetails.dates.start.localTime} -
        {eventDetails.dates.end.dateTime} {eventDetails.dates.end.localTime}
      </p>
      <p><strong>Ticket Link:</strong> <a href={eventDetails.ticketLink} target="_blank" rel="noopener noreferrer">Buy Tickets</a></p>

      <div className="gallery">
        {eventDetails.images.map((image, index) => (
          <img key={index} src={image.url} alt={`${eventDetails.name} ${index}`} style={{ width: "100%", height: "auto" }} />
        ))}
      </div>
    </div>
  );
};

export default EventDetailsPage;
