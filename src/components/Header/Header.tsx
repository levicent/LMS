import React from "react";
import { Link } from "react-router-dom";
import DropdownUser from "./DropDownUser";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Import both icons

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-slate-900 to-slate-500 text-white shadow-lg">
      <div className="flex items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Toggle button with conditional rendering */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen); // Toggle sidebar open/close
            }}
            className="z-50 block rounded-sm border border-slate-600 bg-slate-700 p-1.5 shadow-sm lg:hidden"
          >
            {sidebarOpen ? (
              <XMarkIcon className="w-6 h-6 text-white" /> // Cross icon when sidebar is open
            ) : (
              <Bars3Icon className="w-6 h-6 text-white" /> // Hamburger icon when sidebar is closed
            )}
          </button>
        </div>

        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2"></button>
            </div>
          </form>
        </div>

        <nav className="flex items-center gap-6">
          <Link to="/" className="text-white hover:text-gray-300 transition-colors duration-200">
            <h2 className="cursor-pointer font-semibold">Home</h2>
          </Link>
          <Link to="/about" className="text-white hover:text-gray-300 transition-colors duration-200">
            <h2 className="cursor-pointer font-semibold">About</h2>
          </Link>
          <Link to="/suggestion-box" className="text-white hover:text-gray-300 transition-colors duration-200">
            <h2 className="cursor-pointer font-semibold">Suggestion box</h2>
          </Link>
          <DropdownUser />
        </nav>
      </div>
    </header>
  );
};

export default Header;
