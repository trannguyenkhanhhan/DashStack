import React from 'react';
import EmailItemRow from './EmailItemRow';

const EmailTable = ({ filter, emails }) => {
  const filteredEmails = emails.filter((email) =>
    filter === 'starred' ? email.star === "True" : email.type === filter
  );

  return (
    <div className="flex flex-col rounded-b-md bg-[#273142]">
      {filteredEmails.map((email, idx) => (
        <EmailItemRow key={idx} email={email} />
      ))}
      <div className="p-4 text-sm text-gray-500 border-t flex justify-between items-center">
        <span>
          Showing {filteredEmails.length} of {emails.length}
        </span>
        <div className="space-x-2">
          <button className="px-2 py-1 border rounded">‹</button>
          <button className="px-2 py-1 border rounded">›</button>
        </div>
      </div>
    </div>
  );
};

export default EmailTable;
