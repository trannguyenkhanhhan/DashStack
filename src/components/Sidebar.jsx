import React from 'react';
import { useNavigate } from "react-router-dom"; // Thêm useNavigate
import NavItem from './NavItem';
import {
  LayoutDashboard, Box, Heart, Inbox, ClipboardList, Package,
  Tag, Calendar, CheckSquare, MessageSquare, FileText, Users,
  Table, Settings, LogOut
} from 'lucide-react';

const Sidebar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accountId');
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/login');
    window.location.reload(); // Đảm bảo re-render App để trở lại layout login
  };

  const mainNavItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Products', icon: Box, path: '/products' },
    { name: 'Favorites', icon: Heart, path: '/favorites' },
    { name: 'Inbox', icon: Inbox, path: '/inbox' },
    { name: 'Order Lists', icon: ClipboardList, path: '/order-lists' },
    { name: 'Product Stock', icon: Package, path: '/stock' },
  ];

  const pagesNavItems = [
    { name: 'Pricing', icon: Tag, path: '/pricing' },
    { name: 'Calendar', icon: Calendar, path: '/calendar' },
    { name: 'To-Do', icon: CheckSquare, path: '/todo' },
    { name: 'Contact', icon: MessageSquare, path: '/contact' },
    { name: 'Invoice', icon: FileText, path: '/invoices' },
    { name: 'UI Elements', icon: Users, path: '/ui-elements' },
    { name: 'Team', icon: Users, path: '/team' },
    { name: 'Table', icon: Table, path: '/table' },
  ];

  const footerNavItems = [
    { name: 'Settings', icon: Settings, path: '/settings' },
    { name: 'Logout', icon: LogOut }, // Không cần path vì xử lý riêng
  ];

  return (
    <aside className={`flex flex-col bg-slate-800 text-white transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
      <nav className="flex-1 px-2 py-4 space-y-6 overflow-y-auto no-scrollbar">
        <ul className="space-y-1">
          {mainNavItems.map((item) => (
            <NavItem key={item.name} item={item} isSidebarOpen={isSidebarOpen} />
          ))}
        </ul>
        <div>
          <h3 className={`px-3 text-xs font-semibold uppercase text-slate-400 tracking-wider transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
            Pages
          </h3>
          <ul className="mt-2 space-y-1">
            {pagesNavItems.map((item) => (
              <NavItem key={item.name} item={item} isSidebarOpen={isSidebarOpen} />
            ))}
          </ul>
        </div>
      </nav>

      <div className="px-2 py-4 border-t border-slate-700">
        <ul className="space-y-1">
          {footerNavItems.map((item) =>
            item.name === "Logout" ? (
              <NavItem
                key={item.name}
                item={item}
                isSidebarOpen={isSidebarOpen}
                onClick={handleLogout}
              />
            ) : (
              <NavItem
                key={item.name}
                item={item}
                isSidebarOpen={isSidebarOpen}
              />
            )
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
