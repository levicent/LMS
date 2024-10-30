import { useMutation, useQueryClient } from 'react-query';
import { deleteCourseById } from '@/services/CourseApi';

const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => deleteCourseById(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('courses'); // Invalidate courses query to refetch updated data
      },
    }
  );
};

export default useDeleteCourse;