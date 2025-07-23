import React from 'react';
import { useSalesData } from '../hooks/useSalesData';
import ChartCanvas from './ChartCanvas';
import ChartOverview from './ChartOverview';
import ProductSelector from './ProductSelector';

const SalesChart = () => {
  const {
    products,
    selectedProducts,
    setSelectedProducts,
    chartData,
    loading,
    error,
  } = useSalesData();

  if (loading) {
    return <div className="text-white text-center p-10">Loading chart data...</div>;
  }

  if (error) {
    return <div className="text-red-400 text-center p-10">Error: {error}</div>;
  }

  // Prepare data for the AI overview
  const salesDataForApi = chartData.datasets.map(dataset => ({
    product_name: dataset.label,
    sales_data: dataset.data,
  }));

  return (
    <div className="bg-slate-800 p-6 rounded-lg text-white">
      <h2 className="text-xl font-semibold mb-4">Sales Details</h2>
      <ChartCanvas data={chartData} />
      <ChartOverview 
        salesDataForApi={salesDataForApi}
      />
      <ProductSelector 
        products={products}
        selectedProducts={selectedProducts}
        onSelectionChange={setSelectedProducts}
      />
    </div>
  );
};

export default SalesChart;