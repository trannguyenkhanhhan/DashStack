import React from 'react';
import { MessageSquare } from 'lucide-react';

const ContactCard = ({ contact }) => (
  <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg text-center">
    <img 
      src={contact.img || "../assets/anonymous.png"} 
      alt={`${contact.first_name} ${contact.last_name}`}
      className="w-full h-56 object-cover"
      onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x300/2d3748/ffffff?text=Image'; }}
    />
    <div className="p-6">
      <h3 className="text-lg font-semibold text-white">{`${contact.first_name} ${contact.last_name}`}</h3>
      <p className="text-sm text-slate-400 mb-4">{contact.mail}</p>
      <button className="w-full bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-600 transition-colors flex items-center justify-center gap-2">
        <MessageSquare size={16} />
        Message
      </button>
    </div>
  </div>
);

export default ContactCard;
