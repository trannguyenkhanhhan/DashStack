import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProductPage from "./pages/ProductPage";
import OrderListsPage from "./pages/OrderListsPage";
import InboxPage from "./pages/InboxPage";
import LoginPage from "./pages/LoginPage";
import SignInPage from "./pages/SignInPage";
import { useState, useEffect } from "react";
import EditProfileModal from "./components/EditProfileModal.jsx";
import InvoicePage from './pages/InvoicePage';
import PricingPage from "./pages/PricingPage.jsx";


function AppWrapper() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn ? "true" : "false");
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/log_in");
  };

  return isLoggedIn ? (
    <div className="flex pt-16 min-h-screen bg-[#1e2430]">
      <Sidebar />
      <div className="flex-1 w-full">
        <Navbar
          setIsLoggedIn={setIsLoggedIn}
          onShowProfile={() => setShowProfileModal(true)}
          onLogout={handleLogout} 
        />
        <Routes>
          <Route path="/products" element={<ProductPage />} />
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/orderLists" element={<OrderListsPage />} />
          <Route path="/invoices" element={<InvoicePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="*" element={<ProductPage />} />
        </Routes>
      </div>

      {showProfileModal && (
        <EditProfileModal onClose={() => setShowProfileModal(false)} />
      )}
    </div>
  ) : (
    <Routes>
      <Route path="/log_in" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/sign_up" element={<SignInPage />} />
      <Route path="*" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
