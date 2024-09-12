import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
      <div className="max-w-7xl mx-auto py-10 px-6 lg:px-8">
        {/* Top Footer Section */}
        <div className="flex flex-wrap justify-between items-start space-y-6 lg:space-y-0 lg:space-x-6">
          {/* Column 1 */}
          <div className="flex-1">
            <h2 className="text-lg font-bold tracking-wide uppercase">
              About LMS
            </h2>
            <p className="mt-2 text-sm">
              LMS is a modern platform to explore courses and connect with
              world-class instructors.
            </p>
          </div>

          {/* Column 2 */}
          <div className="flex-1">
            <h2 className="text-lg font-bold tracking-wide uppercase">
              Quick Links
            </h2>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-blue-200 transition-colors"
                >
                  Learn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-blue-200 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-blue-200 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-blue-200 transition-colors"
                >
                  Log in
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="flex-1">
            <h2 className="text-lg font-bold tracking-wide uppercase">
              Follow Us
            </h2>
            <div className="flex space-x-4 mt-2">
              <a
                href="#"
                className="text-white hover:text-blue-200 transition-colors"
              >
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-200 transition-colors"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-200 transition-colors"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-200 transition-colors"
              >
                <FaLinkedinIn className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer Section */}
        <div className="mt-10 border-t border-blue-400 pt-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} LMS. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
