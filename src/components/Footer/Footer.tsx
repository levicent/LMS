import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/themeContext";
import { useContext } from "react";
import AuthContext from "../../context/authContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const { theme } = useTheme();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return (
    <footer
      className={`shadow-inner ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"
        }`}
    >
      <div className="container mx-auto py-12 px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h2
              className={`text-lg font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"
                }`}
            >
              About LMS
            </h2>
            <p
              className={`text-sm mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
            >
              LMS is a cutting-edge learning platform connecting students with
              world-class instructors. Explore a wide range of courses and
              enhance your skills with our innovative learning tools.
            </p>
            <Link
              to="/about"
              className={`text-sm font-semibold ${theme === "dark"
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-700"
                }`}
            >
              Learn more about us
            </Link>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h2
              className={`text-lg font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"
                }`}
            >
              Quick Links
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/courses/category/development"
                  className={`text-sm ${theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/instructors"
                  className={`text-sm ${theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  Instructors
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/pricing"
                  className={`text-sm ${theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  Pricing
                </Link>
              </li> */}
              {/* <li>
                <Link
                  to="/blog"
                  className={`text-sm ${theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  Blog
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h2
              className={`text-lg font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"
                }`}
            >
              Support
            </h2>
            <ul className="space-y-2">
              {/* <li>
                <Link
                  to="/help"
                  className={`text-sm ${theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className={`text-sm ${theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  FAQ
                </Link>
              </li> */}
              <li>
                <Link
                  to="/contact"
                  className={`text-sm ${theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className={`text-sm ${theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className={`text-sm ${theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h2
              className={`text-lg font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"
                }`}
            >
              Stay Updated
            </h2>
            <p
              className={`text-sm mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
            >
              Subscribe to our newsletter for the latest updates and exclusive
              offers.
            </p>
            <form className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className={`w-full ${theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-900"
                  }`}
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className={`text-gray-400 hover:text-gray-300`}
              aria-label="Facebook"
            >
              <FaFacebookF className="h-6 w-6" />
            </a>
            <a
              href="#"
              className={`text-gray-400 hover:text-gray-300`}
              aria-label="Twitter"
            >
              <FaTwitter className="h-6 w-6" />
            </a>
            <a
              href="#"
              className={`text-gray-400 hover:text-gray-300`}
              aria-label="Instagram"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
            <a
              href="#"
              className={`text-gray-400 hover:text-gray-300`}
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="h-6 w-6" />
            </a>
            <a
              href="#"
              className={`text-gray-400 hover:text-gray-300`}
              aria-label="YouTube"
            >
              <FaYoutube className="h-6 w-6" />
            </a>
            <a
              href="#"
              className={`text-gray-400 hover:text-gray-300`}
              aria-label="GitHub"
            >
              <FaGithub className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p
            className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
          >
            © 2024 Levicent. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
