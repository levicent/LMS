import { useMutation, useQueryClient } from 'react-query';
import {updateCourseById} from '@/services/CourseApi'

const  useUpdateCourse =()=>{
    const queryclient =useQueryClient();
    return useMutation(
        ({ id, data }: { id: string; data: any }) => updateCourseById(id, data),
        {
          onSuccess: () => {
            queryclient.invalidateQueries('courses'); // Invalidate courses query to refetch updated data
          },
        }
      );
}
export default useUpdateCourse;