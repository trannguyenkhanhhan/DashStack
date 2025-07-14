import LanguageDropdown from "./LanguageDropdown";
import UserDropdown from "./UserDropdown";
import icon from "../assets/img/icon.png";

const Navbar = ({ setIsLoggedIn, onShowProfile, onLogout }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#273142] flex items-center justify-between px-4 sm:px-6 shadow">
      <div className="h-16 ml-[45px] mr-[100px] flex items-center justify-center text-2xl font-bold text-white">
        <h3>
          Dash<span className="text-blue-500">Stack</span>
        </h3>
      </div>
      <div className="flex items-center flex-1 mr-4">
        <div className="flex items-center bg-[#323D4E] rounded-full px-4 py-2 w-full max-w-lg">
          <svg
            className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="search"
            placeholder="Search"
            className="bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-500 text-white w-full appearance-none leading-normal text-sm"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4 flex-shrink-0">
        <button className="relative bg-[#273142]">
          <img className="h-6 w-6" src={icon} alt="notification" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-gray-900"></span>
        </button>

        <LanguageDropdown />

        <UserDropdown
          setIsLoggedIn={setIsLoggedIn}
          onShowProfile={onShowProfile}
          onLogout={onLogout} 
        />
      </div>
    </nav>
  );
};

export default Navbar;
