
import { useLocation } from "react-router-dom";
import { useFetchCourseByQuery } from "@/hooks/useFetchCourse";
import { SearchX } from 'lucide-react';
import { ShimmerCard1 } from '@/pages/ShimmerCard';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useEffect, useState } from "react";
interface QueryError {
    message?: string; // Optional, because it might not exist
  }
const CourseCard = ({ course }:any) => ( 
  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 w-full max-w-sm">
        <img
            src={
                course?.thumbnail ||
                "https://via.placeholder.com/150"
            }
            alt={course.title}
            className="w-full h-48 object-cover"
        />
    <h2 className="text-xl font-semibold text-gray-800 mb-3">
      {course.title}
    </h2>
    <p className="text-gray-600 mb-4">
      {course.description}
    </p>
    <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
      Enroll Now
    </button>
  </div>
);

const NoCoursesFound = () => (
  <div className="flex  items-center justify-center rounded-lg shadow-md bg-slate-200">
    <SearchX size={64} className="text-gray-400 mb-4" />
    <h3 className="text-xl font-semibold text-gray-800 mb-2">
      No Courses Found
    </h3>
    <p className="text-gray-600 text-center">
      Try adjusting your search terms or browse all available courses
    </p>
  </div>
);

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";
  const [loading, setIsLoading] = useState(true);
  const { data: courses,error } = useFetchCourseByQuery(query);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 2 seconds
    }, 2000); // 2-second delay

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Search Results for "{query}"
        </h1>

        {error as QueryError && (
          <div className="flex justify-center">
            <div className="bg-red-50 border-l-4 border-red-300 p-4 rounded max-w-sm">
             <NoCoursesFound/>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center gap-6">
            {[1, 2, 3].map((item) => (
              <ShimmerCard1 key={item} />
            ))}
          </div>
        ) : courses?.length === 0 ? (
          <div className="flex justify-center">
            <NoCoursesFound />
          </div>
        ) : (
            <>
            
            
             <div className="flex flex-col items-center gap-6">
            {courses?.map((course) => (
              <CourseCard key={course._id} course={course}  />
            ))}
          </div>
            
            </>
         
        )}
      </div>
    </div>
    <Footer/>
</>

    
  );
};

export default SearchResults;