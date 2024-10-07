import { useState, useEffect } from "react";
import { Star, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocation } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  price: number;
  originalPrice: number;
  image: string;
  bestseller?: boolean;
  hotAndNew?: boolean;
  level: string;
  duration: string;
  language: string;
  features: string[];
}

interface FilterOption {
  name: string;
  options: string[];
}

const courses: Course[] = [
  {
    id: 1,
    title: "100 Days of Code: The Complete Python Pro Bootcamp",
    instructor: "Dr. Angela Yu",
    rating: 4.7,
    students: 326710,
    price: 3099,
    originalPrice: 3199,
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500&h=320&fit=crop",
    bestseller: true,
    level: "All Levels",
    duration: "65 total hours",
    language: "English",
    features: ["Subtitles", "Quizzes", "Coding Exercises"],
  },
  {
    id: 2,
    title: "The Complete Python Bootcamp From Zero to Hero in Python",
    instructor: "Jose Portilla",
    rating: 4.6,
    students: 519106,
    price: 3099,
    originalPrice: 3199,
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=320&fit=crop",
    level: "Beginner",
    duration: "22 total hours",
    language: "English",
    features: ["Subtitles", "Coding Exercises"],
  },
  {
    id: 3,
    title: "Learn Python Programming - Beginner to Master",
    instructor: "Avinash Jain, The Codex",
    rating: 4.4,
    students: 78953,
    price: 799,
    originalPrice: 3199,
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&h=320&fit=crop",
    level: "All Levels",
    duration: "16 total hours",
    language: "English",
    features: ["Subtitles", "Practice Tests"],
  },
  {
    id: 4,
    title: "Python for Data Science and Machine Learning Bootcamp",
    instructor: "Jose Portilla",
    rating: 4.6,
    students: 234567,
    price: 3099,
    originalPrice: 3199,
    image:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500&h=320&fit=crop",
    bestseller: true,
    level: "Intermediate",
    duration: "25 total hours",
    language: "English",
    features: ["Subtitles", "Quizzes", "Practice Tests"],
  },
  {
    id: 5,
    title: "Complete Python Developer in 2023: Zero to Mastery",
    instructor: "Andrei Neagoie",
    rating: 4.7,
    students: 98765,
    price: 3099,
    originalPrice: 3199,
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&h=320&fit=crop",
    hotAndNew: true,
    level: "Beginner",
    duration: "30 total hours",
    language: "English",
    features: ["Subtitles", "Coding Exercises", "Practice Tests"],
  },
];

const filters: FilterOption[] = [
  {
    name: "Ratings",
    options: ["4.5 & up", "4.0 & up", "3.5 & up", "3.0 & up"],
  },
  {
    name: "Video Duration",
    options: ["0-1 Hour", "1-3 Hours", "3-6 Hours", "6-17 Hours", "17+ Hours"],
  },
  {
    name: "Topic",
    options: [
      "Python",
      "Data Science",
      "Machine Learning",
      "Web Development",
      "Game Development",
    ],
  },
  {
    name: "Level",
    options: ["All Levels", "Beginner", "Intermediate", "Expert"],
  },
  {
    name: "Language",
    options: ["English", "Hindi", "Spanish", "French", "German"],
  },
  { name: "Price", options: ["Paid", "Free"] },
  {
    name: "Features",
    options: ["Subtitles", "Quizzes", "Coding Exercises", "Practice Tests"],
  },
];

type SortOption = "Most Relevant" | "Most Popular" | "Highest Rated" | "Newest";

type FilterState = {
  [key: string]: {
    [key: string]: boolean;
  };
};

export default function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";

  const [sortBy, setSortBy] = useState<SortOption>("Most Relevant");
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({});
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

  const toggleFilter = (category: string, option: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [option]: !prev[category]?.[option],
      },
    }));
  };

  useEffect(() => {
    const newFilteredCourses = courses.filter((course) => {
      return Object.entries(selectedFilters).every(([category, options]) => {
        if (Object.values(options).every((v) => !v)) return true; // If no option is selected in a category, don't filter

        switch (category) {
          case "Ratings":
            return Object.entries(options).some(([option, isSelected]) => {
              if (!isSelected) return false;
              const minRating = parseFloat(option.split(" ")[0]);
              return course.rating >= minRating;
            });
          case "Video Duration":
            return Object.entries(options).some(([option, isSelected]) => {
              if (!isSelected) return false;
              const [min, max] = option.split("-").map((h) => parseInt(h));
              const courseDuration = parseInt(course.duration.split(" ")[0]);
              return (
                courseDuration >= min && (max ? courseDuration <= max : true)
              );
            });
          case "Level":
            return Object.entries(options).some(
              ([option, isSelected]) => isSelected && course.level === option
            );
          case "Language":
            return Object.entries(options).some(
              ([option, isSelected]) => isSelected && course.language === option
            );
          case "Price":
            return Object.entries(options).some(
              ([option, isSelected]) =>
                isSelected &&
                (option === "Paid" ? course.price > 0 : course.price === 0)
            );
          case "Features":
            return Object.entries(options).some(
              ([option, isSelected]) =>
                isSelected && course.features.includes(option)
            );
          default:
            return true;
        }
      });
    });

    setFilteredCourses(newFilteredCourses);
  }, [selectedFilters]);

  const sortCourses = (courses: Course[], sortBy: SortOption): Course[] => {
    switch (sortBy) {
      case "Most Popular":
        return [...courses].sort((a, b) => b.students - a.students);
      case "Highest Rated":
        return [...courses].sort((a, b) => b.rating - a.rating);
      case "Newest":
        return [...courses].sort((a, b) => b.id - a.id); // Assuming newer courses have higher IDs
      default: // Most Relevant
        return courses;
    }
  };

  useEffect(() => {
    setFilteredCourses(sortCourses(filteredCourses, sortBy));
  }, [filteredCourses, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        {filteredCourses.length} results for "{query}"
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4">
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Filter
              </h2>
              {filters.map((filter) => (
                <div key={filter.name} className="mb-4">
                  <h3 className="font-medium mb-2 text-gray-700">
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
                      <span className="text-sm text-gray-600">{option}</span>
                    </label>
                  ))}
                  {filter.options.length > 4 && (
                    <Button
                      variant="link"
                      className="text-sm p-0 text-blue-600"
                    >
                      Show more
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
        <main className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">
              {filteredCourses.length} results
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white text-gray-700">
                  Sort by: {sortBy} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem
                  onClick={() => setSortBy("Most Relevant")}
                  className="text-gray-700 hover:bg-gray-100"
                >
                  Most Relevant
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("Most Popular")}
                  className="text-gray-700 hover:bg-gray-100"
                >
                  Most Popular
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("Highest Rated")}
                  className="text-gray-700 hover:bg-gray-100"
                >
                  Highest Rated
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("Newest")}
                  className="text-gray-700 hover:bg-gray-100"
                >
                  Newest
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="flex flex-col sm:flex-row bg-white shadow-sm"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full sm:w-60 h-32 object-cover"
                />
                <CardContent className="flex-grow p-4">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {course.instructor}
                  </p>
                  <div className="flex items-center mb-2">
                    <span className="text-orange-400 font-bold mr-1">
                      {course.rating}
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(course.rating)
                              ? "text-orange-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-1">
                      ({course.students.toLocaleString()})
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    {course.duration} • {course.level} • {course.language}
                  </p>
                  {course.bestseller && (
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded mt-2">
                      Bestseller
                    </span>
                  )}
                  {course.hotAndNew && (
                    <span className="inline-block bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded mt-2">
                      Hot & New
                    </span>
                  )}
                </CardContent>
                <CardFooter className="p-4 flex flex-col items-end justify-between">
                  <div className="text-2xl font-bold text-gray-900">
                    ₹{course.price}
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    ₹{course.originalPrice}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              <Button variant="outline" className="bg-white text-gray-700">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="bg-white text-gray-700">
                1
              </Button>
              <Button variant="outline" className="bg-white text-gray-700">
                2
              </Button>
              <Button variant="outline" className="bg-white text-gray-700">
                3
              </Button>
              <Button variant="outline" className="bg-white text-gray-700">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </nav>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Related searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "python for beginners",
                "python data science",
                "python machine learning",
                "python web development",
                "python game development",
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
