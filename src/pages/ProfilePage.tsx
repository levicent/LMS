import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useTheme } from "../context/themeContext";
import { useFetchUserProfile } from "../hooks/useFetchUserProfile";
const ProfilePage: React.FC = () => {
  const { theme } = useTheme();

  const { data: user } = useFetchUserProfile();

  return (
    <div
      className={`${
        theme === "dark"
          ? "dark bg-gray-900 text-white"
          : "bg-white text-gray-900"
      }`}
    >
      <Navbar />

      <main className="flex-grow bg-gradient-to-b from-blue-100 via-white to-gray-100 dark:bg-gradient-to-b dark:from-gray-800 dark:via-gray-900 dark:to-black">
        <div className="container mx-auto p-6 lg:px-8 lg:py-12">
          <section className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              Welcome, {user?.firstName || "User"}
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Manage your profile information and explore your learning
              progress.
            </p>
          </section>

          {/* Profile Section */}
          <section className="mt-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Your Profile
            </h2>
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center md:items-start">
                  <img
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                    // src={user?.email || "https://via.placeholder.com/150"}
                    alt="Profile"
                  />
                  <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                    {user?.firstName || "User Name"}
                  </h3>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Profile Information
                  </h3>
                  <ul className="space-y-4">
                    <li>
                      <strong className="text-gray-700 dark:text-gray-300">
                        Username:
                      </strong>{" "}
                      {user?.email || "N/A"}
                    </li>
                    <li>
                      <strong className="text-gray-700 dark:text-gray-300">
                        Email:
                      </strong>{" "}
                      {user?.email || "user@example.com"}
                    </li>
                    <li>
                      <strong className="text-gray-700 dark:text-gray-300">
                        Role:
                      </strong>{" "}
                      {user?.email || "Student"}
                    </li>
                    <li>
                      <strong className="text-gray-700 dark:text-gray-300">
                        Joined on:
                      </strong>{" "}
                      {user?.email || "N/A"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Learning Progress Section */}
          <section className="mt-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Your Learning Progress
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Web Development
                </h3>
                <p className="mt-3 text-gray-700 dark:text-gray-400">
                  Progress: 60%
                </p>
                <button className="mt-4 inline-block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                  View Course &rarr;
                </button>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Data Science
                </h3>
                <p className="mt-3 text-gray-700 dark:text-gray-400">
                  Progress: 45%
                </p>
                <button className="mt-4 inline-block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                  View Course &rarr;
                </button>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  UI/UX Design
                </h3>
                <p className="mt-3 text-gray-700 dark:text-gray-400">
                  Progress: 30%
                </p>
                <button className="mt-4 inline-block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                  View Course &rarr;
                </button>
              </div>
            </div>
          </section>

          {/* Settings Section */}
          <section className="mt-16 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Account Settings
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-400 max-w-xl mx-auto mb-8">
              Update your profile, change your password, and manage your account
              settings.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all">
              Edit Profile
            </button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
