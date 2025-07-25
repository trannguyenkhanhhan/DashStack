import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";
import ProductBanner from "../components/ProductBanner";
import ApiService from "../apis/ApiService"; 


function ProductPage() {
  const [productList, setProductList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const fetchProducts = async () => {
    const data = await ApiService.callApiAsync("products", "GET");
    const products = data.data.data;
    setProductList(products);
    setFilteredList(products);
  };

  useEffect(() => {
    const getProduct = async () => {
      let data = await ApiService.callApiAsync("products", "GET");

      const products = data.data.data;

      setProductList(products);
      setFilteredList(products); 
    };

    getProduct();
  }, []);

  return (
    <div className="p-6 space-y-6 min-h-screen bg-[#1e2430]">
      <ProductBanner/>
      <ProductFilter
        data={productList}
        onFilter={setFilteredList}
        onAddProduct={() => alert("Add Product")}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard products={filteredList} onReload={fetchProducts} />

      </div>
    </div>
  );
}

export default ProductPage;
