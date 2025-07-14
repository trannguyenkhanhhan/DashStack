import React from 'react';

const ChartHeader = ({ products, selectedProduct, onProductChange }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Sales Details</h2>
      <select
        value={selectedProduct}
        onChange={(e) => onProductChange(e.target.value)}
        className="bg-slate-700 text-white border-none rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {products.map(product => (
          <option key={product._id} value={product.product_name}>
            {product.product_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChartHeader;
