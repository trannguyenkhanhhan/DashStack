import React from 'react';
import { FiSearch, FiTrash2, FiInfo, FiArchive } from 'react-icons/fi';

const InboxToolbar = ({ checkedIds = [], onDelete }) => {
  const handleBulkDelete = () => {
    if (checkedIds.length === 0) {
      alert("Please select at least one email to delete.");
      return;
    }

    if (window.confirm("Are you sure you want to delete selected emails?")) {
      checkedIds.forEach((id) => onDelete(id));
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-t-md bg-[#273142]">
      <div className="relative w-1/2">
        <FiSearch className="absolute top-2.5 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search mail"
          className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-700 text text-sm"
        />
      </div>
      <div className="flex items-center gap-4 text-gray-500">
        <FiArchive className="cursor-pointer" />
        <FiInfo className="cursor-pointer" />
        <button onClick={handleBulkDelete} className="p-0">
          <FiTrash2 className="cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default InboxToolbar;
