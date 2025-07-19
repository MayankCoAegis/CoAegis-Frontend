import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const ProfileSetting = () => {
    const [profile, setProfile] = useState({
        fullName: "John Doe",
        email: "john.doe@example.com",
        userId: "coaegis_user_12345",
        phone:"1234567890"
    });

    const {user}=useAuth();
    
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  

  const handleReset = () => {
    setProfile({
      fullName: "John Doe",
      email: "john.doe@example.com",
      userId: "coaegis_user_12345",
    });
  };

  const handleSave = () => {
    console.log("Saved profile:", profile);
    // API call here
  };

  useEffect(()=>{
    if(user)
    {

        setProfile({
            fullName: user?.username|| "null",
            email: user?.email ||"null",
            userId: user?.id|| "null",
            phone: user?.contact||"null"
        })
    }
  },[])

  return (
    <div className="flex flex-col gap-3 p-6">
        <div className="flex flex-col gap-2 border-b border-neutral-700 py-2">
            <label className="text-sm font-semibold text-gray-200">Full Name: </label>
    <input name="fullName" type="text" className="text-sm text-gray-300  rounded-sm outline-none py-1"value={profile.fullName}  onChange={handleChange} disabled/>
        </div>

        <div className="flex flex-col gap-2 border-b border-neutral-700 py-2">
            <label className="text-sm font-semibold text-gray-200">Email: </label>
    <input name="fullName" type="text" className="text-sm text-gray-300 rounded-sm outline-none py-1 "value={profile.email}  onChange={handleChange}/>
        </div>

        <div className="flex flex-col gap-2 border-b border-neutral-700 py-2">
            <label className="text-sm font-semibold text-gray-200">Phone: </label>
    <input name="fullName" type="text" className="text-sm text-gray-300 rounded-sm outline-none py-1"value={profile.phone}  onChange={handleChange}/>
        </div>

     {/* <div className="flex justify-end py-2">
            <button
           
            className="bg-cyan-500 hover:bg-cyan-600 text-gray-200 px-4 py-2 rounded-md text-xs"
          >
            Edit Profile
          </button>
          </div> */}
        

    
    </div>
  );
};

export default ProfileSetting;
