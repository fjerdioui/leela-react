import React from 'react';
import profileIcon from '../assets/profile-icon.png';
import settingsIcon from '../assets/settings-icon.png';

const Header: React.FC = () => {
  return (
    <div className="header">
      <img src={profileIcon} alt="Profile" className="icon" />
      <img src={settingsIcon} alt="Settings" className="icon" />
    </div>
  );
};

export default Header; // Ensure there is an export statement
