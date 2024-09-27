import { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  MenuItem,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  ideo?: File | null;
}

const CreateOrEditCourseForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const courseData: CourseData = location.state?.course || {};

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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as keyof FormValues]: value,
    }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      video: file, // Update the video file in state
    }));
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Handle tags conversion from string to array
      const courseDataWithTags = {
        ...data,
        tags: data.tags.split(","),
      };
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("title", courseDataWithTags.title);
      formDataToSubmit.append("description", courseDataWithTags.description);
      formDataToSubmit.append("price", String(courseDataWithTags.price));
      formDataToSubmit.append("instructor", courseDataWithTags.instructor);
      formDataToSubmit.append("duration", String(courseDataWithTags.duration));
      formDataToSubmit.append("level", courseDataWithTags.level);
      formDataToSubmit.append("category", courseDataWithTags.category);
      formDataToSubmit.append("tags", courseDataWithTags.tags.join(","));
      formDataToSubmit.append("language", courseDataWithTags.language);

      // Add the video file if available
      if (formData.video) {
        formDataToSubmit.append("video", formData.video);
      }

      if (id) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/courses/${id}`,
          formDataToSubmit,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Course updated successfully");
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/courses`,
          formDataToSubmit,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Course created successfully");
      }
      navigate("/courses");
    } catch (error: any) {
      toast.error("Error saving course");
    }
  };

  return (
    <div>
      <ToastContainer />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: "30px",
            width: "100%",
            maxWidth: "900px",
            borderRadius: "10px",
          }}
        >
          <div className="flex justify-between items-center">
            <Typography variant="h5" gutterBottom>
              {id ? "Edit Course" : "Create Course"}
            </Typography>
            <IconButton
              onClick={() => navigate("/admin/dashboard")}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
          </div>
          <Box
            className="my-2 mx-2 py-2 px-1"
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              "& .MuiTextField-root": { marginBottom: "20px" },
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("title", { required: true })}
                  label="Course Title"
                  variant="outlined"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title ? "Course Title is required" : ""}
                  value={formData.title}
                  onChange={handleChange}
                  name="title"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("price", { required: true })}
                  label="Price"
                  variant="outlined"
                  fullWidth
                  error={!!errors.price}
                  helperText={errors.price ? "Price is required" : ""}
                  value={formData.price}
                  onChange={handleChange}
                  name="price"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("description", { required: true })}
                  label="Description"
                  variant="outlined"
                  multiline
                  fullWidth
                  error={!!errors.description}
                  helperText={
                    errors.description ? "Description is required" : ""
                  }
                  value={formData.description}
                  onChange={handleChange}
                  name="description"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  error={!!errors.instructor}
                >
                  <InputLabel id="instructor-label">Instructor ID</InputLabel>
                  <Select
                    {...register("instructor", { required: true })}
                    labelId="instructor-label"
                    label="Instructor ID"
                    value={formData.instructor}
                    onChange={handleChange}
                    name="instructor"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="instructor1">Instructor 1</MenuItem>
                    <MenuItem value="instructor2">Instructor 2</MenuItem>
                    <MenuItem value="instructor3">Instructor 3</MenuItem>
                    {/* Add more instructors as needed */}
                  </Select>
                  {errors.instructor && (
                    <FormHelperText>Instructor ID is required</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("duration", { required: true })}
                  label="Duration (hours)"
                  variant="outlined"
                  fullWidth
                  error={!!errors.duration}
                  helperText={errors.duration ? "Duration is required" : ""}
                  value={formData.duration}
                  onChange={handleChange}
                  name="duration"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  error={!!errors.level}
                >
                  <InputLabel>Level</InputLabel>
                  <Select
                    {...register("level", { required: true })}
                    label="Level"
                    value={formData.level}
                    onChange={handleChange}
                    name="level"
                  >
                    <MenuItem value="beginner">Beginner</MenuItem>
                    <MenuItem value="intermediate">Intermediate</MenuItem>
                    <MenuItem value="advanced">Advanced</MenuItem>
                  </Select>
                </FormControl>
                {errors.level && (
                  <Typography variant="caption" color="error">
                    Level is required
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("category", { required: true })}
                  label="Category"
                  variant="outlined"
                  fullWidth
                  error={!!errors.category}
                  helperText={errors.category ? "Category is required" : ""}
                  value={formData.category}
                  onChange={handleChange}
                  name="category"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("tags", { required: true })}
                  label="Tags (comma-separated)"
                  variant="outlined"
                  fullWidth
                  error={!!errors.tags}
                  helperText={errors.tags ? "Tags are required" : ""}
                  value={formData.tags}
                  onChange={handleChange}
                  name="tags"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("language", { required: true })}
                  label="Language"
                  variant="outlined"
                  fullWidth
                  error={!!errors.language}
                  helperText={errors.language ? "Language is required" : ""}
                  value={formData.language}
                  onChange={handleChange}
                  name="language"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Upload Course Video</Typography>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  name="video"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              sx={{ alignSelf: "flex-end", mt: 2 }}
            >
              {id ? "Save Changes" : "Create"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default CreateOrEditCourseForm;
