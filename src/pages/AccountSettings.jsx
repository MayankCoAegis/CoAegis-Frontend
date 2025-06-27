import React, { useState } from 'react';

const AccountSettings = ({ onClose }) => {
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    userId: 'coaegis_user_12345'
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [settings, setSettings] = useState({
    darkMode: true,
    autoSave: true,
    emailNotifications: false,
    advancedMode: false
  });

  const [usageStats] = useState({
    messagesSent: 2847,
    chatsCreated: 156,
    hoursUsed: 34.2,
    monthlyUsage: 89
  });

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
  };

  const handleSettingToggle = (setting) => {
    setSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const saveProfile = () => {
    alert('Profile saved successfully!');
  };

  const resetProfile = () => {
    if (confirm('Are you sure you want to reset your profile changes?')) {
      setProfile({
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        userId: 'coaegis_user_12345'
      });
      alert('Profile reset to original values.');
    }
  };

  const changePassword = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      alert('Please fill in all password fields.');
      return;
    }

    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match.');
      return;
    }

    alert('Password changed successfully!');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const enable2FA = () => {
    alert('Two-factor authentication setup initiated. Check your email for further instructions.');
  };

  const deleteChatHistory = () => {
    if (confirm('Are you sure you want to delete all chat history? This action cannot be undone.')) {
      if (confirm('This will permanently delete ALL your conversations. Are you absolutely sure?')) {
        alert('Chat history deleted successfully.');
      }
    }
  };

  const deleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      if (confirm('This will permanently delete your account and all associated data. Type "DELETE" to confirm.')) {
        const confirmation = prompt('Type "DELETE" to confirm account deletion:');
        if (confirmation === 'DELETE') {
          alert('Account deletion initiated. You will receive a confirmation email shortly.');
        } else {
          alert('Account deletion cancelled.');
        }
      }
    }
  };

  const ToggleSwitch = ({ checked, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
        checked ? 'bg-cyan-500' : 'bg-gray-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <i className="ri-arrow-left-line text-lg"></i>
              <span>Back to Chat</span>
            </button>
            <div>
              <h1 className="text-2xl font-light">Account Settings</h1>
              <p className="text-gray-400 text-sm">Manage your CoAegis profile and preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Profile Information */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <i className="ri-user-line text-cyan-400 text-xl"></i>
            <h2 className="text-xl font-medium text-cyan-400">Profile Information</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => handleProfileChange('fullName', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-2">User ID</label>
              <input
                type="text"
                value={profile.userId}
                disabled
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={saveProfile}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-all transform hover:scale-105"
              >
                <i className="ri-save-line"></i>
                Save Changes
              </button>
              <button
                onClick={resetProfile}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <i className="ri-refresh-line"></i>
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <i className="ri-bar-chart-line text-cyan-400 text-xl"></i>
            <h2 className="text-xl font-medium text-cyan-400">Usage Statistics</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-3xl font-semibold text-cyan-400 mb-1">{usageStats.messagesSent.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Messages Sent</div>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-3xl font-semibold text-cyan-400 mb-1">{usageStats.chatsCreated}</div>
              <div className="text-gray-400 text-sm">Chats Created</div>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-3xl font-semibold text-cyan-400 mb-1">{usageStats.hoursUsed}</div>
              <div className="text-gray-400 text-sm">Hours Used</div>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-3xl font-semibold text-cyan-400 mb-1">{usageStats.monthlyUsage}%</div>
              <div className="text-gray-400 text-sm">Monthly Usage</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                <div 
                  className="bg-cyan-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${usageStats.monthlyUsage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <i className="ri-settings-3-line text-cyan-400 text-xl"></i>
            <h2 className="text-xl font-medium text-cyan-400">Preferences</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { key: 'darkMode', label: 'Dark Mode', desc: 'Use dark theme across the application', icon: 'ri-moon-line' },
              { key: 'autoSave', label: 'Auto-save Chats', desc: 'Automatically save chat history', icon: 'ri-save-line' },
              { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates and notifications via email', icon: 'ri-mail-line' },
              { key: 'advancedMode', label: 'Advanced Mode', desc: 'Enable advanced AI features and settings', icon: 'ri-settings-2-line' }
            ].map((setting) => (
              <div key={setting.key} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0">
                <div className="flex items-center gap-3">
                  <i className={`${setting.icon} text-gray-400`}></i>
                  <div>
                    <div className="font-medium">{setting.label}</div>
                    <div className="text-sm text-gray-400">{setting.desc}</div>
                  </div>
                </div>
                <ToggleSwitch
                  checked={settings[setting.key]}
                  onChange={() => handleSettingToggle(setting.key)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <i className="ri-shield-keyhole-line text-cyan-400 text-xl"></i>
            <h2 className="text-xl font-medium text-cyan-400">Security</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Current Password</label>
              <input
                type="password"
                value={passwords.current}
                onChange={(e) => handlePasswordChange('current', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Enter current password"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-2">New Password</label>
              <input
                type="password"
                value={passwords.new}
                onChange={(e) => handlePasswordChange('new', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Enter new password"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={passwords.confirm}
                onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Confirm new password"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={changePassword}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition-all transform hover:scale-105"
              >
                <i className="ri-key-line"></i>
                Change Password
              </button>
              <button
                onClick={enable2FA}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <i className="ri-shield-check-line"></i>
                Enable 2FA
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-gray-900 rounded-xl p-6 border border-red-900/50">
          <div className="flex items-center gap-3 mb-6">
            <i className="ri-error-warning-line text-red-400 text-xl"></i>
            <h2 className="text-xl font-medium text-red-400">Danger Zone</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-gray-800">
              <div>
                <div className="font-medium text-red-400">Delete All Chat History</div>
                <div className="text-sm text-gray-400">Permanently delete all your chat conversations</div>
              </div>
              <button
                onClick={deleteChatHistory}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors mt-3 sm:mt-0"
              >
                <i className="ri-delete-bin-line"></i>
                Delete History
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3">
              <div>
                <div className="font-medium text-red-400">Delete Account</div>
                <div className="text-sm text-gray-400">Permanently delete your CoAegis account</div>
              </div>
              <button
                onClick={deleteAccount}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors mt-3 sm:mt-0"
              >
                <i className="ri-user-unfollow-line"></i>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;