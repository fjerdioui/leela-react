// src/App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MapWithList from "./components/MapWithList";
import PartyDetails from "./pages/PartyDetails";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Header from "./components/Header";
import "./styles/modules/_list.scss";
import "./styles/layout/_layout.scss";

const App: React.FC = () => {
  const [selectedPartyId, setSelectedPartyId] = useState<string | null>(null);

  return (
    <Router>
      <Header />
      <div className="app-main-container">
        <Routes>
          <Route
            path="/"
            element={
              <MapWithList
                selectedPartyId={selectedPartyId}
                setSelectedPartyId={setSelectedPartyId}
              />
            }
          />
          <Route path="/details/:id" element={<PartyDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
