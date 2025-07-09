import React, { useEffect, useState } from "react";
import ProfileSettings from "./AccountSettings/ProfileSetting";
import DangerSettings from "./AccountSettings/DangerSettings";
import PreferenceSettings from "./AccountSettings/PreferenceSettings";
import SecuritySettings from "./AccountSettings/SecuritySettings";
import UsageSettings from "./AccountSettings/UsageSettings";

export default function EditAddressModal({
  isOpen,
  onClose,
}) {
 

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [settings, setSettings] = useState({
    darkMode: true,
    autoSave: true,
    emailNotifications: false,
    advancedMode: false,
  });

  const [usageStats] = useState({
    messagesSent: 2847,
    chatsCreated: 156,
    hoursUsed: 34.2,
    monthlyUsage: 89,
  });

  const settingsOptions = [
  { key: "profile", label: "Profile", icon: "ri-settings-3-line" },
  { key: "preferences", label: "Preferences", icon: "ri-apps-2-line" },
  { key: "usage", label: "Usage", icon: "ri-database-2-line" },
  { key: "security", label: "Security", icon: "ri-shield-user-line" },
  { key: "account", label: "Account", icon: "ri-user-3-line" },
];

  const [activeTab, setActiveTab] = useState("Profile");

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileSettings />;
      case "Account":
        return <DangerSettings />;
      case "Preferences":
        return <PreferenceSettings />;
      case "Security":
        return <SecuritySettings />;
        case "Usage":
        return <UsageSettings />;
        
      default:
        return <ProfileSettings/>;
    }
  };


    if (!isOpen) return null;



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
      <div className="mx-4 min-h-7/10 max-h-9/10 md:w-[650px] md:h-3/4 bg-[#2f2f2f] rounded-lg shadow-lg flex flex-col md:flex-row overflow-y-auto dark-scrollbar">

        {/* Left Div Menu */}
        <div className="md:w-[180px] bg-[#2a2a2a] rounded-t-lg md:rounded-l-lg p-2">
             {/* Close Button */}
      <button
        onClick={onClose}
        className="text-white text-xl md:mb-4 self-start md:block cursor-pointer"
      >
        <i className="ri-close-line"></i>
      </button>

      {/* Menu Items */}
      <ul className="space-x-3 md:space-x-0 md:space-y-2 flex flex-row flex-wrap md:flex-col">
        {settingsOptions.map((option) => (
          <li key={option.key}>
            <button
              onClick={() => setActiveTab(option.label)}
              className={`flex items-center w-full px-2 py-1 md:px-3 md:py-2 rounded-lg transition-colors cursor-pointer hover:bg-[#333] ${
                activeTab === option.label
                  ? "bg-[#333] text-white"
                  : "text-gray-300 hover:bg-[#2a2a2a]"
              }`}
            >
              <i className={`${option.icon} text-lg mr-3`}></i>
              <span className="text-sm font-medium text-gray-200">{option.label}</span>
            </button>
          </li>
        ))}
      </ul>

     

        </div>
    {/* Right Div */}
      <div className="flex-1  md:p-3 overflow-y-auto">
        <h2 className="hidden md:block text-lg text-gray-200 border-b border-neutral-600 p-2 pt-0">
            {activeTab}
        </h2>
        {renderContent()}
      </div>
      </div>
      
    </div>
  );
}
