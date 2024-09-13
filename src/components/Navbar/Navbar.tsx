import { useState } from "react";
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
  // Add more options related to LMS
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <a href="#" className="flex items-center space-x-2">
            <img
              src="https://tailwindui.com/img/logos/mark.svg?color=black"
              alt="LMS"
              className="h-10 w-auto"
            />
            <span className="text-2xl font-extrabold text-black tracking-wide">
              LMS
            </span>
          </a>
        </div>

        {/* Right-Aligned Navigation for Desktop */}
        <div className="hidden lg:flex lg:items-center lg:space-x-10 lg:flex-1 lg:justify-end">
          {/* Dropdown for Learn */}
          <Popover className="relative">
            <PopoverButton className="text-lg uppercase tracking-widest text-black hover:text-gray-600 transition-colors inline-flex items-center">
              Learn
              <ChevronDownIcon className="h-5 w-5 ml-2 text-black" />
            </PopoverButton>

            <PopoverPanel className="absolute z-10 mt-2 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                {products.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block p-2 hover:bg-gray-100 rounded-md transition-colors"
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
            className="text-lg uppercase tracking-widest text-black hover:text-gray-600 transition-colors"
          >
            Features
          </a>
          <a
            href="#"
            className="text-lg uppercase tracking-widest text-black hover:text-gray-600 transition-colors"
          >
            Contact
          </a>
          <a
            href="#"
            className="px-4 py-2 bg-black text-white font-semibold rounded-full shadow hover:bg-gray-800 transition"
          >
            Log in &rarr;
          </a>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-black"
          >
            <Bars3Icon className="h-8 w-8" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <DialogPanel className="fixed inset-0 z-10 bg-white p-6">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center space-x-2">
              <img
                src="https://tailwindui.com/img/logos/mark.svg?color=black"
                alt="LMS"
                className="h-10 w-auto"
              />
              <span className="text-2xl font-extrabold text-black tracking-wide">
                LMS
              </span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-black"
            >
              <XMarkIcon className="h-8 w-8" />
            </button>
          </div>

          <div className="mt-6 space-y-6">
            <a
              href="#"
              className="block text-lg uppercase tracking-widest text-black hover:text-gray-600 transition"
            >
              Learn
            </a>
            <a
              href="#"
              className="block text-lg uppercase tracking-widest text-black hover:text-gray-600 transition"
            >
              Features
            </a>
            <a
              href="#"
              className="block text-lg uppercase tracking-widest text-black hover:text-gray-600 transition"
            >
              Contact
            </a>
            <a
              href="#"
              className="block text-lg bg-black text-white font-semibold rounded-full px-4 py-2 mt-4 text-center hover:bg-gray-800 transition"
            >
              Log in &rarr;
            </a>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
