import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white shadow-inner">
      <div className="container mx-auto py-12 px-6 lg:px-8">
        {/* Top Footer Section */}
        <div className="flex flex-wrap justify-between items-start space-y-6 lg:space-y-0">
          {/* Column 1 */}
          <div className="w-full lg:w-1/3">
            <h2 className="text-lg font-bold tracking-wide text-gray-900 uppercase">
              About LMS
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              LMS is a modern platform to explore courses and connect with
              world-class instructors.
            </p>
          </div>

          {/* Column 2 */}
          <div className="w-full lg:w-1/3">
            <h2 className="text-lg font-bold tracking-wide text-gray-900 uppercase">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Learn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Link to="/signin">Sign in</Link>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="w-full lg:w-1/3">
            <h2 className="text-lg font-bold tracking-wide text-gray-900 uppercase">
              Follow Us
            </h2>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FaLinkedinIn className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer Section */}
        <div className="border-t border-gray-300 mt-8 pt-4">
          <p className="text-sm text-gray-500 text-center">
            © 2024 Levicent. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
