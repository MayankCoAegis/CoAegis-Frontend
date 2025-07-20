import { useState } from "react";
import { useAlert } from "../../contexts/AlertContext";
import { changePasswordAPI } from "../../api/user";
import { useLoader } from "../../contexts/LoaderContext";

const SecuritySettings = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const {setShowSnackBar,setMessage}=useAlert();
  const {setLoading}=useLoader();

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async() => {

    if(!passwords.current || !passwords.new || !passwords.confirm)
    {
      setMessage("All fields are required");
      setShowSnackBar(true);
      return;
    }
    
    if(passwords.new !== passwords.confirm)
    {
      setMessage("Passwords do not match");
      setShowSnackBar(true);
      return;
    }
    setLoading(true);
    const response=await changePasswordAPI(passwords.current,passwords.new);
    if(response.success)
    {
      setMessage(response.message);
      setShowSnackBar(true);
      setPasswords({ current: "", new: "", confirm: "" });
      setLoading(false);
    }
    else
    {
      setMessage(response.message);
      setShowSnackBar(true);
      setLoading(false);
    }

  };

  const handleEnable2FA = () => {
    console.log("Enable 2FA clicked");
    // TODO: Implement 2FA logic
  };

  return (
    <div className=" p-6  text-gray-200 max-w-md w-full">
     

      <div className="mb-4">
        <label className="block text-sm dark:text-gray-200 text-gray-700 mb-1">Current Password:</label>
        <div className="text-xs md:text-sm dark:bg-[#1f1f1f] bg-gray-100 border dark:border-[#3a3a3a] border-gray-100 rounded-md px-4 py-2">
          <input
            type="password"
            name="current"
            value={passwords.current}
            onChange={handleChange}
            placeholder="Enter current password"
            className="bg-transparent w-full outline-none dark:text-gray-200 text-gray-700"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm dark:text-gray-200 text-gray-700 mb-1">New Password:</label>
        <div className="text-xs md:text-sm dark:bg-[#1f1f1f] bg-gray-100 border dark:border-[#3a3a3a] border-gray-100 rounded-md px-4 py-2">
          <input
            type="password"
            name="new"
            value={passwords.new}
            onChange={handleChange}
            placeholder="Enter new password"
            className="bg-transparent  w-full outline-none dark:text-gray-200 text-gray-700"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm dark:text-gray-200 text-gray-700 mb-1">Confirm New Password:</label>
        <div className="text-xs md:text-sm  dark:bg-[#1f1f1f] bg-gray-100 border dark:border-[#3a3a3a] border-gray-100 rounded-md px-4 py-2">
          <input
            type="password"
            name="confirm"
            value={passwords.confirm}
            onChange={handleChange}
            placeholder="Confirm new password"
            className="bg-transparent w-full outline-none dark:text-gray-200 text-gray-700"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        {/* <button
          onClick={handleEnable2FA}
          className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white px-5 py-2 rounded-md text-xs"
        >
        Enable 2FA
        </button> */}

        <button
          onClick={handleChangePassword}
          className="dark:bg-cyan-500 bg-cyan-400 dark:hover:bg-cyan-600 hover:bg-cyan-500 dark:text-gray-200 text-gray-50 px-5 py-2 rounded-md text-xs"
        >
        Change Password
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;
