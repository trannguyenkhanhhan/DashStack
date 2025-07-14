import React from 'react';
import { Search, Bell, Menu, ChevronDown, User, Settings, LogOut, Globe } from 'lucide-react';
import DropdownContainer from './DropdownContainer';

const Header = ({ toggleSidebar, isSidebarOpen }) => {

  const profileItems = [
    { label: 'My Profile', icon: User, onClick: () => console.log('Profile clicked') },
    { label: 'Settings', icon: Settings, onClick: () => console.log('Settings clicked') },
    { label: 'Logout', icon: LogOut, onClick: () => console.log('Logout clicked') },
  ];

  const languageItems = [
    { label: 'English', icon: Globe, onClick: () => console.log('English selected') },
    { label: 'Español', icon: Globe, onClick: () => console.log('Spanish selected') },
    { label: 'Français', icon: Globe, onClick: () => console.log('French selected') },
  ];

  const languageTrigger = (
    <div className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-700">
      <img src="https://placehold.co/32x32/a855f7/ffffff?text=UK" alt="Language" className="h-6 w-6 rounded-full object-cover" />
      <span className="font-medium">English</span>
      <ChevronDown className="h-5 w-5 text-gray-400" />
    </div>
  );

  const profileTrigger = (
    <div className="flex items-center gap-3 p-1 rounded-lg hover:bg-slate-700">
      <img 
        src="https://placehold.co/40x40/f472b6/ffffff?text=MR" 
        alt="User Avatar" 
        className="h-10 w-10 rounded-full object-cover border-2 border-slate-600"
        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/40x40/cccccc/ffffff?text=User'; }}
      />
      <div>
        <p className="font-semibold text-sm">Moni Roy</p>
        <p className="text-xs text-gray-400">Admin</p>
      </div>
      <ChevronDown className="h-5 w-5 text-gray-400" />
    </div>
  );

  return (
    <header className="bg-[#273142] text-white p-4 flex items-center justify-between w-full z-10">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-baseline mr-2 px-8">
            <span className="text-2xl font-bold text-[#4880FF] whitespace-nowrap">Dash</span>
            <span className="text-2xl font-bold text-slate-300 whitespace-nowrap">Stack</span>
        </div>
        <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-slate-700">
          <Menu className="h-6 w-6" />
        </button>
        <div className="relative w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="bg-slate-700 border-none rounded-full w-full pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-slate-700">
          <Bell className="h-6 w-6" />
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-slate-800"></span>
        </button>

        <DropdownContainer trigger={languageTrigger} items={languageItems} />
        <DropdownContainer trigger={profileTrigger} items={profileItems} />
      </div>
    </header>
  );
};

export default Header;
