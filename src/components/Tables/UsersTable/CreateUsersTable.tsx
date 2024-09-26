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
  MenuItem,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: string;
  password?: string;
}

interface UserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: string;
  password?: string;
}

const CreateUsersTable: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const userData: UserData = location.state?.user || {};

  const [formData, setFormData] = useState<FormValues>({
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
    email: userData.email || "",
    phone: userData.phone || "",
    role: userData.role || "",
    password: userData.password || "",
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
      [name as keyof FormValues]: value as string,
    }));
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Submitted data", data);
    try {
      if (id) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/users/${id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("User updated successfully");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success("User created successfully");
      }
      navigate("/admin/dashboard");
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("Error saving user");
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
              {id ? "Edit User" : "Create User"}
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
                  {...register("firstName", { required: true })}
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName ? "First Name is required" : ""}
                  value={formData.firstName}
                  onChange={handleChange}
                  name="firstName"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("lastName", { required: true })}
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName ? "Last Name is required" : ""}
                  value={formData.lastName}
                  onChange={handleChange}
                  name="lastName"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("email", { required: true })}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email ? "Email is required" : ""}
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("phone", { required: true })}
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone ? "Phone is required" : ""}
                  value={formData.phone}
                  onChange={handleChange}
                  name="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" error={!!errors.role}>
                  <InputLabel>Role</InputLabel>
                  <Select
                    {...register("role", { required: true })}
                    label="Role"
                    value={formData.role}
                    onChange={handleChange}
                    name="role"
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="teacher">Teacher</MenuItem>
                  </Select>
                </FormControl>
                {errors.role && (
                  <Typography variant="caption" color="error">
                    Role is required
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password", {
                    required: !id, // Require password only when creating a new user
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={!!errors.password}
                  helperText={
                    errors.password
                      ? errors.password.message || "Password is required"
                      : ""
                  }
                  value={formData.password}
                  disabled={Boolean(id)}
                  onChange={handleChange}
                  name="password"
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

export default CreateUsersTable;
