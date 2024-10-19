import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventMap from './components/EventMap';  // Corrected path
import PartyList from './components/PartyList';  // Corrected path
import PartyDetails from './pages/PartyDetails';  // Corrected path
import Profile from './pages/Profile';  // Corrected path
import Settings from './pages/Settings';  // Corrected path
import './styles/layout/_layout.scss';  // Corrected path

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <div className="phone-frame">
          <div className="map-container">
            <EventMap />
          </div>
        </div>
        <div className="list-container">
          <PartyList selectedEvent={null} /> {/* Added selectedEvent prop */}
        </div>
      </div>

      <Routes>
        <Route path="/details/:id" element={<PartyDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
