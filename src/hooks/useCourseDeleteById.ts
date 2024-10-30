import { useMutation, useQueryClient } from 'react-query';
import { deleteCourseById } from '@/services/CourseApi';

const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => deleteCourseById(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('courses');
      },
    }
  );
};

export default useDeleteCourse;