import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useFetchCoursesByCategory } from "@/hooks/useFetchCoursesByCategory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DefaultLayout from "@/layout/DefaultLayout";
import { useTheme } from "@/context/themeContext";
import { Button } from "@/components/ui/button";
import {
  BookOpenIcon,
  ClockIcon,
  UserIcon,
  ArrowLeftIcon,
} from "@heroicons/react/20/solid";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";

const DefaultCourseThumbnail: React.FC<{ theme: string }> = ({ theme }) => (
  <div
    className={`h-48 flex items-center justify-center ${
      theme === "dark" ? "bg-gray-700" : "bg-gray-200"
    }`}
  >
    <BookOpenIcon
      className={`h-16 w-16 ${
        theme === "dark" ? "text-gray-400" : "text-gray-500"
      }`}
    />
  </div>
);
const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const {
    data: courses,
    isLoading,
    error,
  } = useFetchCoursesByCategory(category || "");
  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    const words = [
      {
        text: "Searching",
      },
      {
        text: `${category}`,
        className: "text-blue-500 dark:text-blue-500",
      },
      {
        text: "Courses",

      },
     
      {
        text: "...",
       
      },
    ];
  
    return (
      <DefaultLayout>
        <div
          className={` max-auto  mx-auto py-8 min-h-screen flex justify-center items-center ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100"
          }`}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
            <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
              <TypewriterEffectSmooth words={words} className="text-center justify-center mt-8"/>
            </p>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  if (error || !courses || courses.length === 0) {
    return (
      <DefaultLayout>
        <div
          className={` mx-auto py-8 min-h-screen flex justify-center items-center ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100"
          }`}
        >
          <div className="text-center">
            <p
              className={`text-2xl mb-4 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              No courses available in {category} category
            </p>
            <p
              className={`mb-6 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Check back soon for new courses
            </p>
            <Button
              onClick={handleGoBack}
              variant={theme === "dark" ? "secondary" : "default"}
              className={`flex items-center mx-auto ${
                theme === "dark"
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div
        className={` mx-auto py-8 min-h-screen ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100"
        }`}
      >
        <h1
          className={`text-3xl font-bold mb-6  ml-5 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          {category} Courses
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-5">
          {courses.map((course: any) => (
            <Card
              key={course._id}
              className={`overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2 ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 hover:border-blue-600"
                  : "bg-white border-gray-200 hover:border-blue-500"
              }`}
            >
              {course.thumbnail ? (
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${course.thumbnail})` }}
                />
              ) : (
                <DefaultCourseThumbnail theme={theme} />
              )}
              <CardHeader>
                <CardTitle
                  className={`text-xl font-semibold ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  {course.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className={`mb-4 line-clamp-3 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {course.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <div
                    className={`flex items-center ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <UserIcon className="h-5 w-5 mr-2" />
                    <span className="text-sm">
                      {" "}
                      {course.instructor.firstName}{" "}
                    </span>
                  </div>
                  <div
                    className={`flex items-center ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <ClockIcon className="h-5 w-5 mr-2" />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-lg font-bold ${
                      theme === "dark" ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    ${course.price}
                  </span>

                  <Link to={`/courses/${course._id}`} state={{ course }}>
                    <Button
                      variant={theme === "dark" ? "secondary" : "default"}
                      className={`flex items-center ${
                        theme === "dark"
                          ? "bg-gray-700 text-white hover:bg-gray-600"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      }`}
                    >
                      <BookOpenIcon className="h-5 w-5 mr-2" />
                      View Course
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CategoryPage;
