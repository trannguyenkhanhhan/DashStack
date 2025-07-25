import React, { useState } from 'react';
import ApiService from '../apis/ApiService';

const rawSidebarMenu = [
  { label: 'Inbox', key: 'inbox' },
  { label: 'Starred', key: 'starred' },
  { label: 'Sent', key: 'sent' },
  { label: 'Draft', key: 'draft' },
  { label: 'Spam', key: 'spam' },
  { label: 'Important', key: 'important' },
  { label: 'Bin', key: 'bin' },
];

const labels = [
  { name: 'Primary', color: 'bg-green-200 text-green-800' },
  { name: 'Social', color: 'bg-blue-200 text-blue-800' },
  { name: 'Work', color: 'bg-orange-200 text-orange-800' },
  { name: 'Friends', color: 'bg-purple-200 text-purple-800' },
];

const InboxSidebar = ({ emails, onSelectFilter, selectedFilter }) => {
  const [showModal, setShowModal] = useState(false);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [label, setLabel] = useState(labels[0].name);

  const sidebarMenu = rawSidebarMenu.map((item) => {
    const count =
      item.key === "starred"
        ? emails.filter((email) => email.star === "True").length
        : emails.filter((email) => email.type === item.key).length;
    return { ...item, count };
  });

  const handleSend = async () => {
    if (!to.trim() || !subject.trim()) {
      alert("Please enter both recipient and subject.");
      return;
    }
  
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  
    const newEmail = {
      sender: to,
      subject: subject, 
      subject2: [
      ],
      label,
      time: formattedTime,
      star: "False",
      type: "sent",
    };
  
    try {
      await ApiService.callApiAsync("inbox", "POST", newEmail);
      setShowModal(false);
      setTo("");
      setSubject("");
      setLabel(labels[0].name);
    } catch (err) {
      console.error("Send failed:", err);
    }
  };
  
  

  return (
    <div className="w-[240px] rounded-md bg-[#273142] p-4 space-y-6 relative">
      <button
        onClick={() => setShowModal(true)}
        className="bg-gray-700 text-white px-4 py-2 rounded w-full"
      >
        + Compose
      </button>

      <div>
        <h2 className="font-bold mb-2">My Email</h2>
        <ul className="space-y-2 text-sm">
          {sidebarMenu.map((item) => (
            <li
              key={item.key}
              className={`flex justify-between cursor-pointer px-2 py-1 rounded ${
                selectedFilter === item.key ? 'bg-gray-600 text-white font-semibold' : ''
              }`}
              onClick={() => onSelectFilter(item.key)}
            >
              <span>{item.label}</span>
              <span>{item.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-bold mb-2">Label</h3>
        <ul className="space-y-2 text-sm">
          {labels.map((label) => (
            <li key={label.name} className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${label.color}`}></span>
              {label.name}
            </li>
          ))}
        </ul>
        <button className="mt-3 ml-6 bg-gray-700 text-white text-sm">+ Create New Label</button>
      </div>


      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-[#1e2430] rounded-2xl shadow-xl w-[380px] px-6 py-6 space-y-6 backdrop-blur-sm border border-[#2e3b55]">
      <h2 className="text-xl font-bold text-white text-center">New Message</h2>

      <div className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-white mb-1">To</label>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full bg-[#2a3143] text-white px-4 py-2 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Recipient email"
          />
        </div>


        <div>
          <label className="block text-sm font-medium text-white mb-1">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-[#2a3143] text-white px-4 py-2 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Subject"
          />
        </div>


        <div>
          <label className="block rounded-lg text-sm font-medium text-white mb-1">Label</label>
          <select
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full bg-[#2a3143] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {labels.map((l) => (
              <option
                key={l.name}
                value={l.name}
                className="bg-[#1e2430] rounded-lg text-white"
              >
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </div>


      <div className="flex justify-end space-x-3 pt-2">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-[#3f51b5] hover:bg-[#334296] text-white rounded-lg transition"
        >
          Send
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default InboxSidebar;
