import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

interface VideoDetails {
  title: string;
  description: string;
  video: File | null;
}

interface FormValues {
  videos: VideoDetails[];
}

export default function UploadVideosPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();
  const [videoSections, setVideoSections] = useState<VideoDetails[]>([
    { title: "", description: "", video: null },
  ]);

  
    const handleVideoChange = (
      index: number,
      field: 'title' | 'description' | 'video',
      value: string | File | null
    ) => {
      const updatedVideos = [...videoSections];
      updatedVideos[index] = {
        ...updatedVideos[index],
        [field]: value,
      };
      setVideoSections(updatedVideos);
    
      // Set the value in the react-hook-form state for validation if needed
      if (field === "title" || field === "description") {
        setValue(`videos.${index}.${field}` as `videos.${number}.title` | `videos.${number}.description`, value as string);
      } else if (field === "video" && value instanceof File) {
        setValue(`videos.${index}.${field}`, value);
      }
    };
    
  

  const addVideoSection = () => {
    setVideoSections([
      ...videoSections,
      { title: "", description: "", video: null },
    ]);
  };

  const removeVideoSection = (index: number) => {
    setVideoSections(videoSections.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<FormValues> = async () => {
    const formData = new FormData();
    videoSections.forEach((video, index) => {
      formData.append(`videos[${index}][title]`, video.title);
      formData.append(`videos[${index}][description]`, video.description);
      if (video.video) {
        formData.append(`videos[${index}][file]`, video.video);
      }
    });

    try {
      // Replace with the actual course ID and API endpoint
      const courseId = "someCourseId";
      await axios.post(`/api/courses/${courseId}/videos`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Videos uploaded successfully");
      navigate(`/courses/${courseId}`);
    } catch (error) {
      toast.error("Failed to upload videos");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <ToastContainer />
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Upload Course Videos</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {videoSections.map((video, index) => (
              <div key={index} className="space-y-4 border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium">Video {index + 1}</h2>
                  {index > 0 && (
                    <Button
                      variant="ghost"
                      onClick={() => removeVideoSection(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`videoTitle${index}`}>Video Title</Label>
                  <Input
                    id={`videoTitle${index}`}
                    value={video.title}
                    onChange={(e) =>
                      handleVideoChange(index, "title", e.target.value)
                    }
                  />
                  {errors.videos?.[index]?.title && (
                    <p className="text-red-500 text-sm">
                      {errors.videos[index]?.title?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`videoDescription${index}`}>
                    Video Description
                  </Label>
                  <Textarea
                    id={`videoDescription${index}`}
                    value={video.description}
                    onChange={(e) =>
                      handleVideoChange(index, "description", e.target.value)
                    }
                  />
                  {errors.videos?.[index]?.description && (
                    <p className="text-red-500 text-sm">
                      {errors.videos[index]?.description?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`videoFile${index}`}>Upload Video</Label>
                  <Input
                    id={`videoFile${index}`}
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                      handleVideoChange(
                        index,
                        "video",
                        e.target.files ? e.target.files[0] : null
                      )
                    }
                  />
                  {errors.videos?.[index]?.video && (
                    <p className="text-red-500 text-sm">
                      {errors.videos[index]?.video?.message}
                    </p>
                  )}
                </div>
              </div>
            ))}

            <Button type="button" variant="outline" onClick={addVideoSection}>
              Add Another Video
            </Button>

            <Button type="submit" className="w-full mt-4">
              Upload Videos
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
