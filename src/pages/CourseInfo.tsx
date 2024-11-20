import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

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
  BookOpen,
} from "lucide-react";
import DefaultLayout from "@/layout/DefaultLayout";
import Ratings from "@/components/Ratings/Ratings";
import { useCart } from "@/context/cartContext";
import AuthContext from "@/context/authContext";
import { toast } from "react-toastify";
import { useFetchEnrolledCourses } from "@/hooks/useEnrollCourse";
import { useAddReview } from "@/hooks/useAddReview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faFeatherPointed, faStar } from "@fortawesome/free-solid-svg-icons";
import { FaComments } from "react-icons/fa";
interface CourseData {
  _id: string;
  id: string;
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
  rating: number;
  numReviews: number;
  reviews: Array<{
    user: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    rating: number;
    review: string;
    _id: string;
  }>;
  duration: string;
  level: string;
  thumbnail: string;
  category: string;
  language: string;
  topics?: string[];
  prerequisites?: string[];
  sections?: {
    sectionId: string;
    title: string;
    videos: {
      _id: string;
      title: string;
    }[];
  }[];
}

interface EnrolledCourse {
  courseId: {
    _id: string;
    id: string;
  };
}

interface LocationState {
  course: CourseData;
}


export default function CourseInfo() {
  const { addToCart, isCourseInCart, isAddedToCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const { courses: enrolledCourses } = useFetchEnrolledCourses();
  const [activeTab, setActiveTab] = useState("overview");
  const [course, setCourse] = useState<CourseData | null>(null);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { isAuthenticated } = authContext;

  useEffect(() => {
    const state = location.state as LocationState | null;
    if (state && state.course) {
      setCourse(state.course);
      isCourseInCart(state.course._id);
    }
  }, [location.state, isCourseInCart]);

  if (!course) return <div>Course not found</div>;

  const isEnrolled = (enrolledCourses as EnrolledCourse[]).some(
    (enrolledCourse) => enrolledCourse.courseId?._id === course?._id
  );

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/signin");
      toast.error("Please sign in to continue");
      return;
    }
    if (!isAddedToCart) {
      const cartItem = {
        productId: course._id,
        name: course.title,
        price: parseFloat(course.price),
        thumbnail: course.thumbnail,
        instructor: {
          id: course.instructor._id,
          firstName: course.instructor.firstName,
          lastName: course.instructor.lastName,
        },
        duration: course.duration,
        level: course.level,
      };

      addToCart(cartItem);
    }
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
            {/* Main content */}
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
                  <Card className="mt-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                      <CardTitle className="text-xl font-semibold flex items-center gap-2">
                        <span>Reviews</span>
                        {course.reviews?.length > 0 && (
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            ({course.reviews.length})
                          </span>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      {course.reviews && course.reviews.length > 0 ? (
                        <div className="space-y-4">
                          {course.reviews.map((review) => (
                            <div
                              key={ review._id} 
                              className={`p-4 rounded-lg ${course.reviews.indexOf(review) % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/50' : 'bg-white dark:bg-gray-800'}`}
                            >
                              <div className="flex items-center gap-3 mb-2">
                               
                                <Ratings value={review.rating} />

                                <div>
                                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                    {review.user ? `${review.user.firstName}` : 'Anonymous'}
                                  </h4>
                                </div>
                              </div>
                              <p className="text-gray-600 dark:text-gray-300 text-sm">
                                {review.review}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                          <p>No reviews yet</p>
                          <p className="text-sm mt-1">Be the first to review this course!</p>
                        </div>
                      )}
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
                      <Accordion type="single" collapsible className="w-full">
                        {(course.sections && course.sections.length > 0) ? (
                          course.sections.map((section, index) => (
                            <AccordionItem key={section.sectionId || index} value={`section-${index}`}>
                              <AccordionTrigger className="flex justify-between items-center">
                                <h3 className="font-semibold text-lg">{section.title}</h3>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {section.videos.length} {section.videos.length === 1 ? "video" : "videos"}
                                </span>
                              </AccordionTrigger>
                              <AccordionContent>
                                <ul className="space-y-3 pl-6">
                                  {section.videos.map((video) => (
                                    <li
                                      key={video._id}
                                      className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border-b rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out"
                                    >
                                      <div className="flex items-center space-x-4">
                                        <div className="w-6 h-6 flex items-center justify-center bg-blue-300 text-gray-900 rounded-full text-md font-semibold">
                                          <span>{section.videos.indexOf(video) + 1}</span>
                                        </div>
                                        <span className="text-medium font-sans text-gray-800 dark:text-gray-100">
                                          {video.title || "Untitled Video"}
                                        </span>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          ))
                        ) : (
                          <div className="p-6 text-center text-gray-600 dark:text-gray-400">
                            <p>Sections are coming soon!</p>
                          </div>
                        )}
                      </Accordion>
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
            {/* Sidebar */}
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
                    {parseFloat(course.price) === 0
                      ? "Free"
                      : `₹${course.price}`}
                  </div>

                  {isEnrolled ? (
                    <Link to={`/course/enrolled/${course._id}`}>
                      <Button className="w-full mb-4 bg-green-600 hover:bg-green-700 text-white">
                        <BookOpen className="mr-2 h-4 w-4" /> Go to My Course
                      </Button>
                    </Link>
                  ) : isAddedToCart ? (
                    <Link to="/cart">
                      <Button className="w-full mb-4 bg-blue-700 hover:bg-blue-800 text-white">
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

                  {isEnrolled ? (
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                      Happy Learning!
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                      30-Day Money-Back Guarantee
                    </p>
                  )}
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
                    <div className="flex items-center mr-2 h-4 w-4">
                    <FontAwesomeIcon icon={faStar} style={{color: "#FFD43B",}} />
                      <span className="m-2">
                        {course.rating}
                      </span>
                    </div>
                    <div className="flex items-center ">
                    <FontAwesomeIcon icon={faFeatherPointed} style={{color: "#908e8e",}} />
                        <span className="ml-2 ">
                        {course.numReviews} reviews
                        </span>
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




