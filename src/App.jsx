import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Header from './components/Header';

import DashboardPage from './components/DashboardPage';
import ProductPage from './components/ProductPage';
import ContactPage from './components/ContactPage';
import InboxPage from './components/InboxPage';
import InvoicePage from './components/InvoicePage';
import SignUpPage from './components/SignUpPage';
import PricingPage from './components/PricingPage';
import OrderListsPage from './components/OrderListsPage';
import LoginPage from './components/LoginPage';
import CalendarPage from './components/CalendarPage';

const NotFoundPage = () => (
  <div className="p-6 bg-slate-900 text-white min-h-full">
    <h1 className="text-3xl font-semibold text-gray-200">404 - Page not found</h1>
    <p className="mt-2 text-gray-400">Sorry, the page you are looking for does not exist.</p>
    <p className="mt-4 text-gray-400">
    Please check the address again or return{' '}
      <a href="/" className="text-blue-400 hover:underline">Home</a>.
    </p>
  </div>
);


function AppRoutes() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accountId'));

  const navigate = useNavigate(); 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogoutFromApp = () => {
    localStorage.removeItem('accountId');
    setIsLoggedIn(false);
    navigate('/login');
  };


  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="*" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    );
  }


  return (
    <div className="flex flex-col h-screen bg-slate-900 font-sans">
      <Header
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        onLogout={handleLogoutFromApp}
        setIsLoggedIn={setIsLoggedIn}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/order-lists" element={<OrderListsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/invoices" element={<InvoicePage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
