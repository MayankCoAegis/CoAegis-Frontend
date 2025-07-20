import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import EditAddressModal from "./EditProfileModal";

import { useLoader } from "../contexts/LoaderContext";
import SearchModal from "./SearchModal";
import { DeleteChatById, RenameChatById } from "../api/chat";
import ThemeToggler from "./ThemeToggler";

const Sidebar = ({
  isSideBarOpen,
  setisSideBarOpen,
  chatData,
  setChatData,
  chatHistory,
  setChatHistory,
}) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const { setLoading } = useLoader();

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

  const handleChatDelete = (id) => {
    //TODO
  };

  const handleSearch = () => {
    setisSideBarOpen(false);
  };

  return (
    <>
      {/* Hamburger button (only visible on small screens) */}
      {/* <button
        onClick={() => setisSideBarOpen(!isSideBarOpen)}
        className="md:hidden fixed top-4 left-4 z-30 bg-neutral-900 p-2 rounded-md text-white"
      >
        <i className="ri-menu-line text-xl"></i>
      </button> */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={handleSearchModalClose}
      />
      <EditAddressModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        setChatHistory={setChatHistory}
      />
      {/* Sidebar */}
      <div
        className={`w-72 min-w-[250px] h-screen dark:bg-neutral-950 bg-[#f0f4f9] text-white flex flex-col justify-between p-5 gap-8 fixed z-20 transition-transform duration-300 ${
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
          <div className="flex flex-row gap-4 items-center">
            <ThemeToggler />
          <i
            className="dark:text-white text-gray-700 ri-close-line text-lg md:hidden"
            onClick={() => setisSideBarOpen(!isSideBarOpen)}
          ></i>
          </div>
          
        </div>

        {/* SubMenu */}
        <div className="flex flex-col gap-1">
          <button
            className="flex items-center gap-2 text-sm dark:text-gray-200 text-gray-600 hover:text-cyan-300"
            onClick={() => {
              setisSideBarOpen(false), navigate("/chat");
            }}
          >
            <i className="ri-chat-ai-line text-lg"></i> New Chat
          </button>
          <button
            className="flex items-center gap-2 text-sm dark:text-gray-200 text-gray-600 hover:text-cyan-300"
            onClick={() => {
              setisSideBarOpen(false), setIsSearchModalOpen(true);
            }}
          >
            <i className="ri-search-eye-line text-lg"></i> Search Chat
          </button>
        </div>

        {/* Chat Sessions */}
        <p className="dark:text-neutral-400 text-neutral-600 font-medium text-sm mb-[-15px]">
          Chats
        </p>
        <div className="flex-1 overflow-y-auto space-y-6 dark:dark-scrollbar light-scrollbar py-4 pr-4">
          <div>
            <div className="  flex flex-col ">
              {chatHistory &&
                chatHistory.length > 0 &&
                chatHistory
                  .toReversed()
                  .map((chat, index) => (
                    <ChatTitleComponent
                      chat={chat}
                      index={index}
                      chatHistory={chatHistory}
                      setChatHistory={setChatHistory}
                    />
                  ))}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col border-t border-gray-700 pt-4 gap-2">
          {/* <button className="flex items-center text-gray-200 gap-2 text-sm hover:text-cyan-300">
            <i className="ri-settings-3-line text-lg"></i> Settings
          </button> */}
          {/* <button
            className="flex items-center text-gray-200 gap-2 text-sm hover:text-cyan-300"
            onClick={() => {
              setisSideBarOpen(false);
            }}
          >
            <i className="ri-question-line text-lg"></i> Help Center
          </button> */}
          {
            <button
              className="flex items-center dark:text-gray-200 text-gray-600 gap-2 text-sm  hover:text-cyan-300"
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
              className="flex items-center dark:text-gray-200 text-gray-600 gap-2 text-sm hover:text-cyan-300"
            >
              <i className="ri-login-box-line text-lg"></i> Log Out
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center dark:text-gray-200 text-gray-600 gap-2 text-sm hover:text-cyan-300"
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

const ChatTitleComponent = ({ chat, index, chatHistory, setChatHistory }) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const { setLoading } = useLoader();
  const [isRenaming, setIsRenaming] = useState(false);
  const [rename, setRename] = useState(chat.title);
  const inputRef = useRef(null);

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await DeleteChatById(id);
    setLoading(false);
    if (response.success) {
      setChatHistory(chatHistory.filter((chat) => chat.id != id));
    }
  };

  const handleRename = async (id) => {
    setLoading(true);
    setIsRenaming(false);
    const response = await RenameChatById(id, rename);

    if (response.success) {
      setChatHistory(
        chatHistory.filter((chat) => {
          if (chat.id == id) {
            chat.title = rename;
          }
          return chat;
        })
      );
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <div
      className="group flex flex-row hover:cursor-pointer hover:items-center justify-between"
      key={index}
    >
      {!isRenaming && (
        <NavLink
          to={`/chat/${chat.id}`}
          key={index}
          className="group-hover:w-8/10 w-8/10 md:w-full py-2 text-sm dark:text-gray-200 text-gray-800 truncate dark:group-hover:text-cyan-300 group-hover:text-cyan-300"
          onClick={() => setisSideBarOpen(false)} // close on mobile tap
        >
          {chat.title[0].toUpperCase() + chat.title.slice(1)}
        </NavLink>
      )}
      {isRenaming && (
        <input
          autoFocus
          ref={inputRef}
          type="text"
          className="w-8/10 md:w-full py-2 text-sm dark:text-gray-200 text-gray-800 truncate group-hover:text-cyan-300 dark:bg-neutral-800 bg-gray-200 px-2 rounded-md outline-none"
          defaultValue={chat.title}
          onChange={(e) => setRename(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleRename(chat.id);
            }
          }}
          onMouseLeave={() => handleRename(chat.id)}
        />
      )}
      <i
        className="relative md:group-hover:block md:hidden ri-more-line text-2xl dark:md:text-cyan-300 md:text-cyan-300"
        onClick={() => setIsOptionOpen(!isOptionOpen)}
      >
        <div
          className={`absolute ${
            isOptionOpen ? "block" : "hidden"
          } space-y-1 top-0 right-0 w-[140px] h-auto  z-10`}
          onMouseLeave={() => setIsOptionOpen(false)}
        >
          <div className="flex flex-col gap-1 md:gap-1 rounded-lg border dark:border-neutral-800 border-gray-100 dark:bg-neutral-800 bg-gray-50 p-2 md:p-2 dark:shadow-md/50  shadow-md/10 mt-10">
            <div
              className="flex flex-row items-center gap-3 p-1 md:p-2 rounded-md dark:hover:bg-neutral-700 hover:bg-neutral-200 "
              onClick={() => {
                setIsRenaming(true);
              }}
            >
              <i className="ri-pencil-line dark:text-gray-200 text-gray-700 text-sm"></i>
              <span className="dark:text-gray-200 text-gray-700 text-xs md:text-sm font-medium font-[poppins]">
                Rename
              </span>
            </div>
            <div
              className="flex flex-row items-center gap-3 p-1 md:p-2 rounded-md dark:hover:bg-neutral-700 hover:bg-neutral-200 "
              onClick={() => handleDelete(chat.id)}
            >
              <i className="ri-delete-bin-line dark:text-red-400 text-red-500 text-sm"></i>
              <span className="dark:text-red-400 text-red-500 text-xs md:text-sm font-medium font-[poppins]">
                Delete
              </span>
            </div>
          </div>
        </div>
      </i>
      {/* Hidden menu shown only on hover */}
    </div>
  );
};
