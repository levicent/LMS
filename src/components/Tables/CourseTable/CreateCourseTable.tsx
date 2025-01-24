import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import api from "@/services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetUserId } from "@/hooks/useGetUserId";

// Dark theme configuration
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#90caf9',
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#90caf9',
            },
          },
        },
      },
    },
  },
});

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
  thumbnail: File | null;
}

interface CourseData extends FormValues { }

const CreateCourseTable: React.FC = () => {
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
    thumbnail: null,
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
    const { name, value, files } = e.target;
    if (name === "thumbnail" && files) {
      const selectedFile = files[0];
      setFormData((prev) => ({
        ...prev,
        thumbnail: selectedFile || null,
      }));
    } else if (name) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Submitted data", data);

    if (!Array.isArray(data.tags)) {
      data.tags = data.tags ? (data.tags as unknown as string).split(",") : [];
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", data.title);
    formDataToSubmit.append("description", data.description);
    formDataToSubmit.append("price", data.price);
    formDataToSubmit.append("duration", data.duration);
    formDataToSubmit.append("level", data.level);
    formDataToSubmit.append("category", data.category);
    formDataToSubmit.append("tags", data.tags.join(","));
    formDataToSubmit.append("language", data.language);
    formDataToSubmit.append("instructor", formData.instructor);

    if (formData.thumbnail) {
      formDataToSubmit.append("thumbnail", formData.thumbnail);
    }

    try {
      if (id) {
        await api.put(`/courses/${id}`, formDataToSubmit, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success("Course updated successfully");
      } else {
        await toast.promise(
          api.post(`/courses`, formDataToSubmit, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          {
            pending: "Creating course...",
            success: "Course created successfully",
            error: "Error creating course",
          }
        );
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("Error saving course");
      }
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: { xs: 2, sm: 4 },
          backgroundColor: 'bg.gray.700',
        }}
      >
        <ToastContainer theme="dark" />
        <Paper
          elevation={3}
          sx={{
            padding: { xs: 2, sm: 3, md: 4 },
            width: "100%",
            maxWidth: "900px",
            borderRadius: "10px",
            backgroundColor: 'bg.gray.700'
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ mb: { xs: 2, sm: 3, md: 4 } }}
          >
            {id ? "Edit Course" : "Create Course"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              "& .MuiTextField-root": { marginBottom: { xs: 1.5, sm: 2 } },
              "& .MuiFormControl-root": { marginBottom: { xs: 1.5, sm: 2 } },
            }}
          >
            <Grid container spacing={{ xs: 1.5, sm: 2 }}>
              <Grid item xs={12}>
                <TextField
                  {...register("title", { required: "Title is required" })}
                  label="Title"
                  variant="outlined"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  value={formData.title}
                  onChange={handleChange}
                  name="title"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("description", {
                    required: "Description is required",
                  })}
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  value={formData.description}
                  onChange={handleChange}
                  name="description"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("price", { required: "Price is required" })}
                  label="Price"
                  variant="outlined"
                  fullWidth
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  value={formData.price}
                  onChange={handleChange}
                  name="price"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("duration", { required: "Duration is required" })}
                  label="Duration (in hours)"
                  variant="outlined"
                  fullWidth
                  error={!!errors.duration}
                  helperText={errors.duration?.message}
                  value={formData.duration}
                  onChange={handleChange}
                  name="duration"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" error={!!errors.level}>
                  <InputLabel>Level</InputLabel>
                  <Select
                    {...register("level", { required: "Level is required" })}
                    label="Level"
                    value={formData.level}
                    onChange={handleChange}
                    name="level"
                  >
                    <MenuItem value="beginner">Beginner</MenuItem>
                    <MenuItem value="intermediate">Intermediate</MenuItem>
                    <MenuItem value="advanced">Advanced</MenuItem>
                  </Select>
                  {errors.level && (
                    <Typography variant="caption" color="error">
                      {errors.level.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  error={!!errors.category}
                >
                  <InputLabel>Category</InputLabel>
                  <Select
                    {...register("category", {
                      required: "Category is required",
                    })}
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
                    <MenuItem value="Health & Fitness">Health & Fitness</MenuItem>
                    <MenuItem value="Music">Music</MenuItem>
                    <MenuItem value="Teaching & Academics">
                      Teaching & Academics
                    </MenuItem>
                  </Select>
                  {errors.category && (
                    <Typography variant="caption" color="error">
                      {errors.category.message}
                    </Typography>
                  )}
                </FormControl>
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
                  {...register("language", { required: "Language is required" })}
                  label="Language"
                  variant="outlined"
                  fullWidth
                  error={!!errors.language}
                  helperText={errors.language?.message}
                  value={formData.language}
                  onChange={handleChange}
                  name="language"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Thumbnail
                </Typography>
                <input
                  type="file"
                  accept="image/*"
                  name="thumbnail"
                  onChange={handleChange}
                  style={{ display: "none" }}
                  id="thumbnail-upload"
                />
                <label htmlFor="thumbnail-upload">
                  <Button
                    variant="contained"
                    component="span"
                    sx={{ marginTop: 1 }}
                  >
                    Choose File
                  </Button>
                </label>
                {formData.thumbnail && (
                  <Typography variant="body2" sx={{ marginTop: 1 }}>
                    Selected file: {formData.thumbnail.name}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: { xs: 2, sm: 3 },
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth={true}
                sx={{ maxWidth: { sm: "200px" } }}
              >
                {id ? "Save Changes" : "Create Course"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider >
  );
};

export default CreateCourseTable;