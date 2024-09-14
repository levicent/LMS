import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@heroicons/react/20/solid";

const products = [
  {
    name: "Courses",
    description: "Explore available courses",
    href: "#",
    icon: ChevronDownIcon,
  },
  {
    name: "Instructors",
    description: "Learn about our instructors",
    href: "#",
    icon: ChevronDownIcon,
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/signin");
  };

  return (
    <header className="bg-white shadow-lg z-50 sticky top-0">
      {/* Navbar */}
      <nav className="container mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <a href="#" className="flex items-center space-x-2">
            <img
              src="https://tailwindui.com/img/logos/mark.svg?color=blue"
              alt="LMS"
              className="h-10 w-auto"
            />
            <span className="text-3xl font-bold text-blue-600 tracking-tight">
              LMS
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:space-x-10">
          <Popover className="relative">
            <PopoverButton className="text-lg font-semibold text-gray-900 hover:text-gray-700 transition-colors flex items-center">
              Learn
              <ChevronDownIcon className="h-5 w-5 ml-2 text-gray-900" />
            </PopoverButton>
            <PopoverPanel className="absolute z-10 mt-2 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                {products.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block p-2 hover:bg-gray-100 rounded-md transition"
                  >
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <a
            href="#"
            className="text-lg font-semibold text-gray-900 hover:text-gray-700 transition"
          >
            Features
          </a>
          <a
            href="#"
            className="text-lg font-semibold text-gray-900 hover:text-gray-700 transition"
          >
            Contact
          </a>
          <button
            onClick={handleLoginClick}
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition"
          >
            Sign in &rarr;
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-gray-900"
          >
            <Bars3Icon className="h-8 w-8" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <DialogPanel className="fixed inset-0 z-10 bg-white p-6">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center space-x-2">
              <img
                src="https://tailwindui.com/img/logos/mark.svg?color=blue"
                alt="LMS"
                className="h-10 w-auto"
              />
              <span className="text-3xl font-bold text-blue-600 tracking-tight">
                LMS
              </span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-900"
            >
              <XMarkIcon className="h-8 w-8" />
            </button>
          </div>

          <div className="mt-6 space-y-6">
            <a
              href="#"
              className="block text-lg font-semibold text-gray-900 hover:text-gray-700 transition"
            >
              Learn
            </a>
            <a
              href="#"
              className="block text-lg font-semibold text-gray-900 hover:text-gray-700 transition"
            >
              Features
            </a>
            <a
              href="#"
              className="block text-lg font-semibold text-gray-900 hover:text-gray-700 transition"
            >
              Contact
            </a>
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
