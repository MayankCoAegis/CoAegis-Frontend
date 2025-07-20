import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useLoader } from "../contexts/LoaderContext";

export default function HomepagePass({ isOpen, onClose }) {
  const { setLoading } = useLoader();
  const [password, setPassword] = useState("");

  const handleVerify = async () => {
    if (password == "coaegis") {
      onClose();
    }
  };

  if (!isOpen) return;

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-ful p-3 mx-4 md:w-[650px] dark:bg-[#2f2f2f] bg-[#ffffff] rounded-lg shadow-lg border border-[#3a3a3a] flex flex-col dark-scrollbar md:p-3 gap-2 md:gap-2">
        {/* Input */}

        <div className="flex items-center gap-4">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter Password"
            className="md:flex-1 w-4/5 text-sm dark:bg-neutral-800 bg-neutral-200 dark:text-gray-300 text-gray-800 dark:placeholder-gray-500 placeholder-gray-600 border dark:border-gray-700 border-gray-200 rounded-md p-2 outline-none dark:focus:ring-2 focus:ring-0 focus:ring-cyan-600"
          />

          <button
            onClick={handleVerify}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleVerify();
              }
            }}
            className="!text-xs bg-[#00b1cc] hover:bg-[#00b1cc]/90 text-white font-medium px-4 py-2 rounded-md transition duration-200 cursor-pointer "
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
