import React, { useState } from "react";

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSettings({
      ...settings,
      [name]: checked,
    });
  };

  return (
    <div>
      <h1>Settings</h1>
      <label>
        Notifications:
        <input
          type="checkbox"
          name="notifications"
          checked={settings.notifications}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default Settings;
