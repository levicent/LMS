// import { Search } from "lucide-react"
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import useUpdateCourse from "@/hooks/useCourseUpdateById";
import useDeleteCourse from "@/hooks/useCourseDeleteById";
import { ConfirmationDialog } from "../DialogBox/RemoveDialog";
import Loading from "../Loading/Loading";
import useFetchCourseByUserId from "@/hooks/useFetchCoursesByUserId";

export default function CourseDisplay() {
  // const { data: courses, isLoading, isError } = useFetchCourses();
  const { data: courses, isLoading, isError } = useFetchCourseByUserId()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);
  const navigate = useNavigate();
  // const updateCourseMutation = useUpdateCourse();
  const deleteCourseMutation = useDeleteCourse();
  
  const navigateToAddSection = (courseId: string) => {
    navigate(`/add-section/${courseId}`);
  };
  const navigateToViewSection = (courseId: string) => {
    navigate(`/instructor/dashboard/course/${courseId}`);
  };
  // const handleUpdateCourse = (id: string) => {
  //   const updatedData = { title: 'Updated Course Title' };
  //   updateCourseMutation.mutate({ id, data: updatedData });
  // };

  const handleDeleteCourse = (id: string) => {
    setCourseToDelete(id);
    setIsDialogOpen(true);
  };
  const confirmDeleteCourse = () => {
    if (courseToDelete) {
      deleteCourseMutation.mutate(courseToDelete);
      setIsDialogOpen(false);
      setCourseToDelete(null);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading courses</div>;
  }

  return (
    <div className="min-h-screen text-white p-8 shadow-lg">
     
      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(courses) && courses?.length > 0 ? (
          courses?.map((course, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.thumbnail}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>

                <Button
                  className="w-full mb-2 bg-gray-600 hover:bg-blue-600 dark:bg-gray-300"
                  onClick={() => navigateToViewSection(course._id)}
                >
                  View Course
                </Button>
                <Button
                  className="w-full mb-2 dark:bg-blue-300 hover:bg-blue-400 bg-blue-500 "
                  onClick={() => navigateToAddSection(course._id)}
                >
                  Add a Section
                </Button>
                {/* <Button
                  className="w-full mb-2 bg-blue-500 hover:bg-blue-600"
                  onClick={() => handleUpdateCourse(course._id)}
                >
                  Update Course
                </Button> */}
                <Button
                  className="w-full mb-2 bg-red-400 hover:bg-red-500 "
                  onClick={() => handleDeleteCourse(course._id)}
                >
                  Delete Course
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-2xl text-gray-500">
            No Courses Found
          </div>
        )}
      </div>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={confirmDeleteCourse}
        title="Delete Course"
        message="Are you sure you want to delete this course? This action cannot be undone."
      />
    </div>
  );
}
