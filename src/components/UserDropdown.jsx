import { useState, useRef, useEffect } from "react";
import ApiService from "../apis/ApiService";
import defaultAvatar from "../assets/img/avt.png";

const UserDropdown = ({ setIsLoggedIn, onShowProfile, onLogout }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({ user_name: "Loading...", avatar: defaultAvatar });
  const dropdownRef = useRef();

  useEffect(() => {
    const getAccount = async () => {
      try {
        const accountId = localStorage.getItem("accountId");
        if (!accountId) {
          setUser({ user_name: "Unknown User", avatar: defaultAvatar });
          return;
        }
  
        const res = await ApiService.callApiAsync("account", "GET");
        const accounts = res?.data?.data || [];
  
        const currentUser = accounts.find((acc) => acc._id === accountId);
        if (currentUser) {
          setUser({
            user_name: currentUser.user_name || "Unknown User",
            avatar: currentUser.img || defaultAvatar,
          });
        } else {
          setUser({ user_name: "Unknown User", avatar: defaultAvatar });
        }
      } catch (err) {
        console.error("Failed to load account:", err);
        setUser({ user_name: "Unknown User", avatar: defaultAvatar });
      }
    };
  
    getAccount();
  }, []);
  
  

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
    <div className="relative bg-[#273142]" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center bg-[#273142] focus:outline-none"
      >
        <img
          className="h-8 w-8 rounded-full object-cover"
          src={user.avatar || defaultAvatar}
          alt="User avatar"
        />
        <div className="ml-2 hidden sm:block text-left">
          <div className="text-sm font-semibold text-white">{user.user_name}</div>
          <div className="text-xs text-gray-400">User </div>
        </div>
        <span className="hidden sm:block text-gray-400 text-xs">▼</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
          <button
            onClick={() => {
              setOpen(false);
              onShowProfile();
            }}
            className="block w-full bg-gray-800 text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Profile
          </button>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Settings
          </a>
          <hr className="border-gray-700 my-1" />
          <button
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="block w-full bg-gray-800 text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
