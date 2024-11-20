import { useMutation, useQueryClient } from 'react-query';
import api from '@/services/api';
const deleteReview = async ({ courseId, reviewId }: { courseId: string; reviewId: string }) => {
  const response = await api.delete(`/courses/${courseId}/reviews/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, 
    },
  });
  return response.data;
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteReview, {
    onSuccess: () => {
      queryClient.invalidateQueries('course'); 
    },
  });
};