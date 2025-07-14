import { useState } from "react";
import ApiService from "../apis/ApiService";

function AddProductButton({ onAddSuccess }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    product_name: "",
    price: "",
    img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const dataToSend = {
      ...formData,
      rate_stars: 0,
      rate_count: 0,
      favorites: "False",
    };

    await ApiService.callApiAsync("products", "POST", dataToSend);

    setFormData({
      product_name: "",
      price: "",
      img: "",
    });
    setShowModal(false);
  };

  return (
    <>
      <button
        className=" rounded-lg mr-5 bg-orange-500 h-[50px] flex items-center hover:bg-orange-600 text-white font-semibold px-4 py-2 text-nowrap"
        onClick={() => setShowModal(true)}
      >
        + Add Product
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-[#1e2430] rounded-xl p-6 w-[90%] max-w-md shadow-lg relative">
            <h2 className="text-white font-semibold mb-4">Add New Product</h2>

            <input
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full bg-gray-700 text-white placeholder-gray-400 mb-2 px-3 py-2 rounded"
            />

            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              type="number"
              className="w-full bg-gray-700 text-white placeholder-gray-400 mb-2 px-3 py-2 rounded"
            />

            <input
              name="img"
              value={formData.img}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full bg-gray-700 text-white placeholder-gray-400 mb-4 px-3 py-2 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-500"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddProductButton;
