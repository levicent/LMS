import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  HeartIcon,
  UserCircleIcon,
  BellIcon,
} from "@heroicons/react/20/solid";
import { FaSignOutAlt } from "react-icons/fa";
import { HiSun, HiMoon } from "react-icons/hi"; // Sun and Moon icons for theme toggle
import { useTheme } from "../../context/themeContext";
import AuthContext from "../../context/authContext";
import { useFetchUserProfile } from "../../hooks/useFetchUserProfile";

const products = [
  {
    name: "Courses",
    description: "Explore available courses",
    href: "/courses",
  },
  {
    name: "Instructors",
    description: "Learn about our instructors",
    href: "/instructors",
  },
  {
    name: "Donors",
    description: "Meet the people who support us",
    href: "/donors",
  },
];

export default function Navbar() {
  const themeContext = useTheme();
  const { theme, toggleTheme } = themeContext;

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { isAuthenticated, logout } = authContext;

  const { data: user } = useFetchUserProfile();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/signin");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className={`z-50 sticky top-0 shadow-lg ${
        theme === "dark" ? "dark:bg-gray-800" : "bg-white"
      }`}
    >
      <nav className="container mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="https://tailwindui.com/img/logos/mark.svg?color=blue"
              alt="LMS"
              className="h-10 w-auto"
            />
            <span
              className={`text-3xl font-bold tracking-tight ${
                theme === "dark" ? "text-white" : "text-blue-600"
              }`}
            >
              LMS
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex lg:items-center lg:space-x-10">
          {/* Desktop Navigation */}
          <Popover className="relative">
            <PopoverButton
              className={`text-lg font-semibold transition-colors flex items-center ${
                theme === "dark" ? "dark:text-gray-100" : "text-gray-900"
              }`}
            >
              Explore
              <ChevronDownIcon
                className={`h-5 w-5 ml-2 ${
                  theme === "dark" ? "dark:text-gray-100" : "text-gray-900"
                }`}
              />
            </PopoverButton>
            <PopoverPanel
              className={`absolute z-10 mt-2 w-56 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="p-4">
                {products.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block p-2 rounded-md transition ${
                      theme === "dark"
                        ? "hover:bg-gray-700 text-gray-100"
                        : "hover:bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p
                      className={`font-semibold ${
                        theme === "dark" ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {item.name}
                    </p>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          {/* Links for Unauthenticated Users */}
          {!isAuthenticated ? (
            <>
              <Link
                to="/features"
                className={`text-lg font-semibold transition ${
                  theme === "dark" ? "dark:text-gray-100" : "text-gray-900"
                } hover:text-gray-700`}
              >
                Features
              </Link>
              <Link
                to="/contact"
                className={`text-lg font-semibold transition ${
                  theme === "dark" ? "dark:text-gray-100" : "text-gray-900"
                } hover:text-gray-700`}
              >
                Contact
              </Link>
            </>
          ) : (
            <>
              {/* Links for Authenticated Users */}
              <Link
                to="/dashboard"
                className={`text-lg font-semibold transition ${
                  theme === "dark" ? "dark:text-gray-100" : "text-gray-900"
                } hover:text-gray-700`}
              >
                Dashboard
              </Link>
              <Link
                to="/my-courses"
                className={`text-lg font-semibold transition ${
                  theme === "dark" ? "dark:text-gray-100" : "text-gray-900"
                } hover:text-gray-700`}
              >
                My Courses
              </Link>
            </>
          )}

          {isAuthenticated ? (
            <div className="relative">
              {/* Authenticated User Dropdown */}
              <Popover className="relative">
                <PopoverButton className="flex items-center space-x-2">
                  <img
                    src="image/blank-profile-picture-973460_1280.png"
                    className="h-10 w-10 rounded-full"
                    alt="User Avatar"
                  />
                  <span
                    className={`text-lg font-semibold ${
                      theme === "dark" ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    {user?.firstName} {user?.lastName}
                  </span>
                </PopoverButton>
                <PopoverPanel
                  className={`absolute right-0 z-10 mt-2 w-64 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ${
                    theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white"
                  }`}
                >
                  <div className="p-4 space-y-2">
                    {/* User Info */}
                    <div className="flex items-center space-x-3">
                      <img
                        src="image/blank-profile-picture-973460_1280.png"
                        className="h-10 w-10 rounded-full"
                        alt="User Avatar"
                      />
                      <div>
                        <p
                          className={`font-semibold ${
                            theme === "dark" ? "text-gray-100" : "text-gray-900"
                          }`}
                        >
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p
                          className={`text-sm ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <hr
                      className={`my-2 ${
                        theme === "dark" ? "border-gray-600" : "border-gray-200"
                      }`}
                    />

                    {/* Dropdown Links */}
                    <Link
                      to="/profile"
                      className={`flex items-center space-x-2 py-2 text-sm hover:bg-gray-100 rounded-md transition ${
                        theme === "dark"
                          ? "text-gray-400 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <UserCircleIcon className="h-5 w-5" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/wishlist"
                      className={`flex items-center space-x-2 py-2 text-sm hover:bg-gray-100 rounded-md transition ${
                        theme === "dark"
                          ? "text-gray-400 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <HeartIcon className="h-5 w-5" />
                      <span>Wishlist</span>
                    </Link>
                    <Link
                      to="/messages"
                      className={`flex items-center space-x-2 py-2 text-sm hover:bg-gray-100 rounded-md transition ${
                        theme === "dark"
                          ? "text-gray-400 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <EnvelopeIcon className="h-5 w-5" />
                      <span>Messages</span>
                    </Link>
                    <Link
                      to="/notifications"
                      className={`flex items-center space-x-2 py-2 text-sm hover:bg-gray-100 rounded-md transition ${
                        theme === "dark"
                          ? "text-gray-400 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <BellIcon className="h-5 w-5" />
                      <span>Notifications</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={`flex items-center space-x-2 w-full py-2 text-sm hover:bg-gray-100 rounded-md transition ${
                        theme === "dark"
                          ? "text-red-400 hover:bg-gray-700"
                          : "text-red-500 hover:bg-gray-100"
                      }`}
                    >
                      <FaSignOutAlt className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </PopoverPanel>
              </Popover>
            </div>
          ) : (
            <div>
              <button
                onClick={handleLoginClick}
                className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition"
              >
                Sign in &rarr;
              </button>
            </div>
          )}
          {/* Theme Toggle Button */}
          <button onClick={toggleTheme} className="ml-4 text-lg">
            {theme === "light" ? (
              <HiMoon className="h-6 w-6 text-gray-900" />
            ) : (
              <HiSun className="h-6 w-6 text-yellow-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setMobileMenuOpen(true)} className="p-2">
            <Bars3Icon
              className={`h-8 w-8 ${
                theme === "dark" ? "dark:text-white" : "text-gray-900"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <DialogPanel
          className={`fixed inset-0 z-10 p-6 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="https://tailwindui.com/img/logos/mark.svg?color=blue"
                alt="LMS"
                className="h-10 w-auto"
              />
              <span
                className={`text-3xl font-bold tracking-tight ${
                  theme === "dark" ? "text-white" : "text-blue-600"
                }`}
              >
                LMS
              </span>
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2">
              <XMarkIcon
                className={`h-8 w-8 ${
                  theme === "dark" ? "dark:text-white" : "text-gray-900"
                }`}
              />
            </button>
          </div>

          <div className="mt-6 space-y-6">
            {isAuthenticated ? (
              <>
                {/* Mobile Authenticated User Links */}
                <Link
                  to="/profile"
                  className={`block text-lg font-semibold transition ${
                    theme === "dark" ? "dark:text-gray-100" : "text-gray-900"
                  } hover:text-gray-700`}
                >
                  My Profile
                </Link>
                <Link
                  to="/wishlist"
                  className={`block text-lg font-semibold transition ${
                    theme === "dark" ? "dark:text-gray-100" : "text-gray-900"
                  } hover:text-gray-700`}
                >
                  Wishlist
                </Link>
                <Link
                  to="/messages"
                  className={`block text-lg font-semibold transition ${
                    theme === "dark" ? "dark:text-gray-100" : "text-gray-900"
                  } hover:text-gray-700`}
                >
                  Messages
                </Link>
                <Link
                  to="/notifications"
                  className={`block text-lg font-semibold transition ${
                    theme === "dark" ? "dark:text-gray-100" : "text-gray-900"
                  } hover:text-gray-700`}
                >
                  Notifications
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-center px-4 py-2 bg-red-600 text-white font-semibold rounded-full mt-4 hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Mobile Unauthenticated User Links */}
                <Link
                  to="/learn"
                  className={`block text-lg font-semibold transition ${
                    theme === "dark" ? "dark:text-gray-100" : "text-gray-900"
                  } hover:text-gray-700`}
                >
                  Explore
                </Link>
                <Link
                  to="/features"
                  className={`block text-lg font-semibold transition ${
                    theme === "dark" ? "dark:text-gray-100" : "text-gray-900"
                  } hover:text-gray-700`}
                >
                  Features
                </Link>
                <Link
                  to="/contact"
                  className={`block text-lg font-semibold transition ${
                    theme === "dark" ? "dark:text-gray-100" : "text-gray-900"
                  } hover:text-gray-700`}
                >
                  Contact
                </Link>
                <button
                  onClick={handleLoginClick}
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-full mt-4 hover:bg-blue-700 transition"
                >
                  Sign in &rarr;
                </button>
              </>
            )}

            {/* Mobile Theme Toggle */}
            <div className="flex justify-center">
              <button onClick={toggleTheme} className="mt-4 text-lg">
                {theme === "light" ? (
                  <HiMoon className="h-6 w-6 text-gray-900" />
                ) : (
                  <HiSun className="h-6 w-6 text-yellow-300" />
                )}
              </button>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
