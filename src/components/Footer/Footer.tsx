import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/themeContext";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className={`shadow-inner ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="container mx-auto py-12 px-6 lg:px-8">
        {/* Top Footer Section */}
        <div className="flex flex-wrap justify-between items-start space-y-6 lg:space-y-0">
          {/* Column 1 */}
          <div className="w-full lg:w-1/3">
            <h2
              className={`text-lg font-bold tracking-wide uppercase ${
                theme === "dark" ? "text-gray-100" : "text-gray-900"
              }`}
            >
              About LMS
            </h2>
            <p
              className={`mt-2 text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              LMS is a modern platform to explore courses and connect with
              world-class instructors.
            </p>
          </div>

          {/* Column 2 */}
          <div className="w-full lg:w-1/3">
            <h2
              className={`text-lg font-bold tracking-wide uppercase ${
                theme === "dark" ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/learn"
                  className={`text-sm ${
                    theme === "dark"
                      ? "text-gray-400 hover:text-gray-100"
                      : "text-gray-600 hover:text-gray-900"
                  } transition-colors`}
                >
                  Learn
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className={`text-sm ${
                    theme === "dark"
                      ? "text-gray-400 hover:text-gray-100"
                      : "text-gray-600 hover:text-gray-900"
                  } transition-colors`}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`text-sm ${
                    theme === "dark"
                      ? "text-gray-400 hover:text-gray-100"
                      : "text-gray-600 hover:text-gray-900"
                  } transition-colors`}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/signin"
                  className={`text-sm ${
                    theme === "dark"
                      ? "text-gray-400 hover:text-gray-100"
                      : "text-gray-600 hover:text-gray-900"
                  } transition-colors`}
                >
                  Sign in
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="w-full lg:w-1/3">
            <h2
              className={`text-lg font-bold tracking-wide uppercase ${
                theme === "dark" ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Follow Us
            </h2>
            <div className="flex space-x-4 mt-4">
              <Link
                to="#"
                className={`${
                  theme === "dark"
                    ? "text-gray-400 hover:text-gray-100"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                <FaFacebookF className="h-5 w-5" />
              </Link>
              <Link
                to="#"
                className={`${
                  theme === "dark"
                    ? "text-gray-400 hover:text-gray-100"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                <FaTwitter className="h-5 w-5" />
              </Link>
              <Link
                to="#"
                className={`${
                  theme === "dark"
                    ? "text-gray-400 hover:text-gray-100"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                <FaInstagram className="h-5 w-5" />
              </Link>
              <Link
                to="#"
                className={`${
                  theme === "dark"
                    ? "text-gray-400 hover:text-gray-100"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                <FaLinkedinIn className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer Section */}
        <div
          className={`border-t mt-8 pt-4 ${
            theme === "dark" ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <p
            className={`text-sm text-center ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            © 2024 Levicent. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
