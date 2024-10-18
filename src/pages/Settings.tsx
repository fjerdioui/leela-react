// party-app/src/pages/Settings.tsx
import React, { useState } from "react";

interface UserSettings {
  theme: string;
  notifications: boolean;
  language: string;
}

const mockSettings: UserSettings = {
  theme: "light",
  notifications: true,
  language: "English",
};

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>(mockSettings);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setSettings({
      ...settings,
      [name]: newValue,
    });
  };

  return (
    <div>
      <h1>App Settings</h1>
      <div>
        <label>
          Theme:
          <select name="theme" value={settings.theme} onChange={handleChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Enable Notifications:
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Language:
          <select
            name="language"
            value={settings.language}
            onChange={handleChange}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Settings;
