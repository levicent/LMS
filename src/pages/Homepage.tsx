import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ParticlesComponent from "../components/ParticleBackground/ParticleBackground";
import { useTheme } from "../context/themeContext";
import AuthContext from "../context/authContext";

const HomePage: React.FC = () => {
  const { theme } = useTheme();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle when authContext is missing
  if (!authContext) {
    navigate("/login");
    return null;
  }

  const { isAuthenticated } = authContext;

  // Dashboard Redirect Handler
  const handleDashboardRedirect = () => {
    navigate("/dashboard");
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <ParticlesComponent id="particles" />

      <Navbar />

      <main className="flex-grow bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto p-6 lg:px-8 lg:py-12">
          {/* Welcome Section */}
          <section className="text-center mb-12 bg-transparent">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-gray-100">
              Welcome to LMS
            </h1>
            <p className="mt-4 text-lg lg:text-xl text-gray-600 dark:text-gray-400">
              Explore our courses and meet world-class instructors to start
              learning today!
            </p>
            {!isAuthenticated ? (
              <Link to="/signup">
                <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow hover:bg-blue-700 transition">
                  Join Now and Start Learning &rarr;
                </button>
              </Link>
            ) : (
              <button
                onClick={handleDashboardRedirect}
                className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow hover:bg-blue-700 transition"
              >
                Continue Your Learning Journey &rarr;
              </button>
            )}
          </section>

          {/* Courses Section */}
          <section className="mt-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
              Explore Our Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Web Development
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Learn HTML, CSS, JavaScript, and frameworks like React to
                  build modern web applications.
                </p>
                <button
                  aria-label="View Web Development Course"
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  View Course &rarr;
                </button>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Data Science
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Dive deep into data analytics, Python, and machine learning
                  techniques.
                </p>
                <button
                  aria-label="View Data Science Course"
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  View Course &rarr;
                </button>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  UI/UX Design
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Master design principles, tools like Figma, and build
                  user-friendly interfaces.
                </p>
                <button
                  aria-label="View UI/UX Design Course"
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  View Course &rarr;
                </button>
              </div>
            </div>
          </section>

          {/* Instructors Section */}
          <section className="mt-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
              Meet Our Instructors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Jane Doe
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Full-stack web developer with 15 years of experience in modern
                  JavaScript frameworks.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  John Smith
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Data Scientist with over 10 years of experience in machine
                  learning and AI.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Emma Lee
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  UI/UX designer with expertise in minimalistic design and
                  user-centered experiences.
                </p>
              </div>
            </div>
          </section>

          {/* Conditional Section for Unauthenticated Users */}
          {!isAuthenticated && (
            <section className="mt-16 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Ready to Learn?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Join thousands of students today and start your learning
                journey!
              </p>
              <Link to="/signup">
                <button className="mt-6 px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-full shadow hover:bg-green-700 transition">
                  Sign Up Now &rarr;
                </button>
              </Link>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
