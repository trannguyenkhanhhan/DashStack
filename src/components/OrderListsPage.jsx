import React, { useEffect, useState } from 'react';
import OrderTable from '../components/OrderTable';
import OrderFilterBar from '../components/OrderFilterBar';
import ApiService from '../apis/ApiService';

const formatStatus = (status) => {
  if (!status) return '';
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

const OrderListsPage = () => {
  const [orders, setOrders] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await ApiService.callApiAsync('order', 'GET');
        const rawOrders = res?.data?.data || [];

        const formattedOrders = rawOrders.map((order) => ({
          ...order,
          status: formatStatus(order.status),
        }));

        setOrders(formattedOrders);
      } catch (error) {
        console.error('Lỗi khi lấy đơn hàng:', error);
      }
    };

    fetchOrders();
  }, []);

  let filteredOrders = orders.filter((order) => {
    const matchType = typeFilter ? order.type === typeFilter : true;
    const matchStatus = statusFilter ? order.status === statusFilter : true;
    return matchType && matchStatus;
  });

  if (dateFilter === 'newest') {
    filteredOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (dateFilter === 'oldest') {
    filteredOrders.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  return (
    <div className="p-6 bg-[#1e2430] min-h-screen text-white">
      <h1 className="mb-6 text-4xl font-bold">Order Lists</h1>

      <OrderFilterBar
        orders={orders}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />

      <OrderTable orders={filteredOrders} />
    </div>
  );
};

export default OrderListsPage;
