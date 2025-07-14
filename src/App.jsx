import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './components/DashboardPage';
import ProductPage from './components/ProductPage';
import ContactPage from './components/ContactPage';
import InboxPage from './components/InboxPage';
import InvoicePage from './components/InvoicePage';
import SignInPage from './components/SignInPage';
import PricingPage from './components/PricingPage';
import OrderListsPage from './components/OrderListsPage';

//hello
export default function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // This effect handles responsive collapsing of the sidebar
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

  const renderPageContent = () => {
    // Render the SalesChart when the active page is Dashboard
    if (activePage === 'Dashboard') {
      return <DashboardPage />;
    }
    else if(activePage === 'Products') {
      return <ProductPage />;
    }
    else if(activePage === 'Contact') {
      return <ContactPage />;
    }
    else if(activePage === 'Inbox') {
      return <InboxPage />;
    }
    else if(activePage === 'Invoice') {
      return <InvoicePage />;
    }
    else if(activePage === 'SignIn') {
      return <SignInPage />;
    }
    else if(activePage === 'Pricing') {
      return <PricingPage />;
    }
    else if(activePage === 'OrderLists') {
      return <OrderListsPage />;
    }
    
    // Fallback for other pages
    return (
        <div className="p-6 bg-slate-900 text-white min-h-full">
            <h1 className="text-3xl font-semibold text-gray-200">{activePage}</h1>
            <p className="mt-2 text-gray-400">Content for the {activePage} page goes here.</p>
        </div>
    );
  };
  
  return (
    <div className="flex flex-col h-screen bg-slate-900 font-sans">
      <Header 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activeItem={activePage} 
          setActiveItem={setActivePage} 
          isSidebarOpen={isSidebarOpen}
          onClick={setActivePage}
        />
        <main className="flex-1 overflow-y-auto">
          {renderPageContent()}
        </main>
      </div>
    </div>
  );
}