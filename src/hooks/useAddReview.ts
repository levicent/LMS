import { useMutation, useQueryClient } from 'react-query';
import api from '@/services/api';

const addReview = async ({ courseId, review }:any) => {
  const response = await api.post(`/courses/${courseId}/reviews`, review, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation(addReview, {
    onSuccess: () => {
      queryClient.invalidateQueries('course');
    },
  });
};