import React from 'react';
import EventMap from './EventMap';
import PartyList from './PartyList';

interface MapWithListProps {
  selectedPartyId: string | null;
  setSelectedPartyId: (id: string | null) => void;
}

const MapWithList: React.FC<MapWithListProps> = ({ selectedPartyId, setSelectedPartyId }) => {
  return (
    <div className="phone-frame">
      <h2>Map With List</h2> {/* Temporary text to ensure rendering */}
      <div className="map-container">
        <EventMap selectedPartyId={selectedPartyId} />
      </div>
      <div className="list-container">
        <PartyList onPartySelect={setSelectedPartyId} />
      </div>
    </div>
  );
};

export default MapWithList;
