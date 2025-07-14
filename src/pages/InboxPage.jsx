import React, { useEffect, useState } from 'react';
import InboxSidebar from '../components/InboxSidebar';
import InboxToolbar from '../components/InboxToolbar';
import EmailTable from '../components/EmailTable';
import ApiService from '../apis/ApiService';

const InboxPage = () => {
  
  const [filter, setFilter] = useState('inbox');
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const getInbox = async () => {
      const response = await ApiService.callApiAsync('inbox', 'GET');
      const data = response.data.data;
      setEmails(data);
    };

    getInbox();
  }, []);

  return (
    <div className="min-h-screen bg-[#1e2430]">
      <div className="p-6 mt-0 space-y-6 min-h-screen bg-[#1e2430] flex justify-between">
        <InboxSidebar emails={emails} onSelectFilter={setFilter} selectedFilter={filter} />
        <div className="flex-1 flex flex-col m-8">
          <InboxToolbar />
          <EmailTable filter={filter} emails={emails} />
        </div>
      </div>
    </div>
  );
};

export default InboxPage;
