import api from '@/services/api';
import { useQuery, useMutation, useQueryClient } from 'react-query';

// Fetch comments function
const fetchComments = async (courseId: string, sectionId: string, videoId: string) => {
  const response = await api.get(`/courses/${courseId}/sections/${sectionId}/videos/${videoId}/comments`);
  console.log('Fetched comments:', response.data);
  return response.data;
};

// Add comment function
const addComment = async (courseId: string, sectionId: string, videoId: string, comment: string) => {
  const response = await api.post(`/courses/${courseId}/sections/${sectionId}/videos/${videoId}/comments`, { comment });
  console.log('Added comment:', response.data);
  return response.data;
};

// Delete comment function
const deleteComment = async (courseId: string, sectionId: string, videoId: string, commentId: string) => {
  const response = await api.delete(`/courses/${courseId}/sections/${sectionId}/videos/${videoId}/comments/${commentId}`);
  console.log('Deleted comment:', response.data);
  return response.data;
};

// Hook to fetch comments
export const useFetchComments = (courseId: string, sectionId: string, videoId: string) => {
  return useQuery(['comments', courseId, sectionId, videoId], () => fetchComments(courseId, sectionId, videoId));
};

// Hook to add a comment
export const useAddComment = (courseId: string, sectionId: string, videoId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (comment: string) => addComment(courseId, sectionId, videoId, comment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', courseId, sectionId, videoId]);
      },
    }
  );
};

// Hook to delete a comment
export const useDeleteComment = (courseId: string, sectionId: string, videoId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (commentId: string) => deleteComment(courseId, sectionId, videoId, commentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', courseId, sectionId, videoId]);
      },
    }
  );
};