import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";
import ParticlesComponent from "../components/ParticleBackground/ParticleBackground";

const HomePage: React.FC = () => {
  return (
    <div>
      <ParticlesComponent id="particles" />
      <Navbar />

      <main className="flex-grow bg-gray-100">
        <div className="container mx-auto p-6 lg:px-8 lg:py-12">
          <section className="text-center mb-12 bg-transparent">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900">
              Welcome to LMS
            </h1>
            <p className="mt-4 text-lg lg:text-xl text-gray-600">
              Explore our courses and meet world-class instructors to start
              learning today!
            </p>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow hover:bg-blue-700 transition">
              Get Started &rarr;
            </button>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
              Explore Our Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                <h3 className="text-xl font-bold text-gray-900">
                  Web Development
                </h3>
                <p className="mt-2 text-gray-600">
                  Learn HTML, CSS, and JavaScript to build modern web
                  applications.
                </p>
                <button className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  View Course &rarr;
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                <h3 className="text-xl font-bold text-gray-900">
                  Data Science
                </h3>
                <p className="mt-2 text-gray-600">
                  Dive deep into data analytics and machine learning techniques.
                </p>
                <button className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  View Course &rarr;
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                <h3 className="text-xl font-bold text-gray-900">
                  UI/UX Design
                </h3>
                <p className="mt-2 text-gray-600">
                  Learn design principles and tools to create beautiful user
                  experiences.
                </p>
                <button className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  View Course &rarr;
                </button>
              </div>
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
              Meet Our Instructors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                <h3 className="text-xl font-bold text-gray-900">Jane Doe</h3>
                <p className="mt-2 text-gray-600">
                  Expert in Web Development and JavaScript frameworks.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                <h3 className="text-xl font-bold text-gray-900">John Smith</h3>
                <p className="mt-2 text-gray-600">
                  Data Science guru with over 10 years of experience.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                <h3 className="text-xl font-bold text-gray-900">Emma Lee</h3>
                <p className="mt-2 text-gray-600">
                  UI/UX Designer with a passion for minimalistic design.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-16 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Ready to Learn?
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of students today and start your learning journey!
            </p>
            <Link to="/signup">
              <button className="mt-6 px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-full shadow hover:bg-green-700 transition">
                Sign Up Now &rarr;
              </button>
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
