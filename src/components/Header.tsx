import React from 'react';
import { useNavigate  } from 'react-router-dom';
import profileIcon from '../assets/profile-icon.png';
import settingsIcon from '../assets/settings-icon.png';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="header-icons">
        <img
          src={profileIcon}
          alt="Profile"
          className="header-icon"
          onClick={() => navigate('/profile')}
        />
        <img
          src={settingsIcon}
          alt="Settings"
          className="header-icon"
          onClick={() => navigate('/settings')}
        />
      </div>
    </header>
  );
};

export default Header;
