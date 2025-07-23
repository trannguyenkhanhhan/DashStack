import React, { useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';

const EmailItemRow = ({ email }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [starred, setStarred] = useState(email.star === "True");

  const handleCheck = (e) => setIsChecked(e.target.checked);
  const handleClickStar = () => setStarred(!starred);

  const getLabelColor = (label = '') => {
    const colorMap = {
      primary: 'bg-green-200 text-green-800',
      social: 'bg-blue-200 text-blue-800',
      work: 'bg-orange-200 text-orange-800',
      friend: 'bg-purple-200 text-purple-800',
    };
    return colorMap[label.toLowerCase()] || 'bg-gray-300 text-gray-800';
  };

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 border-b cursor-pointer ${
        isChecked ? 'bg-gray-600' : 'hover:bg-gray-600'
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          className="accent-blue-400"
          checked={isChecked}
          onChange={handleCheck}
        />
        <span onClick={handleClickStar} className="cursor-pointer text-xl">
          {starred ? (
            <AiFillStar className="text-yellow-400" />
          ) : (
            <FiStar className="text-gray-400 hover:text-yellow-300" />
          )}
        </span>
        <p className="font-medium">{email.sender}</p>
        <span className={`text-xs px-2 py-1 rounded ${getLabelColor(email.label)}`}>
          {email.label}
        </span>
        <p className="text-gray-400 text-sm truncate w-[280px]">{email.subject}</p>
      </div>
      <span className="text-sm text-gray-400">{email.time}</span>
    </div>
  );
};

export default EmailItemRow;
