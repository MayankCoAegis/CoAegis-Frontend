import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useLoader } from '../contexts/LoaderContext';

export default function HomepagePass({ isOpen,onClose }) {
  const {setLoading}=useLoader();
  const [password, setPassword] = useState('');

 const handleVerify=async()=>{
    if(password=="coAegis@123")
    {
        onClose();
    }
 }

  if(!isOpen) return;

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full p-3 mx-4 md:w-[650px] bg-[#2f2f2f] rounded-lg shadow-lg border border-[#3a3a3a] flex flex-col  overflow-y-auto dark-scrollbar md:p-3 gap-2 md:gap-2">
        

        {/* Input */}
        <div className="">
          <div className="flex items-center gap-4">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
              placeholder="Enter Password"
              className="text-xs md:!text-sm w-full px-4 py-2 rounded-md text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-[#3a3a3a] bg-[#3a3a3a]"
            />

            <button onClick={handleVerify} className="!text-xs bg-[#00b1cc] hover:bg-[#00b1cc]/90 text-white font-medium px-4 py-2 rounded-md transition duration-200 cursor-pointer ">Verify</button>
        
          </div>
        </div>

      </div>
    </div>
  );
}
