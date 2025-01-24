import { useQuery } from 'react-query'
import api from '@/services/api'

const fetchCourseByUserId = async () => {
  try {
    const response = await api.get(`/my-courses`)
    return response.data.courses
  } catch (error) {
    console.error('Error fetching course by ID:', error)
    throw error
  }
}
const useFetchCourseByUserId = () => {
  return useQuery(['my-courses'], () => fetchCourseByUserId(), {})
}

export default useFetchCourseByUserId
