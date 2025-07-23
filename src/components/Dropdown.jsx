import React from 'react';


const Dropdown = ({ items, onClose }) => {
  return (
    <div className="absolute top-full right-0 mt-2 w-48 bg-slate-700 rounded-lg shadow-xl py-1 z-20">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <a
              href={item.link}
              className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-600 gap-2"
              onClick={(e) => {
                e.preventDefault();
                if (item.onClick) item.onClick();
                onClose();
              }}
            >
              {item.icon && <item.icon className="h-4 w-4 mr-3" />}
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;