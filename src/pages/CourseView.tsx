import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useFetchCourseById from "@/hooks/useFetchCourseById";
import useUpdateCourse from "@/hooks/useCourseUpdateById";
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
  Edit,
  Trash,
  Upload, 
  Pointer
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TeacherLayout from "@/layout/TeacherLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@/components/Model";
import { useQueryClient } from "react-query";
import { useDeleteSection } from "@/hooks/useDeleteSection";
import Video from "@/components/Video/Video";
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

interface DeleteSection {
  courseId: string;
  sectionId: string;
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
  const navigate = useNavigate();

  const { courseId = "" } = useParams<{ courseId: string }>();
  const { data, isLoading, error } = useFetchCourseById(courseId) as {
    data: { course: Course } | undefined;
    isLoading: boolean;
    error: unknown;
  };
  const queryClient = useQueryClient();
  const updateCourseMutation = useUpdateCourse();

  const { mutate: deleteSection } = useDeleteSection();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    if (data?.course) {
      setEditedTitle(data.course.title);
      setEditedDescription(data.course.description);
    }
  }, [data]);

  const handleAddSection = () => {
    navigate(`/add-section/${courseId}`);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditSection = (
    courseId: string,
    sectionId: string,
    title: string
  ) => {
    navigate(`/edit-section/${courseId}/sections/${sectionId}`, {
      state: { courseId, sectionId, title },
    });
  };
  const handleDeleteSection = ({ courseId, sectionId }: DeleteSection) => {
    try {
      deleteSection(
        { courseId, sectionId },
        {
          onSuccess: () => {
            toast.success("Section deleted successfully.");
            queryClient.invalidateQueries(["course", courseId]);
            queryClient.invalidateQueries("sections");
          },
          onError: (error: any) => {
            console.error("Error deleting section: ", error);
            toast.error("Error deleting section.");
          },
        }
      );
    } catch (error) {
      console.error("Error deleting section: ", error);
    }
  };

  const handleSaveClick = () => {
    const updatedCourse = {
      title: editedTitle,
      description: editedDescription,
    };
    updateCourseMutation.mutate(
      { id: courseId, data: updatedCourse },
      {
        onSuccess: () => {
          toast.success("Course updated successfully!");
          setIsEditing(false);
          queryClient.invalidateQueries(["course", courseId]);
        },
        onError: () => {
          toast.error("Failed to update course.");
        },
      }
    );
  };

  const handleAddVideo = () => {
    //navigate to video page 
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
                  <span>
                    {course.studentsEnrolled.length} students enrolled
                  </span>
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
              <div className="flex justify-end mb-4 gap-2">
                <Button
                  onClick={handleAddSection}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-2 rounded-lg gap-2"
                >
                  <Edit3 className="h-5 w-5" />
                  Add Section
                </Button>
                <Button
                  onClick={handleEditClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-2 rounded-lg flex items-center gap-2"
                >
                  <Edit3 className="h-5 w-5" />
                  Edit Course
                </Button>
              </div>
              {course.sections && course.sections.length > 0 ? (
                <div className="space-y-4">
                  {course.sections.map((section, index) => (
                    <div
                      key={section.sectionId}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <Accordion type="single" collapsible>
                        <AccordionItem value={`item-${index}`}>
                          <AccordionTrigger className="w-full">
                            <div className="flex justify-between w-full items-center p-4 bg-gray-50 cursor-pointer">
                              <h3 className="font-medium text-gray-900">
                                Section {index + 1}: {section.title}
                              </h3>
                              <span className="text-sm text-gray-500">
                                {section.videos.length} lectures
                              </span>
                              <div className="flex gap-3">
                                <Edit
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditSection(
                                      courseId,
                                      section.sectionId,
                                      section.title
                                    );
                                  }}
                                  className="h-5 w-5 text-gray-500"
                                />
                                <Trash
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteSection({
                                      courseId,
                                      sectionId: section.sectionId,
                                    });
                                  }}
                                  className="h-5 w-5 text-gray-500"
                                />
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex justify-end px-2 pr-6">
                            <Upload
                            
                              
                              
                              className="h-5 w-5 text-gray-500 cursor-pointer"
                              />
                            </div>
                            <Video
                              courseId={courseId}
                              sectionId={section.sectionId}
                            />
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
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
      <ToastContainer />
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <div>
          <h2 className="text-xl font-bold mb-4">Edit Course</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Course Title
            </label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Course Description
            </label>
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveClick}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </TeacherLayout>
  );
}
