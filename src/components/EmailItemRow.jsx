import React, { useEffect, useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';
import ApiService from '../apis/ApiService';

const EmailItemRow = ({ email, isChecked, onCheckChange, onClick }) => {
  const [starred, setStarred] = useState(email.star === "True");

  useEffect(() => {
    setStarred(email.star === "True");
  }, [email.star]);

  const handleCheck = (e) => {
    e.stopPropagation(); 
    if (onCheckChange) {
      onCheckChange(email._id, e.target.checked);
    }
  };

  const handleClickStar = async (e) => {
    e.stopPropagation(); 
    const newStar = !starred;
    setStarred(newStar);

    try {
      await ApiService.callApiAsync(
        "inbox",
        "PUT",
        { ...email, star: newStar ? "True" : "False" },
        email._id
      );
    } catch (error) {
      console.error("Failed to update star:", error);
      setStarred(!newStar);
    }
  };

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
      <div className="flex items-center gap-3 w-full">
 
        <input
          type="checkbox"
          className="accent-blue-400"
          checked={isChecked}
          onChange={handleCheck}
          onClick={(e) => e.stopPropagation()}
        />


        <span onClick={handleClickStar} className="cursor-pointer text-xl">
          {starred ? (
            <AiFillStar className="text-yellow-400" />
          ) : (
            <FiStar className="text-gray-400 hover:text-yellow-300" />
          )}
        </span>


        <div
          className="flex items-center gap-3 flex-1"
          onClick={() => onClick && onClick(email)}
        >
          <p className="font-medium">{email.sender}</p>
          <span className={`text-xs px-2 py-1 rounded ${getLabelColor(email.label)}`}>
            {email.label}
          </span>
          <p className="text-gray-400 text-sm truncate w-[280px]">{email.subject}</p>
        </div>
      </div>

      <span className="text-sm text-gray-400">{email.time}</span>
    </div>
  );
};

export default EmailItemRow;
