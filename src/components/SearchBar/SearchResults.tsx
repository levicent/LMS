import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SearchX,
  Clock,
  Book,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DefaultLayout from "@/layout/DefaultLayout";
import { useFetchCourseByQuery } from "@/hooks/useFetchCourse";
import { ShimmerCard1 } from "@/pages/ShimmerCard";
import { useAutocorrect } from "@/hooks/useAutocorrect";

interface CourseData {
  _id: string;
  title: string;
  description: string;
  price: string;
  instructor: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  duration: string;
  level: string;
  thumbnail: string;
  category: string;
  language: string;
}

interface FilterOption {
  name: string;
  options: string[];
}

type SortOption =
  | "Most Relevant"
  | "Price: Low to High"
  | "Price: High to Low"
  | "Newest";

type FilterState = {
  [key: string]: {
    [key: string]: boolean;
  };
};

const categories = [
  "Development",
  "Business",
  "Finance & Accounting",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Lifestyle",
  "Photography & Video",
  "Health & Fitness",
  "Music",
  "Teaching & Academics",
];

const filters: FilterOption[] = [
  {
    name: "Level",
    options: ["All Levels", "Beginner", "Intermediate", "Expert"],
  },
  {
    name: "Language",
    options: ["English", "Hindi", "Spanish", "French", "German"],
  },
  {
    name: "Category",
    options: categories,
  },
  { name: "Price", options: ["Paid", "Free"] },
];

const ITEMS_PER_PAGE = 10;

export default function Component() {
  const location = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("query") || "";
  const [query, setQuery] = useState(initialQuery);
  const { correctedQuery, isCorrected } = useAutocorrect(query);

  const [sortBy, setSortBy] = useState<SortOption>("Most Relevant");
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    Level: { "All Levels": true },
    Language: {},
    Category: {},
    Price: {},
  });
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: courses,
    error,
    isLoading,
  } = useFetchCourseByQuery(correctedQuery);

  const [filteredCourses, setFilteredCourses] = useState<CourseData[]>([]);

  useEffect(() => {
    const searchQuery = queryParams.get("query");
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, [location.search, queryParams]);

  const toggleFilter = (category: string, option: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (category === "Level") {
        newFilters[category] = { [option]: !prev[category][option] };
        if (option !== "All Levels" && newFilters[category][option]) {
          newFilters[category]["All Levels"] = false;
        }
      } else {
        newFilters[category] = {
          ...prev[category],
          [option]: !prev[category][option],
        };
      }
      return newFilters;
    });
    setCurrentPage(1);
  };

  useEffect(() => {
    if (courses) {
      const newFilteredCourses = courses.filter((course) => {
        return Object.entries(selectedFilters).every(([category, options]) => {
          if (Object.values(options).every((v) => !v)) return true;

          switch (category) {
            case "Level":
              return options["All Levels"] || options[course.level];
            case "Language":
              return Object.entries(options).some(
                ([option, isSelected]) =>
                  !isSelected || course.language === option
              );
            case "Category":
              return Object.entries(options).some(
                ([option, isSelected]) =>
                  !isSelected || course.category === option
              );
            case "Price":
              return Object.entries(options).some(
                ([option, isSelected]) =>
                  !isSelected ||
                  (option === "Paid"
                    ? parseFloat(course.price) > 0
                    : parseFloat(course.price) === 0)
              );
            default:
              return true;
          }
        });
      });

      setFilteredCourses(newFilteredCourses);
      setCurrentPage(1);
    }
  }, [selectedFilters, courses]);

  const sortCourses = (
    courses: CourseData[],
    sortBy: SortOption
  ): CourseData[] => {
    switch (sortBy) {
      case "Price: Low to High":
        return [...courses].sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      case "Price: High to Low":
        return [...courses].sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      case "Newest":
        return [...courses].sort(
          (a, b) => parseInt(b._id, 16) - parseInt(a._id, 16)
        );
      default:
        return courses;
    }
  };

  useEffect(() => {
    if (filteredCourses.length > 0) {
      setFilteredCourses(sortCourses(filteredCourses, sortBy));
    }
  }, [filteredCourses, sortBy]);

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const NoCoursesFound = () => (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg shadow-md bg-slate-50 dark:bg-gray-800 max-w-md mx-auto space-y-4">
      <SearchX size={64} className="text-slate-400 animate-pulse" />
      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
        No Courses Found
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-center">
        Unfortunately, no courses are available for the selected filters at this
        time. Try adjusting your search terms or filters to find more courses.
      </p>
      <Link to="/">
        <Button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">
          Back to Home
        </Button>
      </Link>
    </div>
  );

  return (
    <DefaultLayout>
      <div className="flex-1 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
            {filteredCourses.length} results for "{correctedQuery}"
          </h1>
          {isCorrected && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Showing results for "{correctedQuery}".
              <Button
                variant="link"
                className="p-0 h-auto text-blue-500 dark:text-blue-400"
                onClick={() => {
                  setQuery(initialQuery);
                  navigate(`/search?query=${encodeURIComponent(initialQuery)}`);
                }}
              >
                Search instead for "{initialQuery}"
              </Button>
            </p>
          )}
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-1/4">
              <Card className="bg-white dark:bg-gray-800 sticky top-4">
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    Filter
                  </h2>
                  {filters.map((filter) => (
                    <div key={filter.name} className="mb-4">
                      <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">
                        {filter.name}
                      </h3>
                      {filter.options.map((option) => (
                        <label
                          key={option}
                          className="flex items-center space-x-2 mb-2"
                        >
                          <Checkbox
                            id={`${filter.name}-${option}`}
                            checked={
                              selectedFilters[filter.name]?.[option] || false
                            }
                            onCheckedChange={() =>
                              toggleFilter(filter.name, option)
                            }
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </aside>
            <main className="w-full lg:w-3/4">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing{" "}
                  {Math.min(
                    (currentPage - 1) * ITEMS_PER_PAGE + 1,
                    filteredCourses.length
                  )}{" "}
                  -{" "}
                  {Math.min(
                    currentPage * ITEMS_PER_PAGE,
                    filteredCourses.length
                  )}{" "}
                  of {filteredCourses.length} results
                </p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      Sort by: {sortBy} <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-white dark:bg-gray-800"
                  >
                    <DropdownMenuItem
                      onClick={() => setSortBy("Most Relevant")}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Most Relevant
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSortBy("Price: Low to High")}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Price: Low to High
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSortBy("Price: High to Low")}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Price: High to Low
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSortBy("Newest")}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Newest
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {isLoading ? (
                <div className="flex flex-col items-center gap-6">
                  {[1, 2, 3].map((item) => (
                    <ShimmerCard1 key={item} />
                  ))}
                </div>
              ) : error ? (
                <NoCoursesFound />
              ) : filteredCourses.length === 0 ? (
                <NoCoursesFound />
              ) : (
                <div className="space-y-4">
                  {paginatedCourses.map((course) => (
                    <Card
                      key={course._id}
                      className="flex flex-col sm:flex-row bg-white dark:bg-gray-800"
                    >
                      <img
                        src={
                          course.thumbnail ||
                          "/placeholder.svg?height=150&width=150"
                        }
                        alt={course.title}
                        className="w-full sm:w-60 h-32 object-cover"
                      />
                      <CardContent className="flex-grow p-4">
                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {`${course.instructor.firstName} ${course.instructor.lastName}`}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-2">
                          {course.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="w-4 h-4 mr-1" />
                            {course.duration}
                          </span>
                          <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Book className="w-4 h-4 mr-1" />
                            {course.level}
                          </span>
                          <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Globe className="w-4 h-4 mr-1" />
                            {course.language}
                          </span>
                        </div>
                        <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 text-xs font-semibold px-2.5 py-0.5 rounded">
                          {course.category}
                        </span>
                      </CardContent>
                      <CardFooter className="p-4 flex flex-col items-end justify-between">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {parseFloat(course.price) === 0
                            ? "Free"
                            : `₹${course.price}`}
                        </div>
                        <Link to={`/course/${course._id}`} state={{ course }}>
                          <Button className="mt-2">Enroll Now</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <nav className="inline-flex rounded-md shadow">
                    <Button
                      variant="outline"
                      className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {[...Array(totalPages)].map((_, index) => (
                      <Button
                        key={index}
                        variant={
                          currentPage === index + 1 ? "default" : "outline"
                        }
                        className={`bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 ${
                          currentPage === index + 1
                            ? "bg-blue-500 text-white"
                            : ""
                        }`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </nav>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
