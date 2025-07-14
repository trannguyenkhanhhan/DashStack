import React, { useState, useEffect } from "react";
import AddProductButton from "./AddProductBnt";

const ProductFilter = ({ data, onFilter, onAddProduct }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!data || !Array.isArray(data)) return;

    const filtered = data.filter((item) =>
      item.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    onFilter(filtered);
  }, [searchTerm, data, onFilter]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between  gap-4 bg-gray-800 px-4 py-4 rounded-xl my-6">
      
      <div className="flex items-center bg-[#323D4E] rounded-full px-4 py-2 h-[50px] w-full mr-10">
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
            className="bg-[#323D4E] h-[50px] p-2 w-full rounded-xl border-none focus:outline-none focus:ring-0 placeholder-gray-500 text-white  appearance-none leading-normal text-sm"
            value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
     

      
      <AddProductButton></AddProductButton>
      
    </div>
  );
};

export default ProductFilter;
