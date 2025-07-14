import React, { useEffect, useState } from "react";
import ApiService from "../apis/ApiService";
import InvoiceDetail from "../components/InvoiceDetail";

const InvoicePage = () => {
  const [buyers, setBuyers] = useState([]);
  const [selectedBuyer, setSelectedBuyer] = useState(null);

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const res = await ApiService.callApiAsync("order", "GET");
        setBuyers(res.data.data || []);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", err);
      }
    };

    fetchBuyers();
  }, []);

  return (
    <div className="p-6 bg-[#1e2430] min-h-screen text-white">
  <div className="grid grid-cols-12 gap-6">

<div className="col-span-12 md:col-span-3 bg-[#273142] p-4 rounded-xl shadow">
  <h2 className="text-xl font-semibold mb-4">Buyers</h2>

  <div className="flex items-center bg-[#323D4E] rounded-full mb-3 px-4 py-2 w-full max-w-lg">
          <svg
            className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="search"
            placeholder="Search"
            className="bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-500 text-white w-full appearance-none leading-normal text-sm"
          />
        </div>

  <ul className="space-y-2 max-h-[500px] no-scrollbar overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-[#1e2430] pr-1">
    {buyers.map((buyer) => (
      <li
        key={buyer.id}
        onClick={() => setSelectedBuyer(buyer)}
        className="cursor-pointer p-3 bg-[#1e2430] hover:bg-[#374151] rounded-xl transition"
      >
        <div className="font-semibold">{buyer.name}</div>
        <div className="text-sm text-gray-400">{buyer.address}</div>
      </li>
    ))}
  </ul>
</div>



    <div className="col-span-12 md:col-span-9 bg-[#273142] p-4 rounded-xl shadow">
        
      {selectedBuyer ? (
        <InvoiceDetail buyer={selectedBuyer} />
      ) : (
        <p className="text-gray-400">
            Select a buyer to view invoices</p>
      )}
    </div>
  </div>
</div>

  );
};

export default InvoicePage;
