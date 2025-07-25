import React from 'react';
import { NavLink } from 'react-router-dom';


const NavItem = ({ item, isSidebarOpen, onClick }) => {
  const Icon = item.icon;

  if (item.name === "Logout" && typeof onClick === "function") {
    return (
      <li>
        <div
          onClick={onClick}
          className="flex items-center p-2 rounded-md group hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer transition-colors duration-200"
        >
          <Icon className={`flex-shrink-0 ${isSidebarOpen ? 'mr-3' : 'mx-auto'} h-6 w-6`} />
          <span className={`origin-left whitespace-nowrap transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 scale-x-0'}`}>
            {item.name}
          </span>
        </div>
      </li>
    );
  }


  return (
    <li>
      <NavLink
        to={item.path}
        end={item.path === '/'}
        className={({ isActive }) =>
          `flex items-center p-2 rounded-md group ${
            isActive ? 'bg-slate-700 text-white' : 'hover:bg-slate-700 text-slate-300 hover:text-white'
          } transition-colors duration-200`
        }
      >
        <Icon className={`flex-shrink-0 ${isSidebarOpen ? 'mr-3' : 'mx-auto'} h-6 w-6`} />
        <span className={`origin-left whitespace-nowrap transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 scale-x-0'}`}>
          {item.name}
        </span>
      </NavLink>
    </li>
  );
};

export default NavItem;
