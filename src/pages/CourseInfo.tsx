import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ShoppingCart,
  Clock,
  BarChart,
  Globe,
  Award,
  PlayCircle,
  FileText,
  Download,
  Check,
} from "lucide-react";
import DefaultLayout from "@/layout/DefaultLayout";
import Ratings from "@/components/Ratings/Ratings";
import { useCart } from "@/context/cartContext";
import { toast } from "react-toastify";

interface CourseData {
  _id: string;
  title: string;
  description: string;
  price: string;
  instructor: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    bio?: string;
  };
  duration: string;
  level: string;
  thumbnail: string;
  category: string;
  language: string;
  topics?: string[];
  prerequisites?: string[];
}

export default function CourseInfo() {
  const { addToCart, isCourseInCart } = useCart();
  const location = useLocation();
  const course: CourseData = location.state?.course;
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!course) return <div>Course not found</div>;

  if (course) {
    useEffect(() => {
      setIsAddedToCart(isCourseInCart(course._id));
    }, [course, isCourseInCart]);
  }

  const handleAddToCart = () => {
    if (!isAddedToCart) {
      addToCart({
        id: course._id,
        thumbnail: course.thumbnail,
        name: course.title,
        instructor: {
          id: course.instructor._id,
          firstName: course.instructor.firstName,
          lastName: course.instructor.lastName,
        },
        price: parseFloat(course.price),
        duration: course.duration,
        level: course.level,
      });
    }
    setIsAddedToCart(true);
    toast.info("Course added to cart");
  };

  const staticData = {
    lastUpdated: "March 2023",
    totalLectures: 42,
    totalArticles: 10,
    totalDownloads: 15,
    learningOutcomes: [
      "Understand the fundamentals of the subject",
      "Apply advanced techniques in real-world scenarios",
      "Develop critical thinking skills in the field",
      "Master the use of essential tools and technologies",
    ],
    curriculum: [
      {
        title: "Introduction to the Course",
        lectures: 3,
        duration: "45 minutes",
      },
      { title: "Core Concepts", lectures: 10, duration: "2 hours" },
      { title: "Advanced Techniques", lectures: 15, duration: "3 hours" },
      { title: "Practical Applications", lectures: 10, duration: "2.5 hours" },
      { title: "Final Project", lectures: 4, duration: "1 hour" },
    ],
  };

  return (
    <DefaultLayout>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                {course.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-4">
                {course.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Badge variant="secondary">{course.category}</Badge>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: {staticData.lastUpdated}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {course.language}
                </span>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={
                    course.instructor.avatar ||
                    "/placeholder.svg?height=50&width=50"
                  }
                  alt={`${course.instructor.firstName} ${course.instructor.lastName}`}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold">
                    {course.instructor.firstName} {course.instructor.lastName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Instructor
                  </p>
                </div>
              </div>
              <div className="mb-6">
                <Ratings />
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  4.95 out of 5
                </span>
              </div>
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="bg-white dark:bg-gray-800 overflow-x-auto flex whitespace-nowrap">
                  <TabsTrigger
                    value="overview"
                    onClick={() => setActiveTab("overview")}
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="curriculum"
                    onClick={() => setActiveTab("curriculum")}
                  >
                    Curriculum
                  </TabsTrigger>
                  <TabsTrigger
                    value="instructor"
                    onClick={() => setActiveTab("instructor")}
                  >
                    Instructor
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="overview"
                  className={activeTab === "overview" ? "" : "hidden"}
                >
                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle>What you'll learn</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {(course.topics || staticData.learningOutcomes).map(
                          (outcome, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                              <span>{outcome}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="mt-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle>Course content</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <span>{staticData.totalLectures} lectures</span>
                          <span>{course.duration}</span>
                        </div>
                        <Progress value={33} className="w-full" />
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center">
                            <PlayCircle className="mr-2 h-4 w-4" />
                            <span>
                              {staticData.totalLectures} video lectures
                            </span>
                          </div>
                          <div className="flex items-center">
                            <FileText className="mr-2 h-4 w-4" />
                            <span>{staticData.totalArticles} articles</span>
                          </div>
                          <div className="flex items-center">
                            <Download className="mr-2 h-4 w-4" />
                            <span>
                              {staticData.totalDownloads} downloadable resources
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="mt-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle>Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-2">
                        {course.prerequisites ? (
                          course.prerequisites.map((prerequisite, index) => (
                            <li key={index}>{prerequisite}</li>
                          ))
                        ) : (
                          <li>No specific prerequisites</li>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent
                  value="curriculum"
                  className={activeTab === "curriculum" ? "" : "hidden"}
                >
                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle>Course Curriculum</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {staticData.curriculum.map((section, index) => (
                        <div key={index} className="mb-4">
                          <h3 className="font-semibold text-lg mb-2">
                            {section.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {section.lectures} lectures • {section.duration}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent
                  value="instructor"
                  className={activeTab === "instructor" ? "" : "hidden"}
                >
                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle>Instructor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
                        <img
                          src={
                            course.instructor.avatar ||
                            "/placeholder.svg?height=100&width=100"
                          }
                          alt={`${course.instructor.firstName} ${course.instructor.lastName}`}
                          className="w-24 h-24 rounded-full"
                        />
                        <div>
                          <h3 className="text-xl font-semibold">
                            {course.instructor.firstName}{" "}
                            {course.instructor.lastName}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            Instructor
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {course.instructor.bio ||
                          "Experienced instructor with a passion for teaching and a deep understanding of the subject matter. Committed to helping students achieve their learning goals and succeed in their careers."}
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
              <Card className="sticky top-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-0">
                  <img
                    src={
                      course.thumbnail ||
                      "/placeholder.svg?height=300&width=400"
                    }
                    alt={`${course.title} Course Cover`}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardContent>
                <CardContent className="p-6">
                  <div className="text-3xl sm:text-4xl font-bold mb-4">
                    ₹{parseFloat(course.price).toFixed(2)}
                  </div>

                  {isAddedToCart ? (
                    <Link to="/cart">
                      <Button className="w-full mb-4 bg-blue-700 hover:bg-blue-700 text-white">
                        <ShoppingCart className="mr-2 h-4 w-4" /> Go to Cart
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      onClick={handleAddToCart}
                      className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                  )}

                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                    30-Day Money-Back Guarantee
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <BarChart className="mr-2 h-4 w-4" />
                      <span>{course.level} level</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4" />
                      <span>{course.language}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="mr-2 h-4 w-4" />
                      <span>Certificate of completion</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
