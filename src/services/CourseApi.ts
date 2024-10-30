import api from './api'

export const updateCourseById = async(id:string,data: any)=>{
    const response = await api.put(`/courses/${id}`,data);
    return response.data;
};

export const deleteCourseById = async( id : string)=>{
    const response = await api.delete(`/courses/${id}`);
    return response.data;
}

