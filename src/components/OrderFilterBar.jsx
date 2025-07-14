import React from 'react';

const OrderFilterBar = ({
  orders = [],
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
}) => {
  const uniqueTypes = [...new Set(orders.map((o) => o.type))];
  const uniqueStatuses = [...new Set(orders.map((o) => o.status))];

  return (
    <div className="flex flex-wrap items-center gap-4 bg-[#273142] p-4 rounded-md shadow mb-6">
      <span className="text-gray-400">Filter By</span>

 
      <select
        className="px-3 py-1 bg-gray-700 rounded-[10px]"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
      >
        <option className="rounded-md" value="">Date</option>
        <option value="newest">Newest to Oldest</option>
        <option className="rounded-md  "  value="oldest">Oldest to Newest</option>
      </select>


      <select
        className="px-3 py-1 bg-gray-700 rounded-[10px]"
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
      >
        <option value="">Order Type</option>
        {uniqueTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>


      <select
        className="px-3 py-1 bg-gray-700 rounded-[10px]"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">Order Status</option>
        {uniqueStatuses.map((status) => (
          <option key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
          </option>
        ))}
      </select>


      <button
        onClick={() => {
          setTypeFilter('');
          setStatusFilter('');
          setDateFilter('');
        }}
        className="ml-auto bg-gray-800 text-gray-400 hover:underline"
      >
        Reset Filter
      </button>
    </div>
  );
};

export default OrderFilterBar;
