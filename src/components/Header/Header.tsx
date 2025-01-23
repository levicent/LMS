import React, { useState, useEffect, useRef, useContext } from "react";
import { useFetchUserProfile } from "@/hooks/useFetchUserProfile";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import AuthContext from "../../context/authContext";
import DarkLogo from "@/assets/DARK_LOGO.png"; // Adjust the path as needed
import LightLogo from "@/assets/LIGHT_LOGO.png";
import { useTheme } from "@/context/themeContext";
interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const themeContext = useTheme();

  const { theme } = themeContext;

  const { data: user } = useFetchUserProfile();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { logout } = authContext;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-slate-900 to-slate-500 text-white shadow-lg">
      <div className="flex items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-50 block rounded-sm border border-slate-600 bg-slate-700 p-1.5 shadow-sm lg:hidden"
          >
            {sidebarOpen ? (
              <XMarkIcon className="w-6 h-6 text-white" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-white" />
            )}
          </button>
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={theme === "dark" ? LightLogo : DarkLogo}
                alt="LMS"
                className="max-h-14 w-18" // Adjust the size of the logo here
              />

              {/* <span
                className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-blue-600"
                  }`}
              >
                LMS
              </span> */}
            </Link>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-6">
          <Link
            to="/"
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            <h2 className="cursor-pointer font-semibold">Home</h2>
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            <h2 className="cursor-pointer font-semibold">About</h2>
          </Link>
          <Link
            to="/suggestion-box"
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            <h2 className="cursor-pointer font-semibold">Suggestion box</h2>
          </Link>
        </nav>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center focus:outline-none"
          >
            <img
              src={user?.image || "/image/blank-profile-picture-973460_1280.png"}
              alt="User avatar"
              className="w-8 h-8 rounded-full"
            />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <Link
                to="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 lg:hidden"
                onClick={() => setDropdownOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 lg:hidden"
                onClick={() => setDropdownOpen(false)}
              >
                About
              </Link>
              <Link
                to="/suggestion-box"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 lg:hidden"
                onClick={() => setDropdownOpen(false)}
              >
                Suggestion box
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
