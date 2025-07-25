import React from "react";

const InvoiceDetail = ({ buyer }) => {
  if (!buyer) return null;

  const invoiceData = {
    from: {
      name: "Virginia Walker",
      address: "9694 Krajcik Locks Suite 635",
    },
    to: {
      name: buyer.name,
      address: buyer.address,
    },
    date: buyer.date,
    due: buyer.due,
    items: buyer.item || [],
  };

  const total = invoiceData.items.reduce(
    (sum, item) => sum + item.quantity * item.cost,
    0
  );

  return (
    <div className="text-white">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 text-sm">
        <div>
          <p className="text-gray-400">Invoice From :</p>
          <p className="font-semibold">{invoiceData.from.name}</p>
          <p>{invoiceData.from.address}</p>
        </div>
        <div>
          <p className="text-gray-400">Invoice To :</p>
          <p className="font-semibold">{invoiceData.to.name}</p>
          <p>{invoiceData.to.address}</p>
        </div>
        <div>
          <p className="text-gray-400">Invoice Date : {invoiceData.date}</p>
          <p className="text-gray-400">Due Date : {invoiceData.due}</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-white">
          <thead className="bg-[#374151] text-gray-300">
            <tr>
              <th className="py-2 px-3">Serial No.</th>
              <th className="py-2 px-3">Description</th>
              <th className="py-2 px-3">Quantity</th>
              <th className="py-2 px-3">Base Cost</th>
              <th className="py-2 px-3">Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item) => (
              <tr key={item.id} className="border-b border-[#374151]">
                <td className="py-2 px-3">{item.id}</td>
                <td className="py-2 px-3">{item.description}</td>
                <td className="py-2 px-3">{item.quantity}</td>
                <td className="py-2 px-3">${item.cost}</td>
                <td className="py-2 px-3">
                  ${item.quantity * item.cost}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4 text-lg font-semibold">
        <p>Total = <span className="text-white">${total}</span></p>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button className="bg-gray-700 text-white  px-4 py-2 rounded-lg shadow hover:bg-gray-500 transition">
          Print
        </button>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-600 transition flex items-center gap-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default InvoiceDetail;
