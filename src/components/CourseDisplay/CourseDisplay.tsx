// import { Search } from "lucide-react"
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input"
import { useState } from "react";
import { useFetchCourses } from "@/hooks/useFetchCourse";
import useAddSection from "@/hooks/useAddSection";
import { useNavigate } from "react-router-dom";

export default function CourseDisplay() {
  const { data: courses } = useFetchCourses();
  const [category, setCategory] = useState("");
  const addSectionMutation = useAddSection();
  const navigate = useNavigate();
  

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };
  const navigateToAddSection = (courseId: string) => {
    navigate(`/add-section/${courseId}`);
  };
  const navigateToViewSection =(courseId :string)=>{
     navigate(`/instructor/dashboard/course/${courseId}`)
  }

  return (
    <div className="min-h-screen text-white p-8 shadow-lg">
      <div className="flex justify-between mb-8">
        {/* <label className="block text-lg text-black mb-2">Select a Category:</label> */}
        <select
          value={category}
          onChange={handleCategoryChange}
          className="ml-auto w-full max-w-xs bg-gray-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a category</option>
          <option value="Development">Development</option>
          <option value="Business">Business</option>
          <option value="Finance & Accounting">Finance & Accounting</option>
          <option value="IT & Software">IT & Software</option>
          <option value="Personal Development">Personal Development</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Photography & Video">Photography & Video</option>
          <option value="Health & Fitness">Health & Fitness</option>
          <option value="Music">Music</option>
          <option value="Teaching & Academics">Teaching & Academics</option>
        </select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(courses) && courses?.length > 0 ? (
          courses?.map((course,index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden"
            >
              <img
                src={course.thumbnail}
                alt={course.thumbnail}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                
                <Button 
                className="w-full mb-2 bg-blue-500 hover:bg-blue-600"
                   onClick={() => navigateToViewSection(course._id)}>
                  View Course
                </Button>
                <Button
                 className="w-full mb-2 bg-blue-300 hover:bg-blue-400"
                 onClick={() => navigateToAddSection(course._id)}
                 >
                  Add a Section
                </Button>
                <Button className="w-full mb-2 bg-blue-100 hover:bg-blue-200">
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
    </div>
  );
}