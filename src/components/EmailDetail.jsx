import React, {  useState, useEffect } from "react";
import { FiSearch, FiTrash2, FiInfo, FiArchive } from 'react-icons/fi';
import ApiService from '../apis/ApiService';




const EmailDetail = ({ email, onBack }) => {
    const [subject2, setSubject2] = useState(Array.isArray(email.subject2) ? email.subject2 : []);
    const [message, setMessage] = useState("");
  
    const handleSend = async () => {
      if (!message.trim()) return;
  
      const newSubject2 = [
        ...subject2,
        {
          text: message,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          fromMe: true,
        },
      ];
        await ApiService.callApiAsync(
          "inbox",
          "PUT",
          {
            ...email,
            subject2: newSubject2,
          },
          email._id
        );
        setSubject2(newSubject2);
        setMessage(""); 

    };

  return (
    <div className=" w-full h-full flex flex-col">
      {/* Header */}
      <div className=" bg-[#273142] flex items-center justify-between px-6 py-4  ">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="text-gray-400 ">
            ←
          </button>
          <h2 className="font-semibold text-lg">{email.sender}</h2>
          <span className="text-xs text-white bg-purple-400 px-2 py-0.5 rounded-full">
            {email.label}
          </span>
        </div>
        <div className="flex gap-3 text-gray-500">
            <FiArchive className="cursor-pointer" />
            <FiInfo className="cursor-pointer" />
            <FiTrash2 className="cursor-pointer" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-700 space-y-4">
        <div className="max-w-[70%] p-3 rounded-lg text-sm bg-gray-200 text-black">
            <p>{email.subject}</p>
            <div className="text-xs text-right mt-1 text-gray-500">
                {email.time}
            </div>
        </div>
        {subject2.map((email, idx) => (
            <div
                key={idx}
                className={`max-w-[70%] p-3 rounded-lg text-sm ${
                email.fromMe ? "ml-auto bg-blue-500 text-white" : "bg-gray-200 text-black"
                }`}
            >
                <p>{email.text}</p>
                <div className="text-xs text-right mt-1 text-white">
                {email.time}
                </div>
            </div>
            ))}

    </div>


      {/* Footer */}
      <div className="flex items-center  p-4 bg-[#273142]">
      <input
          type="text"
          placeholder="Enter your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 mr-3 p-2 rounded bg-white text-black"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default EmailDetail;
