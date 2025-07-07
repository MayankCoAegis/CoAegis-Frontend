import { useState } from "react";

const SecuritySettings = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleChangePassword = () => {
    console.log("Change password with:", passwords);
    // TODO: Implement API call
  };

  const handleEnable2FA = () => {
    console.log("Enable 2FA clicked");
    // TODO: Implement 2FA logic
  };

  return (
    <div className=" p-6  text-gray-200 max-w-md w-full">
     

      <div className="mb-4">
        <label className="block text-sm text-gray-200 mb-1">Current Password:</label>
        <div className="text-gray-100 text-sm bg-[#1f1f1f] border border-[#3a3a3a] rounded-md px-4 py-2">
          <input
            type="password"
            name="current"
            value={passwords.current}
            onChange={handleChange}
            placeholder="Enter current password"
            className="bg-transparent w-full outline-none text-gray-200"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-200 mb-1">New Password:</label>
        <div className="text-gray-100  text-sm bg-[#1f1f1f] border border-[#3a3a3a] rounded-md px-4 py-2">
          <input
            type="password"
            name="new"
            value={passwords.new}
            onChange={handleChange}
            placeholder="Enter new password"
            className="bg-transparent  w-full outline-none text-gray-200"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-200 mb-1">Confirm New Password:</label>
        <div className="text-gray-100  text-sm  bg-[#1f1f1f] border border-[#3a3a3a] rounded-md px-4 py-2">
          <input
            type="password"
            name="confirm"
            value={passwords.confirm}
            onChange={handleChange}
            placeholder="Confirm new password"
            className="bg-transparent w-full outline-none text-sm text-white"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={handleEnable2FA}
          className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white px-5 py-2 rounded-md text-sm"
        >
        Enable 2FA
        </button>

        <button
          onClick={handleChangePassword}
          className="bg-cyan-500 hover:bg-cyan-600 text-gray-200 px-5 py-2 rounded-md text-sm"
        >
        Change Password
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;
