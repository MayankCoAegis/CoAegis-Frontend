import React, { use, useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import ProfilePanel from "../../components/ProfilePanel";
import { Outlet, useNavigate } from "react-router-dom";
import { useLoader } from "../contexts/LoaderContext";
import Sidebar from "../components/SideBar";
import SelectModel from "../components/SelectModel";
import profilepic from '/profile-coaegis.jpeg'
import { useAuth } from "../contexts/AuthContext";
import { useAlert } from "../contexts/AlertContext";

const ChatLayout = () => {
  const { setLoading } = useLoader();
  const [isSideBarOpen, setisSideBarOpen] = useState(false);
  const navigate=useNavigate();
    const {setShowSnackBar,setMessage}=useAlert()
      const {user,setUser}=useAuth();
     

    // useEffect(() => {
    //   setLoading(true); // Start loading
    //   if(!user){
    //     console.log("User not authenticated, redirecting to login");
    //     setLoading(false); // Stop loading
    //     setMessage("User not authenticated, redirecting to login");
    //     setShowSnackBar(true);
    //     // navigate("/login");
    //   }
    //   else
    //   setLoading(false); // Stop loading
    // }, [user]);    

  return (
    <div className="flex h-screen bg-neutral-950">
      {/* SideMenu Div */}
      <div className="flex flex-col h-full">
        <Sidebar isSideBarOpen={isSideBarOpen} setisSideBarOpen={setisSideBarOpen}/>
      </div>
      {/* SideMenu Div ends */}

      {/* MainChat Div*/}
      <div className="flex flex-col flex-1 bg-neutral-900 m-0 md:m-4 md:ml-0 rounded-lg shadow-lg/50 border-1 border-neutral-800">
        {/* Navbar */}
        <div className="flex flex-row w-full items-center justify-between p-4 py-2">
         
          <div className="md:hidden items-center">
        <button
                onClick={() => setisSideBarOpen(!isSideBarOpen)}
                className=" rounded-md text-white"
            >
                <i className="ri-menu-line text-xl"></i>
            </button>
          </div>
          <SelectModel />

          <div className="md:hidden items-center">
            <i class="ri-pencil-line text-white text-lg"></i>

          </div>

          <div className="hidden items-center gap-2 p-2 md:flex">
            {/* Upload Button  */}
            <div className="w-9 h-9 bg-neutral-900 rounded-lg shadow-md/50 border border-neutral-800 flex items-center justify-center cursor-pointer hover:bg-[#2a2a2a]">
              <i className="ri-upload-2-line text-white text-lg"></i>
            </div>

            {/* Ellipsis Button */}
            <div className="w-9 h-9 bg-neutral-900 shadow-md/50 border border-neutral-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#2a2a2a]">
              <i className="ri-more-2-fill text-white text-lg"></i>
            </div>

            {/* Profile Image Button */}
            <div className="w-9 h-9 rounded-lg overflow-hidden cursor-pointer shadow-md/50 border border-neutral-800">
              <img
                src={profilepic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            
          </div>
        </div>
        
        <div className="pb-[140px] md:p-0 flex flex-col overflow-y-auto md:flex-1">
        <Outlet /> {/* This will render ChatMain, ProfilePage, etc. */}
        </div>
      </div>
      {/* MainChat Div ends */}
    </div>
  );
};

export default ChatLayout;
