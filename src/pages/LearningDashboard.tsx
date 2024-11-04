import { useState, useMemo } from "react";
import {
  Search,
  Star,
  MoreVertical,
  Archive,
  RefreshCw,
  BookOpen,
  List,
  Heart,
  Box,
} from "lucide-react";
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
import { useAutocorrect } from "../hooks/useAutocorrect";
import ShimmerCard from "./ShimmerCard";
import { ShimmerHeading } from "./ShimmerCard";
import { Link } from "react-router-dom";

interface EnrolledCourse {
  _id: string;
  enrollmentDate: string;
  progress: number;
  courseId: {
    _id: string;
    title: string;
    thumbnail: string;
    category: string | null;
    instructor: {
      firstName: string;
      lastName: string;
    } | null;
  };
}

const TabOptions = [
  { name: "All courses", icon: BookOpen },
  { name: "My Lists", icon: List },
  { name: "Wishlist", icon: Heart },
  { name: "Archived", icon: Box },
];

export default function Component() {
  const [activeTab, setActiveTab] = useState("All courses");
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, error, courses } = useFetchEnrolledCourses() as {
    loading: boolean;
    error: string | null;
    courses: EnrolledCourse[];
  };
  const [archivedCourses, setArchivedCourses] = useState<EnrolledCourse[]>([]);
  const { correctedQuery, isCorrected } = useAutocorrect(searchTerm);

  const [sortBy, setSortBy] = useState("recently-accessed");
  const [categoryFilter, setCategoryFilter] = useState("all-categories");
  const [progressFilter, setProgressFilter] = useState("all-progress");
  const [instructorFilter, setInstructorFilter] = useState("all-instructors");

  const resetFilters = () => {
    setSortBy("recently-accessed");
    setCategoryFilter("all-categories");
    setProgressFilter("all-progress");
    setInstructorFilter("all-instructors");
    setSearchTerm("");
  };

  const archiveCourse = (course: EnrolledCourse) => {
    setArchivedCourses([...archivedCourses, course]);
  };

  const unarchiveCourse = (course: EnrolledCourse) => {
    setArchivedCourses(archivedCourses.filter((c) => c._id !== course._id));
  };

  const filterAndSortCourses = (
    courses: EnrolledCourse[],
    isArchived: boolean
  ) => {
    let filteredCourses = courses;

    // Filter out courses that are not present in the database
    filteredCourses = filteredCourses.filter((course) => course.courseId);
    if (searchTerm) {
      filteredCourses = filteredCourses.filter((course) =>
        course.courseId?.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all-categories") {
      filteredCourses = filteredCourses.filter(
        (course) => course.courseId?.category?.toLowerCase() === categoryFilter
      );
    }

    if (progressFilter !== "all-progress") {
      filteredCourses = filteredCourses.filter((course) => {
        if (progressFilter === "in-progress")
          return course.progress > 0 && course.progress < 100;
        if (progressFilter === "completed") return course.progress === 100;
        return true;
      });
    }

    if (instructorFilter !== "all-instructors") {
      filteredCourses = filteredCourses.filter(
        (course) =>
          `${course.courseId?.instructor?.firstName} ${course.courseId?.instructor?.lastName}`.toLowerCase() ===
          instructorFilter
      );
    }

    filteredCourses = filteredCourses.filter((course) =>
      isArchived
        ? archivedCourses.some((ac) => ac._id === course._id)
        : !archivedCourses.some((ac) => ac._id === course._id)
    );

    filteredCourses.sort((a, b) => {
      if (sortBy === "recently-accessed") {
        return (
          new Date(b.enrollmentDate).getTime() -
          new Date(a.enrollmentDate).getTime()
        );
      } else if (sortBy === "title") {
        return a.courseId?.title.localeCompare(b.courseId?.title);
      }
      return 0;
    });

    return filteredCourses;
  };

  const categories = useMemo(() => {
    const categorySet = new Set(
      courses.map((course) => course.courseId?.category)
    );
    return Array.from(categorySet);
  }, [courses]);

  const instructors = useMemo(() => {
    const instructorSet = new Set(
      courses.map(
        (course) =>
          `${course.courseId?.instructor?.firstName} ${course.courseId?.instructor?.lastName}`
      )
    );
    return Array.from(instructorSet);
  }, [courses]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <ShimmerCard key={index} />
          ))}
        </div>
      );
    }

    if (error) {
      return <p className="text-red-500 text-center">Error: {error}</p>;
    }

    const renderCourseCard = (course: EnrolledCourse, isArchived: boolean) => (
      <Card
        key={course._id}
        className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
      >
        <CardHeader className="p-0 relative">
          <img
            src={course.courseId?.thumbnail}
            alt={course.courseId?.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2">
            <Menu as="div" className="relative">
              <Menu.Button className="p-1 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                <MoreVertical className="h-5 w-5" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none rounded-md z-10">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100 dark:bg-gray-700" : ""
                      } w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-white`}
                      onClick={() =>
                        isArchived
                          ? unarchiveCourse(course)
                          : archiveCourse(course)
                      }
                    >
                      {isArchived ? (
                        <>
                          <RefreshCw className="inline-block w-4 h-4 mr-2" />
                          Unarchive
                        </>
                      ) : (
                        <>
                          <Archive className="inline-block w-4 h-4 mr-2" />
                          Archive
                        </>
                      )}
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {course.courseId?.title}
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {course.courseId?.instructor?.firstName}{" "}
            {course.courseId?.instructor?.lastName}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
            Enrolled on: {new Date(course.enrollmentDate).toLocaleDateString()}
          </p>
          <div className="flex items-center mb-3">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {course.progress}%
            </span>
          </div>
          <Link to="/course">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">
              {isArchived ? "Restore course" : "Continue learning"}
            </Button>
          </Link>

          <div className="flex items-center justify-between mt-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 text-yellow-400"
                  fill={
                    i < Math.floor(course.progress / 20)
                      ? "currentColor"
                      : "none"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-300">
              Rate this course
            </span>
          </div>
        </CardContent>
      </Card>
    );

    const filteredCourses = filterAndSortCourses(courses, false);
    const filteredArchivedCourses = filterAndSortCourses(courses, true);

    switch (activeTab) {
      case "All courses":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => renderCourseCard(course, false))}
          </div>
        );
      case "My Lists":
        return (
          <div className="text-center py-12">
            <List className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              My Lists
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              This feature is coming soon!
            </p>
          </div>
        );
      case "Wishlist":
        return (
          <div className="text-center py-12">
            <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Wishlist
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Your wishlist is empty. Start adding courses!
            </p>
          </div>
        );
      case "Archived":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArchivedCourses.map((course) =>
              renderCourseCard(course, true)
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DefaultLayout>
      <main className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
        <header className="bg-white dark:bg-gray-800 shadow-md">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              My Learning
            </h1>
            <nav className="flex space-x-1 overflow-x-auto">
              {TabOptions.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                    activeTab === tab.name
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </header>
        <div className="flex-grow container mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recently-accessed">
                    Recently Accessed
                  </SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  {categories.map((category:any,index:number) => (
                    <SelectItem key={index} value={category?.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={progressFilter} onValueChange={setProgressFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Progress" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-progress">All Progress</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={instructorFilter}
                onValueChange={setInstructorFilter}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Instructor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-instructors">
                    All Instructors
                  </SelectItem>
                  {instructors.map((instructor) => (
                    <SelectItem
                      key={instructor}
                      value={instructor?.toLowerCase()}
                    >
                      {instructor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Search my courses"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <Button
                type="submit"
                size="icon"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
            {isCorrected && searchTerm && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Showing results for "{correctedQuery}"
              </p>
            )}
          </div>
          {loading ? <ShimmerHeading /> : renderContent()}
        </div>
      </main>
    </DefaultLayout>
  );
}
