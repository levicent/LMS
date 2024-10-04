import React, { useContext, useState ,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ParticlesComponent from "../components/ParticleBackground/ParticleBackground";
import { useTheme } from "../context/themeContext";
import AuthContext from "../context/authContext";
import { Star, Users, Clock, Award, BookOpen, Globe, Zap } from "lucide-react";
import { useFetchCourses } from "@/hooks/useFetchCourse";
import ShimmerCard from "./ShimmerCard";

const HomePage: React.FC = () => {
  const { theme } = useTheme();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentCategory, setCurrentCategory] = useState("All");
  const [loading, setIsLoading] = useState(true);

  if (!authContext) {
    navigate("/login");
    return null;
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 2 seconds
    }, 2000); // 2-second delay

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  const { isAuthenticated } = authContext;

  const { data: courses, isLoading } = useFetchCourses();
  if (!isLoading) {
    console.log(courses);
  }

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <ParticlesComponent id="particles" />

      <Navbar />

      <main className="flex-grow bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto p-6 lg:px-8 lg:py-12">
          {/* Hero Section */}
          <section className="text-center mb-16 bg-transparent">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
              Unlock Your Potential with LMS
            </h1>
            <p className="mt-4 text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover a world of knowledge with our expert-led courses. From
              coding to business, we've got you covered. Start learning today
              and shape your future!
            </p>
            {!isAuthenticated ? (
              <Link to="/signup">
                <button className="mt-8 px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300">
                  Get Started For Free
                </button>
              </Link>
            ) : (
              <Link to="/my-courses">
                <button className="mt-8 px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-green-700 transition duration-300">
                  Continue Learning
                </button>
              </Link>
            )}
          </section>

          {/* Course Categories */} 
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
              Explore Our Course Categories
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {Array.isArray(courses) && courses.length > 0 ? (
                // Extract unique categories from the courses array
                [...new Set(courses.map((course) => course.category))].map(
                  (category, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCategory(category)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${currentCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                        }`}
                    >
                      {category}
                    </button>
                  )
                )
              ) : (
                <div>No categories available</div>
              )}
            </div>
          </section>
          {/* Featured Courses */}
          <section className="mb-16">
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
              Featured Courses
            </h2> 
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array(6) // Display 6 shimmer cards while loading
                  .fill(0)
                  .map((_, index) => (
                    <ShimmerCard key={index} />
                  ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.isArray(courses) && courses.length > 0 ? (
                  courses
                    .filter(
                      (course) =>
                        currentCategory === "All" ||
                        course.category === currentCategory
                    )
                    .slice(0, 6)
                    .map((course,id) => (
                      <div
                        key={id} 
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
                      >
                        <img
                          src="https://via.placeholder.com/150"
                          alt={course.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            {course.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {course.description}
                          </p>
                          <p className="text-gray-600 dark:text-white font- bold mb-4">
                            Instructor : {course.instructor}
                          </p>
                          <div className="flex items-center mb-4">
                            <span className="text-gray-700 dark:text-gray-300">
                             {course.studentsEnrolled.length} students
                            </span>
                          </div>
                          <div className="flex items-center mb-4">
                            <span className="text-gray-700 dark:text-gray-300">
                             Price : {course.price}
                            </span>
                          </div>
                          <div className="flex items-center mb-4">
                          <Star className="w-5 h-5 text-yellow-400 mr-1" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {course.rating}
                        </span>
                          </div>
                          {/* <div className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center">
                              Tags: {course.tags.join(", ")}
                            </span>
                          </div> */}
                          <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
                            Enroll Now
                          </button>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center text-2xl text-gray-500">
                    No Courses Found
                  </div>
                )}
              </div>
            )}
          </section>


          {/* Our Impact */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
              Our Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  1M+
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Students Enrolled
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  150+
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Countries Reached
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  5000+
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Career Transitions
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
              Why Choose LMS?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Users,
                  title: "Expert Instructors",
                  description: "Learn from industry professionals",
                },
                {
                  icon: Clock,
                  title: "Flexible Learning",
                  description: "Study at your own pace, anytime",
                },
                {
                  icon: Award,
                  title: "Certificates",
                  description: "Earn recognized certifications",
                },
                {
                  icon: Star,
                  title: "High-Quality Content",
                  description: "Engaging and up-to-date courses",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
                >
                  <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* What Our Community Says */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
              What Our Community Says
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Web Developer",
                  testimonial:
                    "The courses on LMS have been instrumental in my career transition. The quality of instruction and hands-on projects gave me the confidence to land my dream job.",
                  image:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
                },
                {
                  name: "Michael Chen",
                  role: "Data Scientist",
                  testimonial:
                    "I've taken courses on multiple platforms, but LMS stands out for its comprehensive curriculum and supportive community. It's been a game-changer for my skills.",
                  image:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
                },
                {
                  name: "Emily Rodriguez",
                  role: "UX Designer",
                  testimonial:
                    "The design courses on LMS are top-notch. They've helped me stay current with industry trends and significantly improved my portfolio. Highly recommended!",
                  image:
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center"
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-24 h-24 rounded-full mb-4 object-cover"
                  />
                  <p className="text-gray-600 dark:text-gray-400 italic mb-4 text-center">
                    "{testimonial.testimonial}"
                  </p>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-blue-600 text-white p-12 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl mb-8">
              Join millions of learners and start acquiring the skills you need
              for your future today.
            </p>
            <Link to={isAuthenticated ? "/my-courses" : "/signup"}>
              <button className="px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg shadow hover:bg-gray-100 transition duration-300">
                {isAuthenticated
                  ? "Go to My Courses"
                  : "Start Learning for Free"}
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
