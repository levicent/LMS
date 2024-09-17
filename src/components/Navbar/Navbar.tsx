import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  BellIcon,
  EnvelopeIcon,
  HeartIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { FaSignOutAlt } from "react-icons/fa"; // For Logout
import { AiOutlineQuestionCircle } from "react-icons/ai"; // For Support
import { useTheme } from "../../context/themeContext";
import AuthContext from "../../context/authContext";

const products = [
  {
    name: "Courses",
    description: "Explore available courses",
    href: "/courses", // Update href with a route
    icon: ChevronDownIcon,
  },
  {
    name: "Instructors",
    description: "Learn about our instructors",
    href: "/instructors", // Update href with a route
    icon: ChevronDownIcon,
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
      {/* Navbar */}
      <nav className="container mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
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

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:space-x-10">
          <Popover className="relative">
            <PopoverButton
              className={`text-lg font-semibold transition-colors flex items-center ${
                theme === "dark" ? "dark:text-gray-100" : "text-gray-900"
              }`}
            >
              Learn
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
          {isAuthenticated ? (
            <div className="relative">
              <Popover className="relative">
                <PopoverButton className="flex items-center space-x-2">
                  <img
                    src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                    className="h-10 w-10 rounded-full"
                    alt="User Avatar"
                  />
                  <span
                    className={`text-lg font-semibold ${
                      theme === "dark" ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    John Doe
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
                        src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                        className="h-10 w-10 rounded-full"
                        alt="User Avatar"
                      />
                      <div>
                        <p
                          className={`font-semibold ${
                            theme === "dark" ? "text-gray-100" : "text-gray-900"
                          }`}
                        >
                          John Doe
                        </p>
                        <p
                          className={`text-sm ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          johndoe@example.com
                        </p>
                      </div>
                    </div>
                    <hr
                      className={`my-2 ${
                        theme === "dark" ? "border-gray-600" : "border-gray-200"
                      }`}
                    />

                    {/* Dropdown Links with Icons */}
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
                    <Link
                      to="/help"
                      className={`flex items-center space-x-2 py-2 text-sm hover:bg-gray-100 rounded-md transition ${
                        theme === "dark"
                          ? "text-gray-400 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <AiOutlineQuestionCircle className="h-5 w-5" />
                      <span>Help & Support</span>
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
          <button onClick={toggleTheme} className="ml-4 text-lg">
            {theme === "light" ? "🌙" : "🌞"}
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
            <Link
              to="/learn"
              className={`block text-lg font-semibold transition ${
                theme === "dark" ? "dark:text-gray-100" : "text-gray-900"
              } hover:text-gray-700`}
            >
              Learn
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
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

//     {/* Mobile Menu Button */}
//     <div className="lg:hidden">
//       <button
//         onClick={() => setMobileMenuOpen(true)}
//         className="p-2 text-gray-900"
//       >
//         <Bars3Icon className="h-8 w-8" />
//       </button>
//     </div>
//   </nav>

//   {/* Mobile Menu */}
//   <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
//     <DialogPanel className="fixed inset-0 z-10 bg-white p-6">
//       <div className="flex items-center justify-between">
//         <a href="#" className="flex items-center space-x-2">
//           <img
//             src="https://tailwindui.com/img/logos/mark.svg?color=blue"
//             alt="LMS"
//             className="h-10 w-auto"
//           />
//           <span className="text-3xl font-bold text-blue-600 tracking-tight">
//             LMS
//           </span>
//         </a>
//         <button
//           onClick={() => setMobileMenuOpen(false)}
//           className="p-2 text-gray-900"
//         >
//           <XMarkIcon className="h-8 w-8" />
//         </button>
//       </div>

//       <div className="mt-6 space-y-6">
//         <a
//           href="#"
//           className="block text-lg font-semibold text-gray-900 hover:text-gray-700 transition"
//         >
//           Learn
//         </a>
//         <div className="space-y-4">
//           <a
//             href="#"
//             className="block text-lg font-semibold text-gray-900 hover:text-gray-700 transition"
//           >
//             My Learning
//           </a>
//           <a
//             href="#"
//             className="block text-lg font-semibold text-gray-900 hover:text-gray-700 transition"
//           >
//             Wishlist
//           </a>
//           <a
//             href="#"
//             className="block text-lg font-semibold text-gray-900 hover:text-gray-700 transition"
//           >
//             Notifications
//           </a>
//           <button
//             onClick={handleLogout}
//             className="block w-full text-center px-4 py-2 bg-red-600 text-white font-semibold rounded-full mt-4 hover:bg-red-700 transition"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </DialogPanel>
//   </Dialog>
// </header>
//   );
// }
