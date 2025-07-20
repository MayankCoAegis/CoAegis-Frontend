import { use, useState } from 'react';
import { SearchChat } from '../api/search';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../contexts/LoaderContext';

export default function SearchModal({ isOpen,onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const {setLoading}=useLoader();
  const navigate=useNavigate();

  const handleSearch = async() => {
    setLoading(true);
    console.log('Searching for:', searchQuery);
    const response=await SearchChat(searchQuery);
    setLoading(false);
    if(response.success) setSearchResults(response.chats);
    // Future: trigger API or filtering logic
  };

  if(!isOpen) return;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center dark:bg-black/50 bg-black/10 backdrop-blur-sm">
      <div className="w-full p-3 mx-4 min-h-7/10 max-h-9/10 md:w-[650px] md:h-3/4 dark:bg-[#2f2f2f] bg-[#f0f4f9] rounded-lg shadow-lg border dark:border-[#3a3a3a] border-gray-200 flex flex-col  overflow-y-auto dark-scrollbar md:p-3 gap-2 md:gap-2">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="dark:text-white text-gray-700 md:text-sm self-end hover:text-gray-300"
        >
          <i className="ri-close-line md:!text-xl"></i>
        </button>

        {/* Label and Input */}
        <div className="w- border-b border-[#3a3a3a] pb-1 md:pb-2">
          <label htmlFor="search" className="block dark:text-white text-gray-700 mb-1 text-xs md:!text-sm">
            
          </label>
          <div className="flex items-center gap-4">
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Chats ..."
              className="text-xs md:!text-sm w-full px-4 py-2 rounded-md dark:text-white text-gray-700 dark:placeholder-neutral-400 placeholder-gray-400 focus:outline-none dark:focus:ring-2 dark:focus:ring-blue-500 "
            />
            <button
              onClick={handleSearch}
              className="!text-xs md:!text-sm dark:text-white text-gray-700 md:px-4 px-3 py-2 md:py-1 items-center rounded-md flex items-center gap-1 transition cursor-pointer transform hover:scale-105"
            >
              <i className="ri-search-line text-md md:text-lg"></i>
              {/* <span className="hidden sm:inline !text-xs md:!text-sm">Search</span> */}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-2 text-white flex flex-col flex-1 rounded-md p-3 overflow-y-auto dark-scrollbar md:p-2  md:px-3 gap-5 !text-xs md:text-sm md:!text-gray-400">
          {searchResults && searchResults.length > 0 && searchResults.map((chat, index) => (
            <div className='flex flex-row !text-xs md:!text-sm dark:text-gray-200 text-gray-800 gap-2 md:gap-3 items-center cursor-pointer hover:!text-cyan-400 transition duration-200 '  key={index}
            onClick={()=>{onClose(),navigate(`/chat/${chat.id}`)}}>
            <i class="ri-chat-1-line text-md md:text-lg"></i>
            <span>{chat.title[0].toUpperCase() + chat.title.slice(1)}</span>
          </div>
          ))}
           
        </div>
      </div>
    </div>
  );
}
