import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const baseClass =
    "flex items-center p-3 my-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200";

  const getLinkClass = ({ isActive }) =>
    `${baseClass} ${isActive ? "bg-gray-700 text-white" : "text-gray-400"}`;

  return (
    <aside className="w-64 bg-[#273142] flex-shrink-0 hidden md:block overflow-y-auto scrollbar-hide no-scrollbar">

      <div className="flex flex-col justify-between h-[calc(100vh-4rem)]">
        <div className="flex flex-col">
          <NavLink to="dashBoard" className={getLinkClass}>
            <i className="flex items-center px-4 py-2.5 rounded-md"></i>
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/products" className={getLinkClass}>
            <i className="flex items-center px-4 py-2.5 rounded-md"></i>
            <span>Products</span>
          </NavLink>

          <NavLink to="favorites" className={getLinkClass}>
            <i className="flex items-center px-4 py-2.5 rounded-md"></i>
            <span>Favorites</span>
          </NavLink>

          <NavLink to="inbox" className={getLinkClass}>
            <i className="flex items-center px-4 py-2.5 rounded-md"></i>
            <span>Inbox</span>
          </NavLink>

          <NavLink to="/orderLists" className={getLinkClass}>
            <i className="flex items-center px-4 py-2.5 rounded-md"></i>
            <span>Order Lists</span>
          </NavLink>

          <NavLink to="productStock" className={getLinkClass}>
            <i className="flex items-center px-4 py-2.5 rounded-md"></i>
            <span>Product Stock</span>
          </NavLink>

          <div className="pt-4">
            <span className="ml-7 px-4 text-xs font-semibold uppercase text-gray-500">Pages</span>
            <div className="mt-2 space-y-2">
                <NavLink to="pricing" className={getLinkClass}>
                    <i className="flex items-center px-4 py-2.5 rounded-md"></i>
                    <span>Pricing</span>
                </NavLink>
                <NavLink to="calender" className={getLinkClass}>
                    <i className="flex items-center px-4 py-2.5 rounded-md"></i>
                    <span>Calender</span>
                </NavLink>
                <NavLink to="to-do" className={getLinkClass}>
                    <i className="flex items-center px-4 py-2.5 rounded-md"></i>
                    <span>To-Do</span>
                </NavLink>
                <NavLink to="contact" className={getLinkClass}>
                    <i className="flex items-center px-4 py-2.5 rounded-md"></i>
                    <span>Contact</span>
                </NavLink>
                <NavLink to="invoices" className={getLinkClass}>
                    <i className="flex items-center px-4 py-2.5 rounded-md"></i>
                    <span>Invoice</span>
                </NavLink>
                <NavLink to="uiTeam" className={getLinkClass}>
                    <i className="flex items-center px-4 py-2.5 rounded-md"></i>
                    <span>UI Team</span>
                </NavLink>
                <NavLink to="team" className={getLinkClass}>
                    <i className="flex items-center px-4 py-2.5 rounded-md"></i>
                    <span>Team</span>
                </NavLink>
                <NavLink to="table" className={getLinkClass}>
                    <i className="flex items-center px-4 py-2.5 rounded-md"></i>
                    <span>Table</span>
                </NavLink>
            </div>
          </div>

          <div className="pt-4">
            <div className="mt-2 space-y-2 border-t border-gray-700 pt-4">
                <NavLink to="setting" className={getLinkClass}>
                    <i className="flex items-center px-4 py-2.5 rounded-md"></i>
                    <span>Setting</span>
                </NavLink>
                <NavLink to="logOut" className={getLinkClass}>
                    <i className="flex items-center px-4 py-2.5 rounded-md"></i>
                    <span>Log Out</span>
                </NavLink>
            </div>
          </div>

        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
