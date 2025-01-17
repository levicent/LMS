import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ParticlesComponent from "../../components/ParticleBackground/ParticleBackground";
import AuthContext from "@/context/authContext";
import { useSignupMutation } from "../../hooks/useSignupMutation";
import { toast } from "react-toastify";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword?: string;
}
interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { setIsAuthenticated } = authContext;
  const passwordValue = watch("password");
  const { mutateAsync: SignupMutation } = useSignupMutation({
    onSuccess: (data) => {
      console.log("Data", data);
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      navigate("/");
    },
    onError: (error) => {
      console.error("Error signing up:", error);
    },
  });

  const onSubmit = async (data: FormData) => {
    const { confirmPassword, password, ...rest } = data;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    await toast.promise(SignupMutation({ ...rest, password }), {
      pending: "Signing up",
      success: "Signed up successfully",
      error: {
        render({ data }: { data: AxiosError<ApiErrorResponse> | Error }) {
          if (data instanceof Error) {
            if ("response" in data) {
              return data.response?.data?.message || "Signup failed";
            }
            return data.message || "Signup failed";
          }
          return "An unexpected error occurred";
        },
      },
    });
  };

  const password = watch("password", "");
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-100">
      {/* Background Particles */}
      <ParticlesComponent id="tsparticles" className="absolute inset-0 z-0" />

      <div className="relative z-10 w-full max-w-lg p-8 bg-white shadow-lg rounded-xl border border-gray-300">
        <h1 className="text-2xl font-extrabold text-gray-900 text-center mb-6">
          Create an Account
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                {...register("firstName", {
                  required: "First name is required.",
                })}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                {...register("lastName", {
                  required: "Last name is required.",
                })}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                } rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format.",
                },
              })}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone", {
                required: "Phone number is required.",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Invalid phone number.",
                },
              })}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters.",
                },
              })}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
           {passwordValue && (
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeOff className="h-5 w-5" />
                    )}
                  </button>
                )}
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.password.message}
                  </p>
                )}
              </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "Confirm password is required.",
                validate: (value) =>
                  value === password || "Passwords do not match.",
              })}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>

          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-blue-500 hover:text-blue-700"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
