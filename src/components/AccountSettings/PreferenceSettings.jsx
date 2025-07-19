import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";

export default function PreferenceSettings(){
    const [settings, setSettings] = useState({
    darkMode: true,
    autoSaveChats: true,
    emailNotifications: false,
    advancedMode: false,
  });

  const {useTheme}=useTheme();

  const handleToggle = (key) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };
    setSettings(newSettings);
    handleApiUpdate(key, newSettings[key]);
  };

  // Placeholder for future API integration
  const handleApiUpdate = (key, value) => {
    console.log(`Setting "${key}" updated to`, value);
    if(key=="darkMode")
      {

      };
    // TODO: Implement API call here
  };

  const options = [
    {
      key: "darkMode",
      title: "Dark Mode",
      description: "Use dark theme across the application",
      icon: "🌙",
    },
    // {
    //   key: "autoSaveChats",
    //   title: "Auto-save Chats",
    //   description: "Automatically save chat history",
    //   icon: "💾",
    // },
    {
      key: "emailNotifications",
      title: "Email Notifications",
      description: "Receive updates and notifications via email",
      icon: "📧",
    },
    {
      key: "advancedMode",
      title: "Advanced Mode",
      description: "Enable advanced AI features and settings",
      icon: "⚙️",
    },
  ];

  return (
    <div className="p-6 text-white w-full max-w-xl">
      

      <div className="space-y-6">
        {options.map((option) => (
          <div
            key={option.key}
            className="flex justify-between items-center border-b border-gray-600 pb-4"
          >
            <div>
              <div className="text-sm font-semibold flex items-center gap-2">
                <span>{option.icon}</span>
                {option.title}
              </div>
              <div className="text-xs text-gray-400">{option.description}</div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings[option.key]}
                onChange={() => handleToggle(option.key)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:bg-cyan-500 transition-all"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}