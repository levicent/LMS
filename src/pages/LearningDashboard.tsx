import { useEffect, useState } from "react";
import { Search, Star, MoreVertical } from "lucide-react";
import { Menu } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DefaultLayout from "../layout/DefaultLayout";
import { useFetchEnrolledCourses } from "../hooks/useEnrollCourse";

const TabOptions = ["All courses", "My Lists", "Wishlist", "Archived"];

export default function LearningDashboard() {
  const [activeTab, setActiveTab] = useState("All courses");
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, error, courses } = useFetchEnrolledCourses();

  useEffect(() => {
    console.log(courses);
  }, [courses]);

  const renderContent = () => {
    const cardBgColor = "bg-white dark:bg-gray-800";
    const cardTextColor = "text-gray-900 dark:text-white";
    const secondaryTextColor = "text-gray-500 dark:text-gray-400";

    if (loading) {
      return <p>Loading courses...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    switch (activeTab) {
      case "All courses":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {courses
              .filter((course) =>
                course.courseId.title
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((course) => (
                <Card
                  key={course._id}
                  className={`${cardBgColor} shadow-md hover:shadow-lg rounded-lg overflow-hidden transition-shadow duration-300`}
                >
                  <CardHeader className="p-0">
                    <img
                      src={course.courseId.thumbnail}
                      alt={course.courseId.title}
                      className="w-full h-40 sm:h-48 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle
                        className={`text-base sm:text-lg font-bold line-clamp-2 ${cardTextColor}`}
                      >
                        {course.courseId.title}
                      </CardTitle>
                      <Menu as="div" className="relative">
                        <Menu.Button
                          className={`${secondaryTextColor} hover:text-gray-700 dark:hover:text-gray-300 hover:bg-transparent`}
                        >
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none rounded-md z-10">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? "bg-gray-100 dark:bg-gray-600" : ""
                                } w-full text-left px-4 py-2 text-sm ${cardTextColor}`}
                              >
                                Mark as completed
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? "bg-gray-100 dark:bg-gray-600" : ""
                                } w-full text-left px-4 py-2 text-sm ${cardTextColor}`}
                              >
                                Archive
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Menu>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mb-2">
                      {course.courseId.instructor.firstName}{" "}
                      {course.courseId.instructor.lastName}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mb-2">
                      Enrolled on:{" "}
                      {new Date(course.enrollmentDate).toLocaleDateString()}
                    </p>
                    <div className="flex items-center mb-2">
                      <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2 mr-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `0%` }}
                        />
                      </div>
                      <span
                        className={`text-xs sm:text-sm ${secondaryTextColor}`}
                      >
                        0%
                      </span>
                    </div>
                    <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm">
                      Start course
                    </Button>
                    <div className="flex items-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 sm:h-4 sm:w-4 text-gray-300 dark:text-gray-600`}
                        />
                      ))}
                      <span
                        className={`ml-2 text-xs sm:text-sm ${secondaryTextColor}`}
                      >
                        Leave a rating
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        );
      case "My Lists":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <p>My Lists content (to be implemented)</p>
          </div>
        );
      case "Wishlist":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <p>Wishlist content (to be implemented)</p>
          </div>
        );
      case "Archived":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <p>Archived content (to be implemented)</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DefaultLayout>
      <main className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <header className="bg-gray-900 text-white py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl sm:text-3xl font-bold">My learning</h1>
            <nav className="mt-4 overflow-x-auto">
              <ul className="flex space-x-2 sm:space-x-4 whitespace-nowrap">
                {TabOptions.map((tab) => (
                  <li key={tab}>
                    <button
                      onClick={() => setActiveTab(tab)}
                      className={`px-2 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium ${
                        activeTab === tab
                          ? "bg-gray-800 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
        <div className="flex-grow">
          <div className="container mx-auto px-4 py-6 sm:py-8">
            <div className="flex flex-col space-y-4 mb-6">
              <div className="flex flex-wrap gap-2">
                <Select defaultValue="recently-accessed">
                  <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600">
                    <SelectItem
                      value="recently-accessed"
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Recently Accessed
                    </SelectItem>
                    <SelectItem
                      value="title"
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Title
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all-categories">
                  <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">
                    <SelectValue placeholder="Categories" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600">
                    <SelectItem
                      value="all-categories"
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      All Categories
                    </SelectItem>
                    <SelectItem
                      value="programming"
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Programming
                    </SelectItem>
                    <SelectItem
                      value="data-science"
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Data Science
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all-progress">
                  <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">
                    <SelectValue placeholder="Progress" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600">
                    <SelectItem
                      value="all-progress"
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      All Progress
                    </SelectItem>
                    <SelectItem
                      value="in-progress"
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      In Progress
                    </SelectItem>
                    <SelectItem
                      value="completed"
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Completed
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all-instructors">
                  <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">
                    <SelectValue placeholder="Instructor" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600">
                    <SelectItem
                      value="all-instructors"
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      All Instructors
                    </SelectItem>
                    <SelectItem
                      value="andrei-neagoie"
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Andrei Neagoie
                    </SelectItem>
                    <SelectItem
                      value="daniel-bourke"
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Daniel Bourke
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
                >
                  Reset
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Search my courses"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 active:bg-gray-900 dark:active:bg-gray-300 transition duration-300 ease-in-out"
                >
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>
            </div>
            {renderContent()}
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
}
