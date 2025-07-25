import { useState } from "react";
import EditProductBnt from "./EditProductBnt";
import ApiService from "../apis/ApiService";

function ProductCard({ products, onReload }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleFavorite = async (item) => {
    const updatedFavorite = item.favorites === "True" ? "False" : "True";
    const updatedData = { favorites: updatedFavorite };

    await ApiService.callApiAsync("products", "PUT", updatedData, item._id);
    onReload()
  };

  return (
    <>
      {products.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="bg-[#273142] rounded-2xl shadow-md w-full max-w-md overflow-hidden">
            <img
              src={item.img}
              alt="#"
              className="w-full h-[280px] object-cover rounded-t-2xl"
            />
            <h2 className="mt-3 text-lg font-semibold ml-3">
              {item.product_name}
            </h2>
            <p className="text-blue-600 font-bold text-mg m-3">
              ${item.price}
            </p>

            <div className="flex justify-between gap-1 text-yellow-400 text-sm m-3">
              <div>
                {"★".repeat(Math.floor(item.rate_stars))}
                <span className="text-gray-400">
                  {"★".repeat(Math.floor(5 - item.rate_stars))}
                </span>
                <span className="text-gray-500 text-mg">
                  ({item.rate_count})
                </span>
              </div>

              
              <button
                onClick={() => toggleFavorite(item)}
                className={`bg-[#323D4E] hover:bg-gray-600 rounded-full p-2 transition duration-200 focus:outline-none ${
                  item.favorites === "True" ? "text-pink-500" : "text-gray-400"
                }`}
              >
                <svg
                  className="h-5 w-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            
            <button
              className="ml-4 mb-4 mt-2 w-[90%] px-4 py-2 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-600 transition-colors"
              onClick={() => setSelectedProduct(item)}
            >
              Edit Product
            </button>
          </div>
        </div>
      ))}

      {selectedProduct && (
        <EditProductBnt
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdate={onReload}
        />
      )}
    </>
  );
}

export default ProductCard;
