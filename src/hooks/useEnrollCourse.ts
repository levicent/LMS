
import api from '../services/api'

import { useEffect, useState } from "react";


export const useEnrollCourse = () => {
  const enrollCourse = async (courseId: string) => {
    try {
      const payload = { courseId };
      await api.post(`enroll/${courseId}`, payload);
    } catch (error) {
      console.error('Error enrolling in course:', error);
      throw new Error('Error enrolling in course');
    }
  };
  return { enrollCourse };
};


// MyLearning 
export const useFetchEnrolledCourses = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<unknown[]>([]);

  const fetchEnrolledCourses = async () => {
    try {
      const response = await api.get('enrolled-courses');
      setCourses(response.data.enrolledCourses);
    } catch (err) {
      console.error('Error enrolling in course:', err);
      setError('Error fetching enrolled courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  return { loading, error, courses, fetchEnrolledCourses };
};
