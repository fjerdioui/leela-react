import React from "react";
import EventMap from "./EventMap";
import PartyList from "./PartyList";
import { Event } from "../types";

interface MapWithListProps {
  selectedPartyId: string | null;
  setSelectedPartyId: (id: string | null) => void;
}

const MapWithList: React.FC<MapWithListProps> = ({
  selectedPartyId,
  setSelectedPartyId,
}) => {
  const handleMapClick = (id: string) => {
    setSelectedPartyId(id);
  };

  return (
    <div className="phone-frame">
      <div className="map-container">
        <EventMap
          selectedPartyId={selectedPartyId}
          onMapClick={handleMapClick}
        />{" "}
        {/* Pass onMapClick */}
      </div>
      <div className="list-container">
        <PartyList
          selectedPartyId={selectedPartyId}
          onPartySelect={setSelectedPartyId}
        />{" "}
        {/* Fix prop */}
      </div>
    </div>
  );
};

export default MapWithList;
