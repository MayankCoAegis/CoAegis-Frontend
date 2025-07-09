import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import EditAddressModal from "./EditProfileModal";

import { useLoader } from "../contexts/LoaderContext";
import SearchModal from "./SearchModal";

const Sidebar = ({
  isSideBarOpen,
  setisSideBarOpen,
  chatData,
  setChatData,
  chatHistory,
  setChatHistory
}) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const {setLoading}=useLoader();

  const handleLogout = () => {
    localStorage.removeItem("refreshToken"); // Remove token from localStorage
    setisSideBarOpen(false);
    setUser(null);
    navigate("/login"); // Redirect to login page
  };

  const handleAccount = () => {
    setIsModalOpen(true);
    setisSideBarOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSearchModalClose = () => {
    setIsSearchModalOpen(false);
  };

  const handleChatDelete=(id)=>{
//TODO
  }

  const handleSearch=()=>{
    setisSideBarOpen(false);

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
      <SearchModal isOpen={isSearchModalOpen} onClose={handleSearchModalClose} />
      <EditAddressModal isOpen={isModalOpen} onClose={handleModalClose} />
      {/* Sidebar */}
      <div
        className={`w-72 min-w-[250px] h-screen bg-neutral-950 text-white flex flex-col justify-between p-5 gap-8 fixed z-20 transition-transform duration-300 ${
          isSideBarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center justify-start gap-3">
            <i className="ri-wechat-channels-line text-lg text-cyan-500"></i>
            <h1 className="hidden md:block text-xl text-cyan-500 font-medium tracking-wide text-white">
              <span className="text-cyan-500">CoAegis</span>
            </h1>
          </div>
          <i
            class="ri-close-line text-lg md:hidden"
            onClick={() => setisSideBarOpen(!isSideBarOpen)}
          ></i>
        </div>

        {/* SubMenu */}
        <div className="flex flex-col gap-1" >
          <button className="flex items-center gap-2 text-sm text-gray-200 hover:text-cyan-300" onClick={() => {setisSideBarOpen(false),navigate("/chat")}}>
            <i className="ri-chat-ai-line text-lg"></i> New Chat
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-200 hover:text-cyan-300" onClick={() => {setisSideBarOpen(false),setIsSearchModalOpen(true)}}>
            <i className="ri-search-eye-line text-lg"></i> Search Chat
          </button>
        </div>

        {/* Chat Sessions */}
        <div className="flex-1 overflow-y-auto space-y-6 dark-scrollbar">
          <div>
            <p className="text-neutral-400 text-sm mb-4">Chats</p>
            <div className="flex flex-col gap-4">
              {chatHistory && chatHistory.length > 0 && chatHistory.map((chat, index) => (
                <NavLink
                  to={`/chat/${chat.id}`}
                  key={index}
                  className="text-sm text-gray-200 truncate hover:text-cyan-300 cursor-pointer"
                  onClick={() => setisSideBarOpen(false)} // close on mobile tap
                >
                  {chat.title[0].toUpperCase()+chat.title.slice(1)}
                  
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col border-t border-gray-700 pt-4 gap-2">
          {/* <button className="flex items-center text-gray-200 gap-2 text-sm hover:text-cyan-300">
            <i className="ri-settings-3-line text-lg"></i> Settings
          </button> */}
          <button
            className="flex items-center text-gray-200 gap-2 text-sm hover:text-cyan-300"
            onClick={() => {setisSideBarOpen(false)}}
          >
            <i className="ri-question-line text-lg"></i> Help Center
          </button>
          {
            <button
              className="flex items-center text-gray-200 gap-2 text-sm  hover:text-cyan-300"
              onClick={() => {
                handleAccount();
              }}
            >
              <i className="ri-user-line text-lg"></i> Account
            </button>
          }

          {user ? (
            <button
              onClick={() => handleLogout()}
              className="flex items-center text-gray-200 gap-2 text-sm hover:text-cyan-300"
            >
              <i className="ri-login-box-line text-lg"></i> Log Out
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center text-gray-200 gap-2 text-sm hover:text-cyan-300"
            >
              <i className="ri-login-box-line text-lg"></i> Log In
            </button>
          )}
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
