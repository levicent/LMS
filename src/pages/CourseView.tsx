
import React from "react";
import { useParams } from "react-router-dom";
import useFetchCourseById from "@/hooks/useFetchCourseById";
import { Button } from "@/components/ui/button";

const CourseView: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();

  const { data: course, isLoading, error } = useFetchCourseById(courseId || '');
  console.log("Fetched Course:", course);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading course:</div>;

  if (!course) return <div>No course found</div>;

  return (
    <div className="min-h-screen p-8 text-white">
      <img
        src={course.thumbnail}
        className="w-full h-60 object-cover mb-4"
      />
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="text-lg mb-6">{course.description}</p>
      <Button className="bg-blue-500 hover:bg-blue-600">Back to Courses</Button>
    </div>
  );
};

export default CourseView;
