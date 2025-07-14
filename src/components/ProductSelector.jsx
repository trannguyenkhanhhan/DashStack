import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

const ProductSelector = ({ products, selectedProducts, onSelectionChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddProduct = (productName) => {
    if (!selectedProducts.includes(productName)) {
      onSelectionChange([...selectedProducts, productName]);
    }
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  const handleRemoveProduct = (productName) => {
    onSelectionChange(selectedProducts.filter(p => p !== productName));
  };

  const availableProducts = products
    .filter(p => !selectedProducts.includes(p.product_name))
    .filter(p => p.product_name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="mt-6 p-4 bg-slate-700/50 rounded-lg" ref={wrapperRef}>
      <h3 className="text-lg font-semibold mb-3">Select Products to Compare</h3>
      
      {/* Search and Dropdown */}
      <div className="relative mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)}
          placeholder="Search to add products..."
          className="w-full p-2 bg-slate-900/50 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isDropdownOpen && searchTerm.length > 0 && (
          <ul className="absolute top-full left-0 right-0 mt-1 bg-slate-700 border border-slate-600 rounded-lg z-10 max-h-60 overflow-y-auto">
            {availableProducts.map(product => (
              <li
                key={product._id}
                onClick={() => handleAddProduct(product.product_name)}
                className="px-4 py-2 cursor-pointer hover:bg-slate-600"
              >
                {product.product_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected Products List */}
      <div className="space-y-2">
        <h4 className="text-md font-semibold text-slate-300">Selected for Comparison:</h4>
        {selectedProducts.length > 0 ? (
          <ul className="space-y-2">
            {selectedProducts.map(productName => (
              <li key={productName} className="flex items-center justify-between bg-slate-900/50 p-2 rounded-lg">
                <span className="text-white text-sm font-medium">{productName}</span>
                <button onClick={() => handleRemoveProduct(productName)} className="text-slate-400 hover:text-red-400">
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-400 text-sm italic">No products selected.</p>
        )}
      </div>
    </div>
  );
};

export default ProductSelector;