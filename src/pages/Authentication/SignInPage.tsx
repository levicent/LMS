import React, { useState } from "react";
import { Link } from "react-router-dom";
import ParticlesComponent from "../../components/ParticleBackground/ParticleBackground";

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({
    email: "",
    password: "",
  });

  // Helper function to validate email format
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Function to validate the fields
  const validateFields = () => {
    const newErrors: { email?: string; password?: string } = {};

    // Validate email field
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format.";
    }

    // Validate password field
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    return newErrors;
  };

  // Function to handle field validation
  const handleFieldValidation = (field: string) => {
    const newErrors = { ...errors };

    if (field === "email") {
      if (!email) {
        newErrors.email = "Email is required.";
      } else if (!validateEmail(email)) {
        newErrors.email = "Invalid email format.";
      } else {
        delete newErrors.email;
      }
    }

    if (field === "password") {
      if (!password) {
        newErrors.password = "Password is required.";
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters.";
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
  };

  // Handle blur event
  const handleBlur = (field: string) => {
    handleFieldValidation(field);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateFields();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors and proceed with form submission if validation passes
    setErrors({});
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
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
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Input Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`mt-2 block w-full px-4 py-3 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleFieldValidation("email");
                  }}
                  onBlur={() => handleBlur("email")}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
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
                  id="password"
                  type="password"
                  className={`mt-2 block w-full px-4 py-3 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handleFieldValidation("password");
                  }}
                  onBlur={() => handleBlur("password")}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
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
