import { useState, useRef, useEffect } from "react";
import flat from "../assets/img/UK Flag.png"

const LanguageDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative bg-[#273142] text-gray-400 hover:text-white" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center bg-[#273142] text-gray-400 hover:text-white focus:outline-none"
      >
        <img
          src={flat}
          alt="English"
          className="w-5 h-5 mr-1 rounded-sm object-cover"
        />
        <span className="text-sm">English</span>
        <svg
          className="w-3 h-3 ml-1"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 
            111.414 1.414l-4 4a1 1 0 01-1.414 
            0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg py-1 z-50">
          <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
            <div className="flex items-center">
             
              French
            </div>
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
            <div className="flex items-center">
              
              German
            </div>
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
            <div className="flex items-center">
              
              Spanish
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
