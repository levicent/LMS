import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import DarkLogo from "@/assets/DARK_LOGO.png";
import LightLogo from "@/assets/LIGHT_LOGO.png";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  // HeartIcon,
  UserCircleIcon,
  BellIcon,
  ShoppingCartIcon,
  ChevronRightIcon,
  BookOpenIcon,
} from "@heroicons/react/20/solid";
import { FaSignOutAlt } from "react-icons/fa";
import { HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "../../context/themeContext";
import AuthContext from "../../context/authContext";
import { useFetchUserProfile } from "../../hooks/useFetchUserProfile";
import SearchBar, { MobileSearchBar } from "../SearchBar/SearchBar";
import { useCart } from "@/context/cartContext";

const categories = [
  { name: "Development", href: "/courses/category/development" },
  { name: "Business", href: "/courses/category/business" },
  { name: "Finance & Accounting", href: "/category/finance" },
  { name: "IT & Software", href: "/courses/category/software" },
  { name: "Office Productivity", href: "/courses/category/office " },
  { name: "Personal Development", href: "/courses/category/personal" },
  { name: "Design", href: "/courses/category/design" },
  { name: "Marketing", href: "/courses/category/marketing" },
  { name: "Lifestyle", href: "/courses/category/lifestyle" },
  { name: "Photography & Video", href: "/courses/category/photography" },
  { name: "Health & Fitness", href: "/courses/category/health" },
  { name: "Music", href: "/courses/category/music" },
  { name: "Teaching & Academics", href: "/courses/category/teaching" },
];

const products = [
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
  const { cart } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { isAuthenticated, logout, role } = authContext;

  const { data: user } = useFetchUserProfile();

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/signin");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (searchQuery.trim()) {
  //     navigate(`/course-search-result?q=${encodeURIComponent(searchQuery)}`);
  //   }
  // };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? "auto" : "hidden";
  };


  return (
    <header
      className={`z-50 sticky top-0 shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-md ${theme === "dark"
                ? "text-gray-400 hover:text-white hover:bg-gray-700"
                : "text-gray-500 hover:text-gray-600 hover:bg-gray-100"
                }`}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Logo */}
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

          {/* Desktop menu */}
          <div className="hidden lg:flex lg:items-center lg:justify-between lg:flex-1 ml-8">
            <div className="flex items-center space-x-8">
              {/* Categories dropdown */}
              <Popover className="relative">
                <PopoverButton
                  className={`flex items-center text-sm font-medium ${theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-800"
                    }`}
                >
                  Categories
                  <ChevronDownIcon className="ml-1 h-5 w-5" />
                </PopoverButton>
                <PopoverPanel
                  className={`absolute z-10 mt-2 w-56 rounded-md shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"
                    } ring-1 ring-black ring-opacity-5`}
                >
                  <div className="py-1">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.href}
                        className={`block px-4 py-2 text-sm ${theme === "dark"
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </PopoverPanel>
              </Popover>

              {/* Explore dropdown */}
              <Popover className="relative">
                <PopoverButton
                  className={`flex items-center text-sm font-medium ${theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-800"
                    }`}
                >
                  Explore
                  <ChevronDownIcon className="ml-1 h-5 w-5" />
                </PopoverButton>
                <PopoverPanel
                  className={`absolute z-10 mt-2 w-56 rounded-md shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"
                    } ring-1 ring-black ring-opacity-5`}
                >
                  <div className="py-1">
                    {products.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block px-4 py-2 text-sm ${theme === "dark"
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        <p className="font-semibold">{item.name}</p>
                        <p
                          className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                            }`}
                        >
                          {item.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </PopoverPanel>
              </Popover>

              {/* Other navigation links */}
              {role === "admin" || role === "teacher" ? (
                <>
                  {role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      className={`text-sm font-medium ${theme === "dark"
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-gray-800"
                        }`}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  {role === "teacher" && (
                    <Link
                      to="/instructor/dashboard"
                      className={`text-sm font-medium ${theme === "dark"
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-gray-800"
                        }`}
                    >
                      Instructor Dashboard
                    </Link>
                  )}
                </>
              ) : (
                <Link
                  to="/contact"
                  className={`text-sm font-medium ${theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-800"
                    }`}
                >
                  Contact
                </Link>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* Search bar */}
              <SearchBar />
              {/* Wishlist icon */}
              {/* <button
                className={`p-1 rounded-full ${theme === "dark"
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-600"
                  }`}
              >
                <HeartIcon className="h-6 w-6" />
              </button> */}

              {/* Cart icon */}
              <Link to="/cart">
                <button
                  className={`p-1 rounded-full ${theme === "dark"
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-600"
                    }`}
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  <p className={`text-sm font-semibold bg-red-500 text-white px-1 rounded-full absolute top-3 mx-4 mt-1 ${cart.length > 0 ? 'block' : 'hidden'}`}>
                    {cart.length}
                  </p>
                </button>
              </Link>

              {/* User avatar or login button */}
              {isAuthenticated ? (
                <Popover className="relative">
                  <PopoverButton className="flex items-center space-x-2">
                    <img
                      src={
                        user?.image ||
                        "/image/blank-profile-picture-973460_1280.png"
                      }
                      className="h-8 w-8 rounded-full"
                      alt="User Avatar"
                    />
                  </PopoverButton>
                  <PopoverPanel
                    className={`absolute right-0 z-10 mt-2 w-64 rounded-md shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"
                      } ring-1 ring-black ring-opacity-5`}
                  >
                    <div className="p-4 space-y-2">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3"
                      >
                        <img
                          src={
                            user?.image ||
                            "/image/blank-profile-picture-973460_1280.png"
                          }
                          className="h-10 w-10 rounded-full"
                          alt="User Avatar"
                        />
                        <div>
                          <p
                            className={`font-semibold ${theme === "dark"
                              ? "text-gray-100"
                              : "text-gray-900"
                              }`}
                          >
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p
                            className={`text-sm ${theme === "dark"
                              ? "text-gray-300"
                              : "text-gray-500"
                              }`}
                          >
                            {user?.email}
                          </p>
                        </div>
                      </Link>
                      <hr
                        className={`my-2 ${theme === "dark"
                          ? "border-gray-700"
                          : "border-gray-200"
                          }`}
                      />
                      <Link
                        to="/profile"
                        className={`flex items-center space-x-2 py-2 text-sm rounded-md transition ${theme === "dark"
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        <UserCircleIcon className="h-5 w-5" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        to="/my-courses"
                        className={`flex items-center space-x-2 py-2 text-sm rounded-md transition ${theme === "dark"
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        <BookOpenIcon className="h-5 w-5" />{" "}
                        <span>My Learning</span>
                      </Link>
                      <Link
                        to="/messages"
                        className={`flex items-center space-x-2 py-2 text-sm rounded-md transition ${theme === "dark"
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        <EnvelopeIcon className="h-5 w-5" />
                        <span>Messages</span>
                      </Link>
                      <Link
                        to="/notifications"
                        className={`flex items-center space-x-2 py-2 text-sm rounded-md transition ${theme === "dark"
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        <BellIcon className="h-5 w-5" />
                        <span>Notifications</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className={`flex items-center space-x-2 w-full py-2 text-sm rounded-m transition ${theme === "dark"
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
              ) : (
                <button
                  onClick={handleLoginClick}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${theme === "dark"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    }`}
                >
                  Sign in
                </button>
              )}

              <button
                onClick={toggleTheme}
                className={`p-1 rounded-full ${theme === "dark"
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-600"
                  }`}
              >
                {theme === "light" ? (
                  <HiMoon className="h-6 w-6" />
                ) : (
                  <HiSun className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center lg:hidden">
            {/* <SearchBar/> */}
            <MobileSearchBar />
            <Link to="/cart">
              <button
                className={`p-1 rounded-full ${theme === "dark"
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-600"
                  }`}
              >
                <ShoppingCartIcon className="h-6 w-6" />
                <p className="text-sm font-semibold bg-red-500 text-white px-1 rounded-full absolute top-3 right-4">
                  {cart.length}
                </p>
              </button>
            </Link>
          </div>
        </div>

        {/* {searchOpen && (
          <form className="mt-4 lg:hidden">
            <MobileSearchBar/>
          </form>
        )} */}
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 z-50 ${theme === "dark" ? "bg-gray-800" : "bg-white"
            } overflow-y-auto`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="https://tailwindui.com/img/logos/mark.svg?color=blue"
                  alt="LMS"
                  className="h-8 w-auto"
                />
                <span
                  className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-blue-600"
                    }`}
                >
                  LMS
                </span>
              </Link>
              <button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-md ${theme === "dark"
                  ? "text-gray-400 hover:text-white hover:bg-gray-700"
                  : "text-gray-500 hover:text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {isAuthenticated && (
              <div className="mb-6">
                <Link to="/profile" className="flex items-center space-x-3">
                  <img
                    src={
                      user?.image ||
                      "/image/blank-profile-picture-973460_1280.png"
                    }
                    className="h-12 w-12 rounded-full"
                    alt="User Avatar"
                  />
                  <div>
                    <p
                      className={`font-semibold ${theme === "dark" ? "text-gray-100" : "text-gray-900"
                        }`}
                    >
                      Hi, {user?.firstName}
                    </p>
                    <p
                      className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-500"
                        }`}
                    >
                      Welcome back
                    </p>
                  </div>
                </Link>
              </div>
            )}

            <div className="space-y-4">
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <PopoverButton
                      className={`flex items-center justify-between w-full rounded-lg px-3 py-2 text-base font-semibold leading-7 ${theme === "dark"
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-900 hover:bg-gray-50"
                        }`}
                    >
                      Categories
                      <ChevronRightIcon
                        className={`h-5 w-5 flex-none ${open ? "rotate-90" : ""
                          } transition`}
                        aria-hidden="true"
                      />
                    </PopoverButton>
                    <PopoverPanel className="mt-2 space-y-2">
                      {categories.map((category) => (
                        <Link
                          key={category.name}
                          to={category.href}
                          className={`block rounded-lg pl-6 pr-3 py-2 text-sm font-semibold leading-7 ${theme === "dark"
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-900 hover:bg-gray-50"
                            }`}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </PopoverPanel>
                  </>
                )}
              </Popover>
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <PopoverButton
                      className={`flex items-center justify-between w-full rounded-lg px-3 py-2 text-base font-semibold leading-7 ${theme === "dark"
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-900 hover:bg-gray-50"
                        }`}
                    >
                      Explore
                      <ChevronRightIcon
                        className={`h-5 w-5 flex-none ${open ? "rotate-90" : ""
                          } transition`}
                        aria-hidden="true"
                      />
                    </PopoverButton>
                    <PopoverPanel className="mt-2 space-y-2">
                      {products.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`block rounded-lg pl-6 pr-3 py-2 text-sm font-semibold leading-7 ${theme === "dark"
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-900 hover:bg-gray-50"
                            }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </PopoverPanel>
                  </>
                )}
              </Popover>
              <Link
                to="/features"
                className={`block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${theme === "dark"
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-900 hover:bg-gray-50"
                  }`}
              >
                Features
              </Link>
              <Link
                to="/contact"
                className={`block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${theme === "dark"
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-900 hover:bg-gray-50"
                  }`}
              >
                Contact
              </Link>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className={`block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-900 hover:bg-gray-50"
                      }`}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-900 hover:bg-gray-50"
                      }`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className={`block w-full text-left rounded-lg px-3 py-2.5 text-base font-semibold leading-7 ${theme === "dark"
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                    }`}
                >
                  Sign in
                </button>
              )}
              <button
                onClick={toggleTheme}
                className={`mt-2 flex items-center rounded-lg px-3 py-2 text-base font-semibold leading-7 ${theme === "dark"
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-900 hover:bg-gray-50"
                  }`}
              >
                {theme === "light" ? (
                  <>
                    <HiMoon className="h-6 w-6 mr-2" />
                    Dark Mode
                  </>
                ) : (
                  <>
                    <HiSun className="h-6 w-6 mr-2" />
                    Light Mode
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
