import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useContacts } from '../hooks/useContacts';
import ContactCard from './ContactCard';
import AddContactForm from './AddContactForm';

const ContactPage = () => {
  const [view, setView] = useState('list'); // 'list' or 'add'
  const { contacts, loading, error, addContact } = useContacts();

  const handleAddContact = async (newContactData) => {
    try {
      await addContact(newContactData);
      setView('list'); // Switch back to list view only on success
    } catch (err) {
      // Error is already logged in the hook, but you could show a notification here
      console.error("Failed to add contact from page component.");
    }
  };

  if (loading) return <div className="p-6 text-center text-white">Loading contacts...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;

  return (
    <div className=" p-6 bg-[#1e2430] min-h-full text-white">
      {view === 'list' ? (
        <>
          <div className=" bg-[#1e2430] flex justify-between items-center mb-8 gap-2">
            <h1 className="text-3xl font-semibold">Contact</h1>
            <button onClick={() => setView('add')} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
              <Plus size={20} />
              Add New Contact
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {contacts.map(contact => (
              <ContactCard key={contact._id} contact={contact} />
            ))}
          </div>
        </>
      ) : (
        <AddContactForm onCancel={() => setView('list')} onAddContact={handleAddContact} />
      )}
    </div>
  );
};

export default ContactPage;