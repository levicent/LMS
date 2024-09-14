import React from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import ParticleBackground from "../../components/ParticleBackground/ParticleBackground"; // Adjust the path based on your folder structure

interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPassword: React.FC = () => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>();

  // Form submit handler
  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = (data) => {
    console.log("Password reset email sent to:", data.email);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Content */}
      <div className="absolute w-full max-w-lg p-8 bg-white shadow-lg rounded-lg my-12 z-10">
        <h1 className="text-2xl font-extrabold text-gray-900 text-center mb-6">
          Forgot Password
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Enter your email and we'll send you a link to reset your password.
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
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
              className={`mt-2 block w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.email ? "border-red-500" : ""
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>

          {/* Back to Sign In */}
          <p className="text-sm text-center text-gray-500">
            Remember your password?{" "}
            <Link
              to="/signin"
              className="font-medium text-blue-500 hover:text-blue-700"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
