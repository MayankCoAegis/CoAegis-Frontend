import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = ({isSideBarOpen,setisSideBarOpen,chatData,setChatData}) => {
const {user,setUser} = useAuth();
const navigate = useNavigate();

const handleLogout = () => {
  
  localStorage.removeItem("token"); // Remove token from localStorage
  setUser(null);
  navigate("/login"); // Redirect to login page
}
  return (
    <>
      {/* Hamburger button (only visible on small screens) */}
      {/* <button
        onClick={() => setisSideBarOpen(!isSideBarOpen)}
        className="md:hidden fixed top-4 left-4 z-30 bg-neutral-900 p-2 rounded-md text-white"
      >
        <i className="ri-menu-line text-xl"></i>
      </button> */}

      {/* Sidebar */}
      <div
        className={`w-72 min-w-[250px] h-screen bg-neutral-950 text-white flex flex-col justify-between p-5 gap-8 fixed z-20 transition-transform duration-300 ${
          isSideBarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
            <div className="flex items-center justify-start gap-3">
                
          <i className="ri-wechat-channels-line text-lg"></i>
          <h1 className="hidden md:block text-xl font-medium tracking-wide text-white">CoAegis</h1>
            </div>
            <i class="ri-close-line text-lg md:hidden" onClick={()=>setisSideBarOpen(!isSideBarOpen)}></i>
        </div>

        {/* SubMenu */}
        <div className="flex flex-col gap-1">
          <button className="flex items-center gap-2 text-sm text-gray-200 hover:text-cyan-300">
            <i className="ri-chat-ai-line text-lg"></i> New Chat
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-200 hover:text-cyan-300">
            <i className="ri-search-eye-line text-lg"></i> Search Chat
          </button>
        </div>

        {/* Chat Sessions */}
        <div className="flex-1 overflow-y-auto space-y-6">
          <div>
            <p className="text-neutral-400 text-sm mb-4">Chats</p>
            <div className="flex flex-col gap-4">
              {chatData.map((chat, index) => (
                <NavLink
                  to={`/chat/${chat.chatId}`}
                  key={index}
                  className="text-sm text-gray-200 truncate hover:text-cyan-300 cursor-pointer"
                  onClick={() => setisSideBarOpen(false)} // close on mobile tap
                >
                  {chat.chat[0].user}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col border-t border-gray-700 pt-4 gap-2">
          <button className="flex items-center text-gray-200 gap-2 text-sm hover:text-cyan-300">
            <i className="ri-settings-3-line text-lg"></i> Settings
          </button>
          <button className="flex items-center text-gray-200 gap-2 text-sm hover:text-cyan-300">
            <i className="ri-question-line text-lg"></i> Help Center
          </button>
          {user && <button className="flex items-center text-gray-200 gap-2 text-sm  hover:text-cyan-300">
            <i className="ri-user-line text-lg"></i> Account
          </button>}
          {user?<button
          onClick={()=>handleLogout()} 
          className="flex items-center text-gray-200 gap-2 text-sm hover:text-cyan-300">
            <i className="ri-login-box-line text-lg"></i> Log Out
          </button>:<button
          onClick={()=>navigate("/login")} 
          className="flex items-center text-gray-200 gap-2 text-sm hover:text-cyan-300">
            <i className="ri-login-box-line text-lg"></i> Log In
          </button>}
        </div>
      </div>

      {/* Overlay (mobile only) */}
      {isSideBarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden"
          onClick={() => setisSideBarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
