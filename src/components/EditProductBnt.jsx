import { useState, useEffect } from "react";
import ApiService from "../apis/ApiService";

function EditProductBnt({ product, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    product_name: "",
    price: "",
    img: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        product_name: product.product_name || "",
        price: product.price || "",
        img: product.img || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await ApiService.callApiAsync("products", "PUT", formData, product._id);
    onUpdate(); 
    onClose(); 
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure to DELETE this product?");
    if (confirmDelete) {
      await ApiService.callApiAsync("products", "DELETE", null, product._id);
      onUpdate(); 
      onClose();  
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-[#1e2430] rounded-xl p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-white font-semibold mb-4">Edit Product</h2>
        <div>
        <p className="m-2">Product Name:</p>
        <input
          name="product_name"
          value={formData.product_name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full bg-gray-700 text-white placeholder-gray-400 mb-2 px-3 py-2 rounded"
        />
        </div>
        
      <div>
      <p className="m-2">Product Price:</p>
      <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          className="w-full bg-gray-700 text-white placeholder-gray-400 mb-2 px-3 py-2 rounded"
        />
      </div>
        
      <div>
      <p className="m-2">Image:</p>
      <input
          name="img"
          value={formData.img}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full bg-gray-700 text-white placeholder-gray-400 mb-4 px-3 py-2 rounded"
        />
      </div>
        

        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete
          </button>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
              onClick={onClose}
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
    </div>
  );
}

export default EditProductBnt;
