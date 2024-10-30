import { useParams, Link } from "react-router-dom";
import useFetchCourseById from "@/hooks/useFetchCourseById";
import { Button } from "@/components/ui/button";
import {
  Clock,
  BarChart,
  Globe,
  ChevronLeft,
  Calendar,
  Users,
  Star,
  BookOpen,
  Edit3,
} from "lucide-react";
import TeacherLayout from "@/layout/TeacherLayout";

interface Video {
  title: string;
}

interface Section {
  sectionId: string;
  title: string;
  videos: Video[];
  _id: string;
}

interface Review {
  _id: string;
  rating: number;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  price: string;
  instructor: string;
  duration: string;
  level: string;
  thumbnail: string;
  category: string;
  tags: string[];
  language: string;
  studentsEnrolled: string[];
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
  sections: Section[];
  __v: number;
}

export default function CourseView() {
  const { courseId = "" } = useParams<{ courseId: string }>();
  const { data, isLoading, error } = useFetchCourseById(courseId) as {
    data: { course: Course } | undefined;
    isLoading: boolean;
    error: unknown;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-500">
        Error loading course
      </div>
    );
  if (!data?.course)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-700">
        No course found
      </div>
    );

  const course = data.course;
  const averageRating =
    course.reviews.reduce((acc, review) => acc + review.rating, 0) /
    course.reviews.length;

  return (
    <TeacherLayout>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <Link
          to="/instructor/dashboard/courses"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Courses
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              {course.thumbnail ? (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-48 w-full object-cover md:h-full md:w-48"
                />
              ) : (
                <div className="h-48 w-full md:h-full md:w-48 bg-gray-200 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {course.category}
              </div>
              <h1 className="mt-2 text-3xl font-extrabold text-gray-900 leading-tight">
                {course.title}
              </h1>
              <p className="mt-2 text-gray-500">{course.description}</p>
              <div className="mt-4 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(averageRating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {averageRating.toFixed(1)} ({course.reviews.length} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="px-8 py-6 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2 text-gray-400" />
                <span>{course.duration} hours</span>
              </div>
              <div className="flex items-center text-gray-600">
                <BarChart className="h-5 w-5 mr-2 text-gray-400" />
                <span>{course.level}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Globe className="h-5 w-5 mr-2 text-gray-400" />
                <span>{course.language}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                <span>Last updated {formatDate(course.updatedAt)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2 text-gray-400" />
                <span>{course.studentsEnrolled.length} students enrolled</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Course Content
              </h2>
              <span className="text-sm text-gray-500">
                {course.sections.length} sections •{" "}
                {course.sections.reduce(
                  (acc, section) => acc + section.videos.length,
                  0
                )}{" "}
                lectures
              </span>
            </div>

            {course.sections && course.sections.length > 0 ? (
              <div className="space-y-4">
                {course.sections.map((section, index) => (
                  <div
                    key={section.sectionId}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div
                      className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                      onClick={() => {
                        // Toggle section visibility logic here
                      }}
                    >
                      <h3 className="font-medium text-gray-900">
                        Section {index + 1}: {section.title}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {section.videos.length} lectures
                      </span>
                    </div>
                    {section.videos && section.videos.length > 0 && (
                      <ul className="divide-y divide-gray-200">
                        {section.videos.map((video, videoIndex) => (
                          <li
                            key={videoIndex}
                            className="p-4 hover:bg-gray-50 transition-colors duration-150"
                          >
                            <div className="flex items-center">
                              <div className="flex-shrink-0 mr-3">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                  <BookOpen className="h-4 w-4 text-blue-600" />
                                </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {video.title}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 p-4 bg-gray-50 rounded-lg">
                No sections available for this course yet
              </p>
            )}
          </div>

          <div className="p-8 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">
                  Total Revenue: ₹
                  {Number(course.price) * course.studentsEnrolled.length}
                </h3>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2">
                <Edit3 className="h-5 w-5" />
                Edit Course
              </Button>
            </div>
          </div>
        </div>

        {course.tags && course.tags.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Course Tags</h3>
            <div className="flex flex-wrap gap-2">
              {course.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </TeacherLayout>
  );
}
