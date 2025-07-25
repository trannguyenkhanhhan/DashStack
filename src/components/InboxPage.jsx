import React, { useEffect, useState } from 'react';
import InboxSidebar from '../components/InboxSidebar';
import InboxToolbar from '../components/InboxToolbar';
import EmailTable from '../components/EmailTable';
import ApiService from '../apis/ApiService';
import EmailDetail from './EmailDetail';

const InboxPage = () => {
  
  const [filter, setFilter] = useState('inbox');
  const [emails, setEmails] = useState([]);
  const [checkedIds, setCheckedIds] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);


  useEffect(() => {
    const getInbox = async () => {
      const response = await ApiService.callApiAsync('inbox', 'GET');
      const data = response.data.data;
      setEmails(data);
    };

    getInbox();
  }, []);

  const handleDelete = async (id) => {
    await ApiService.callApiAsync("emails", "DELETE", null, id);
    setEmails((prev) => prev.filter((e) => e._id !== id));
    if (selectedEmail && selectedEmail._id === id) {
      setSelectedEmail(null); 
    }
  };
  
  
  const handleUpdateEmail = (updatedEmail) => {
    setEmails((prev) =>
      prev.map((e) => (e._id === updatedEmail._id ? updatedEmail : e))
    );
    setSelectedEmail(updatedEmail);
  };

  return (
    <div className="min-h-screen bg-[#1e2430]">
      <div className="p-6 mt-0 space-y-6 min-h-screen bg-[#1e2430] flex justify-between">
        <InboxSidebar emails={emails} onSelectFilter={setFilter} selectedFilter={filter} />
        <div className="flex-1 flex flex-col m-8">
        {selectedEmail ? (
          <EmailDetail
            email={selectedEmail}
            onBack={() => setSelectedEmail(null)}
            onMessageSent={handleUpdateEmail}
          />
        ) : (
          <>
            <InboxToolbar onDelete={handleDelete} />
            <EmailTable
              filter={filter}
              emails={emails}
              checkedIds={checkedIds}
              onCheckChange={(id, checked) => {
                setCheckedIds((prev) =>
                  checked ? [...prev, id] : prev.filter((i) => i !== id)
                );
              }}
              onDelete={handleDelete}
              onRowClick={(email) => setSelectedEmail(email)}
            />
          </>
        )}




        </div>
      </div>
    </div>
  );
};

export default InboxPage;
