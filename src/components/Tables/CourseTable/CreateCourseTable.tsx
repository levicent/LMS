import { useState, useEffect } from "react";
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
  MenuItem,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetUserId } from "@/hooks/useGetUserId";

interface FormValues {
  title: string;
  description: string;
  instructor: string;
  price: string;
  duration: string;
  level: string;
  category: string;
  tags: string[];
  language: string;
}

interface CourseData extends FormValues {}

const CreateCourseTable: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const courseData: CourseData = location.state?.course || {};

  const { userId } = useGetUserId();

  const [formData, setFormData] = useState<FormValues>({
    title: courseData.title || "",
    description: courseData.description || "",
    instructor: courseData.instructor || "",
    price: courseData.price || "",
    duration: courseData.duration || "",
    level: courseData.level || "beginner",
    category: courseData.category || "Development",
    tags: courseData.tags || [],
    language: courseData.language || "",
  });

  useEffect(() => {
    if (userId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        instructor: userId,
      }));
    }
  }, [userId]);

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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Submitted data", data);
    const courseData = {
      ...data,
      instructor: formData.instructor,
    };

    if (!Array.isArray(data.tags)) {
      data.tags = data.tags ? (data.tags as unknown as string).split(",") : [];
    }
    try {
      if (id) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/courses/${id}`,
          courseData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Course updated successfully");
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/courses`,
          courseData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Course created successfully");
      }
      navigate("/instructor/dashboard");
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("Error saving course");
      }
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
              onClick={() => navigate("/admin/courses")}
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
              <Grid item xs={12}>
                <TextField
                  {...register("title", { required: true })}
                  label="Title"
                  variant="outlined"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title ? "Title is required" : ""}
                  value={formData.title}
                  onChange={handleChange}
                  name="title"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("description", { required: true })}
                  label="Description"
                  variant="outlined"
                  fullWidth
                  error={!!errors.description}
                  helperText={
                    errors.description ? "Description is required" : ""
                  }
                  value={formData.description}
                  onChange={handleChange}
                  name="description"
                  multiline
                  rows={4}
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
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("duration", { required: true })}
                  label="Duration (in hours)"
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
                <FormControl
                  fullWidth
                  variant="outlined"
                  error={!!errors.category}
                >
                  <InputLabel>Category</InputLabel>
                  <Select
                    {...register("category", { required: true })}
                    label="Category"
                    value={formData.category}
                    onChange={handleChange}
                    name="category"
                  >
                    <MenuItem value="Development">Development</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                    <MenuItem value="Finance & Accounting">
                      Finance & Accounting
                    </MenuItem>
                    <MenuItem value="IT & Software">IT & Software</MenuItem>
                    <MenuItem value="Personal Development">
                      Personal Development
                    </MenuItem>
                    <MenuItem value="Design">Design</MenuItem>
                    <MenuItem value="Marketing">Marketing</MenuItem>
                    <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                    <MenuItem value="Photography & Video">
                      Photography & Video
                    </MenuItem>
                    <MenuItem value="Health & Fitness">
                      Health & Fitness
                    </MenuItem>
                    <MenuItem value="Music">Music</MenuItem>
                    <MenuItem value="Teaching & Academics">
                      Teaching & Academics
                    </MenuItem>
                  </Select>
                </FormControl>
                {errors.category && (
                  <Typography variant="caption" color="error">
                    Category is required
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("tags")}
                  label="Tags (comma-separated)"
                  variant="outlined"
                  fullWidth
                  value={formData.tags.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tags: e.target.value.split(",").map((tag) => tag.trim()),
                    })
                  }
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

export default CreateCourseTable;
