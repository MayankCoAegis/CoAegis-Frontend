import { useState } from 'react';

export default function SearchModal({ isOpen,onClose }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Future: trigger API or filtering logic
  };

  if(!isOpen) return;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full p-3 mx-4 min-h-7/10 max-h-9/10 md:w-[650px] md:h-3/4 bg-[#2f2f2f] rounded-lg shadow-lg border border-[#3a3a3a] flex flex-col  overflow-y-auto dark-scrollbar md:p-3 gap-2 md:gap-2">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-white text-sm self-end hover:text-gray-300"
        >
          <i className="ri-close-line md:!text-xl"></i>
        </button>

        {/* Label and Input */}
        <div className="w- border-b border-[#3a3a3a] pb-1 md:pb-2">
          <label htmlFor="search" className="block text-white mb-1 text-xs md:!text-sm">
            
          </label>
          <div className="flex items-center gap-4">
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Chats ..."
              className="text-xs md:!text-sm w-full px-4 py-2 rounded-md text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="!text-xs md:!text-sm text-white md:px-4 px-3 py-2 md:py-1 items-center rounded-md flex items-center gap-1 transition cursor-pointer transform hover:scale-105"
            >
              <i className="ri-search-line text-md md:text-lg"></i>
              {/* <span className="hidden sm:inline !text-xs md:!text-sm">Search</span> */}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-2 text-white flex flex-col flex-1 rounded-md p-3 overflow-y-auto dark-scrollbar md:p-2 gap-5 !text-xs md:text-sm md:!text-gray-400">
          <div className='flex flex-row !text-xs md:!text-sm !text-gray-200 gap-2 items-center cursor-pointer'>
            <i class="ri-chat-1-line text-md md:text-lg"></i>
            <span>Lorem Ipsum 1</span>
          </div>
           <div className='flex flex-row text-xs md:text-sm text-gray-200 gap-2 items-center cursor-pointer'>
            <i class="ri-chat-1-line text-md md:text-lg"></i>
            <span>Lorem Ipsum 2</span>
          </div>
        </div>
      </div>
    </div>
  );
}
