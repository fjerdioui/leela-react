import React from 'react';
import events from '../mockData';
import { useNavigate } from 'react-router-dom';
import '../styles/modules/_list.scss';

const PartyList: React.FC<{ selectedEvent: string | null }> = ({ selectedEvent }) => {
  const navigate = useNavigate();

  return (
    <div className="party-list">
      {events.map((event) => (
        <div
          key={event.id}
          className={`party-item ${selectedEvent === event.id ? 'highlighted' : ''}`}
          onClick={() => navigate(`/details/${event.id}`)}
        >
          <h3>{event.name}</h3>
          <p>{event.address}</p>
          <p>{event.musicStyle}</p>
        </div>
      ))}
    </div>
  );
};

export default PartyList;
