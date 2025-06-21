import { useState } from "react";

function SelectModel({ models, selectedModel, onModelChange })
{
const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Grab ZeroPoint");

  const handleSelect = (option) => {
    setSelectedOption(option);
    setOpen(false);
  };

  return (
    <div
      className="relative inline-block text-left shadow-md"
      
    >
      {/* Main Button */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1 px-2 bg-black/50  rounded-md cursor-pointer hover:bg-gray-900"
      >
        <i className="ri-sparkling-fill text-cyan-400 text-lg rounded-lg"></i>
        <span className="text-white text-sm font-medium">{selectedOption}</span>
        <span className="bg-cyan-900 text-cyan-300 text-xs px-2 py-0.5 rounded-md font-semibold">
          Beta
        </span>
        <i
          className={`ri-arrow-down-s-line text-white text-sm transition-transform ${
            open ? "rotate-180" : ""
          }`}
        ></i>
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-neutral-800 divide-y divide-gray-100 rounded-md shadow-lg z-50">
          <ul className="py-1 text-xs text-gray-200">
            {["ZeroPoint", "QuantumFlow", "DarkMatter", "Singularity"].map(
              (option) => (
                <li
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="px-4 py-2 hover:text-cyan-400 cursor-pointer"
                >
                  {option}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
export default SelectModel;