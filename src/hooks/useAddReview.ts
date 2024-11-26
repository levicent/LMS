import { useMutation } from 'react-query';
import api from '@/services/api';

const addReview = async ({ courseId, rating, review }:any) => {
  const response = await api.post(`/courses/${courseId}/reviews`, { rating, review });
  return response.data; 
};

export const useAddReview = () => {
  return useMutation(addReview, {
    onSuccess: (data) => {
      console.log('Review added successfully:', data);
    },
    onError: (error:any) => {
      console.error('Error adding review:', error.response?.data || error.message);
    },
  });
};
