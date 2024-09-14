import React, { useState, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ParticlesComponent from "../../components/ParticleBackground/ParticleBackground";
import AuthContext from "../../context/authContext";

type FormValues = {
  email: string;
  password: string;
};

const SignInPage: React.FC = () => {
  // const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { login } = authContext;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    login(data);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Particles */}
      <ParticlesComponent id="tsparticles" className="absolute inset-0 z-0" />

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column for Text */}
          <div className="text-white space-y-6">
            <h1 className="text-4xl font-bold">LMS by GWT</h1>
            <p className="text-lg">
              Elevate your learning experience with LMS. Manage your courses,
              track your progress, and stay on top of your studies.
            </p>
          </div>

          {/* Right Column for Sign In Form */}
          <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 space-y-6">
            <h1 className="text-2xl font-extrabold text-gray-900 text-center">
              Sign in to your account
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Input Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your email
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email format",
                    },
                  })}
                  id="email"
                  type="email"
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Input Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must have at least 6 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must have at most 20 characters",
                    },
                  })}
                  id="password"
                  type="password"
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-500"
                  >
                    Remember me
                  </label>
                </div>

                <Link
                  to="/forgotpassword"
                  className="text-sm font-medium text-blue-500 hover:text-blue-700"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition"
              >
                Sign in
              </button>

              {/* Sign Up Link */}
              <p className="text-sm text-center text-gray-500">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-blue-500 hover:text-blue-700"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
