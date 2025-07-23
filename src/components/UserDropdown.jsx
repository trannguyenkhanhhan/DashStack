import { useState, useRef, useEffect } from "react";
import { LogOut, User, Settings, ChevronDown } from "lucide-react";
import ApiService from "../apis/ApiService";
import defaultAvatar from "../assets/avt.png";

const UserDropdown = ({ onShowProfile, onLogout }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({ user_name: "Loading...", avatar: defaultAvatar });
  const dropdownRef = useRef();

  useEffect(() => {
    const getAccount = async () => {
      try {
        const accountId = localStorage.getItem("accountId");
        const res = await ApiService.callApiAsync("account", "GET");
        const accounts = res?.data?.data || [];
        const currentUser = accounts.find((acc) => acc._id === accountId);

        if (currentUser) {
          setUser({
            user_name: currentUser.user_name || "Unknown",
            avatar: currentUser.img || defaultAvatar,
          });
        }
      } catch (err) {
        setUser({ user_name: "Unknown", avatar: defaultAvatar });
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
    <div className="relative " ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 p-1 rounded-lg hover:bg-slate-700"
      >
        <img
          src={user.avatar}
          alt="Avatar"
          className="h-10 w-10 rounded-full object-cover border-2 border-slate-600"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultAvatar;
          }}
        />
        <div className=" text-left hidden sm:block">
          <p className="font-semibold text-sm text-white">{user.user_name}</p>
          <p className="text-xs text-gray-400">User</p>
        </div>
        <ChevronDown className="h-5 w-5 " />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-[#384153] rounded-lg shadow-xl py-2 z-50">
          <button
            onClick={() => {
              setOpen(false);
              onShowProfile();
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#3c445a] hover:text-white w-full"
          >
            <User className="w-4 h-4" />
            Profile
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#3c445a] hover:text-white w-full"
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>

          <button
            onClick={() => {
              setOpen(false);
              onLogout(); // ✅ Gọi đúng hàm được truyền từ App.jsx
            }}
            className="w-full flex items-center gap-3 text-sm text-gray-300 "
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>

        </div>
      )}
    </div>
  );
};

export default UserDropdown;
