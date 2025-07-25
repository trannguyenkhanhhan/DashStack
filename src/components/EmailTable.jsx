import React, { useState } from 'react';
import EmailItemRow from './EmailItemRow';

const EmailTable = ({ filter, emails, onCheckChange, checkedIds, onDelete, onRowClick  }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const emailsPerPage = 12;

  const filteredEmails = emails.filter((email) =>
    filter === 'starred' ? email.star === "True" : email.type === filter
  );

  const totalPages = Math.ceil(filteredEmails.length / emailsPerPage);
  const startIndex = (currentPage - 1) * emailsPerPage;
  const endIndex = startIndex + emailsPerPage;
  const currentEmails = filteredEmails.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex flex-col rounded-b-md bg-[#273142]">
      {currentEmails.map((email) => (
       <EmailItemRow
        key={email._id || email.id}
        email={email}
        isChecked={checkedIds.includes(email._id)}
        onCheckChange={onCheckChange}
        onDelete={onDelete}
        onClick={() => onRowClick(email)} 
      />
     
      ))}

      <div className="p-4 text-sm text-gray-500 border-t flex justify-between items-center">
        <span>
          Showing {startIndex + 1} to {Math.min(endIndex, filteredEmails.length)} of {filteredEmails.length}
        </span>
        <div className="space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            ‹
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailTable;
