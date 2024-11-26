import { useMutation } from 'react-query';
import api from '@/services/api';

interface ReviewInput {
  courseId: string;
  rating: number;
  review: string;
 
}

interface UserDetails {
  _id: string;
  firstName: string;
  lastName: string;
}

interface AddedReview {
  user: UserDetails;
  rating: number;
  review: string;
  _id: string;
}

interface ApiResponse {
  message: string;
  addedReview: AddedReview;
}
const addReview = async ({ courseId, rating, review }: ReviewInput) => {
  const response = await api.post<ApiResponse>(`/courses/${courseId}/reviews`, { rating, review });
  return response.data;
};
export const useAddReview = () => {
  return useMutation<ApiResponse, Error, ReviewInput>(addReview, {
    onSuccess: (data) => {
      
      const { firstName, lastName } = data.addedReview.user;
      console.log('Review added by:', firstName, lastName);
    },
    onError: (error) => {
      console.error('Error adding review:', error.message);
    },
  });
};