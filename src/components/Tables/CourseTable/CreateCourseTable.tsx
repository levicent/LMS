import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import VideoUploader from "@/components/VideoUploader/VideoUploader";

interface FormValues {
  title: string;
  description: string;
  price: number;
  instructor: string;
  duration: number;
  level: string;
  category: string;
  tags: string;
  language: string;
  video: File | null;
}

interface CourseData {
  title?: string;
  description?: string;
  price?: number;
  instructor?: string;
  duration?: number;
  level?: string;
  category?: string;
  tags?: string[];
  language?: string;
  video?: File | null;
}

export default function CreateOrEditCourseForm({ courseData = {}, id }: { courseData?: CourseData, id?: string }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormValues>({
    title: courseData.title || "",
    description: courseData.description || "",
    price: courseData.price || 0,
    instructor: courseData.instructor || "",
    duration: courseData.duration || 0,
    level: courseData.level || "",
    category: courseData.category || "",
    tags: courseData.tags?.join(",") || "",
    language: courseData.language || "English",
    video: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVideoUpload = (file: File) => {
    setFormData((prev) => ({
      ...prev,
      video: file,
    }));
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const courseDataWithTags = {
        ...data,
        tags: data.tags.split(","),
      };
      const formDataToSubmit = new FormData();
      Object.entries(courseDataWithTags).forEach(([key, value]) => {
        if (key === 'tags') {
          formDataToSubmit.append(key, (value as string[]).join(','));
        } else if (value !== null) {
          formDataToSubmit.append(key, value as string | Blob);
        }
      });
  
      let response;
      if (id) {
        response = await axios.put(
          `/api/courses/${id}`,
          formDataToSubmit,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Course updated successfully");
      } else {
        response = await axios.post(
          `/api/courses`,
          formDataToSubmit,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Course created successfully");
      }
  
      // Extract the course ID from the response
      const newCourseId = response.data.id; // Adjust based on your API's response structure
  
      // Navigate to the video upload page
      navigate(`/courses/${newCourseId}/upload`);
    } catch (error) {
      toast.error("Error saving course");
    }
  };
  

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <ToastContainer />
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{id ? "Edit Course" : "Create Course"}</CardTitle>
            <Button variant="ghost" onClick={() => navigate("/admin/dashboard")} aria-label="Close">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  {...register("title", { required: "Course Title is required" })}
                  value={formData.title}
                  onChange={handleChange}
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  {...register("price", { required: "Price is required" })}
                  value={formData.price}
                  onChange={handleChange}
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description", { required: "Description is required" })}
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor ID</Label>
                <Select
                  onValueChange={(value) => handleSelectChange("instructor", value)}
                  defaultValue={formData.instructor}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Instructor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instructor1">Instructor 1</SelectItem>
                    <SelectItem value="instructor2">Instructor 2</SelectItem>
                    <SelectItem value="instructor3">Instructor 3</SelectItem>
                  </SelectContent>
                </Select>
                {errors.instructor && <p className="text-red-500 text-sm">{errors.instructor.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (hours)</Label>
                <Input
                  id="duration"
                  type="number"
                  {...register("duration", { required: "Duration is required" })}
                  value={formData.duration}
                  onChange={handleChange}
                />
                {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select
                  onValueChange={(value) => handleSelectChange("level", value)}
                  defaultValue={formData.level}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                {errors.level && <p className="text-red-500 text-sm">{errors.level.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  {...register("category", { required: "Category is required" })}
                  value={formData.category}
                  onChange={handleChange}
                />
                {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                {...register("tags", { required: "Tags are required" })}
                value={formData.tags}
                onChange={handleChange}
              />
              {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                {...register("language", { required: "Language is required" })}
                value={formData.language}
                onChange={handleChange}
              />
              {errors.language && <p className="text-red-500 text-sm">{errors.language.message}</p>}
            </div>
            {/* <div className="space-y-2">
              <Label>Upload Course Video</Label>
              <VideoUploader onVideoUpload={handleVideoUpload} />
            </div> */}
            <Button type="submit" className="w-full">
              {id ? "Save Changes" : "Create Course"}
            </Button> 
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
