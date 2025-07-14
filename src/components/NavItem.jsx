import React from 'react';




const NavItem = ({ item,isActive,onClick ,isSidebarOpen }) => {
  return (
    <li className="w-full">
      <a
        href="#"
        onClick={()=>onClick(item.name)}
        className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-blue-500 text-white'
            : 'text-slate-300 hover:bg-slate-700'
        } ${!isSidebarOpen && 'justify-center'}`}
      >
        <item.icon className="h-5 w-5 flex-shrink-0" />
        <span
          className={`font-medium overflow-hidden transition-all duration-200 ${
            isSidebarOpen ? 'w-auto ml-4' : 'w-0 ml-0'
          }`}
        >
          {item.name}
        </span>
      </a>
    </li>
  );
};

export default NavItem;