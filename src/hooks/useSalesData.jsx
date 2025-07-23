import { useState, useEffect } from 'react';

const lineColors = ['#4880FF', '#FFC107', '#F44336', '#4CAF50', '#9C27B0'];

export const useSalesData = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const apiKey = "686ba790c92895417ae77089";
    const apiUrl = `https://mindx-mockup-server.vercel.app/api/resources/productsales?apiKey=${apiKey}`;
    // Access the API key from environment variables

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(apiData => {
        const productData = apiData.data.data;
        setProducts(productData);
        if (productData.length > 0) {
          // Select the first product by default
          setSelectedProducts([productData[0].product_name]);
        }
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const chartData = {
    labels: Array.from({ length: 30 }, (_, i) => i + 1),
    datasets: selectedProducts.map((productName, index) => {
      const product = products.find(p => p.product_name === productName);
      const color = lineColors[index % lineColors.length];
      return {
        label: productName,
        data: product ? product.sales : [],
        borderColor: color,
        backgroundColor: `${color}33`, // Add some transparency
        fill: true,
        tension: 0,
        pointBackgroundColor: color,
        pointBorderColor: '#fff',
        pointHoverRadius: 7,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: color,
      };
    }),
  };

  return { products, selectedProducts, setSelectedProducts, chartData, loading, error };
};
