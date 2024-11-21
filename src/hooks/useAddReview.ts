import { useMutation, useQueryClient } from 'react-query';
import api from '@/services/api';

interface ReviewData {
  userId: string;
  rating: number;
  review: string;
  courseId: string;
}

const addReview = async (reviewData: ReviewData) => {
  const { courseId, ...data } = reviewData;
  const response = await api.post(`courses/${courseId}/reviews`, data);
  return response.data;
};

export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation(addReview, {
    onSuccess: () => {
      queryClient.invalidateQueries('courseReviews');
    },
    onError: (error: any) => {
      console.error('Error adding review:', error);
    },
  });
};