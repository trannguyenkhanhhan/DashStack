import React, { useState } from 'react';

const statusColors = {
  'Completed': 'bg-green-200 text-green-800',
  'Processing': 'bg-purple-200 text-purple-800',
  'Rejected': 'bg-red-200 text-red-800',
  'On Hold': 'bg-yellow-200 text-yellow-800',
  'In Transit': 'bg-blue-200 text-blue-800',
};

const formatStatus = (status) => {
  if (!status) return '';
  return status
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const OrderTable = ({ orders }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(orders.length / pageSize);

  const paginatedOrders = orders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[#273142] rounded-md shadow">
        <thead className="bg-[#273142] text-left">
          <tr>
            <th className="py-3 px-4">ID</th>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Address</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Type</th>
            <th className="py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map((order) => (
            <tr
              key={order.id}
              className="border-t hover:bg-gray-700 transition"
            >
              <td className="py-3 px-4">{order.id}</td>
              <td className="py-3 px-4">{order.name}</td>
              <td className="py-3 px-4">{order.address}</td>
              <td className="py-3 px-4">{order.date}</td>
              <td className="py-3 px-4">{order.type}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded ${
                    statusColors[formatStatus(order.status)] ||
                    'bg-gray-200 text-gray-800'
                  }`}
                >
                  {formatStatus(order.status)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <div className="text-sm flex justify-between text-gray-500 mt-2 ml-2 items-center">
        <span>
          Showing {(currentPage - 1) * pageSize + 1}-
          {Math.min(currentPage * pageSize, orders.length)} of {orders.length}
        </span>
        <div className="space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-2 py-1 rounded ${
              currentPage === 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#273142]'
            }`}
          >
            ‹
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 rounded ${
              currentPage === totalPages ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#273142]'
            }`}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
