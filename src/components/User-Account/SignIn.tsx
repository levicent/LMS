import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-gray-900 text-center">
        Sign in to your account
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
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
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
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
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
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
          <a
            href="#"
            className="text-sm font-medium text-blue-500 hover:text-blue-700"
          >
            <Link to="/forgotpassword">Forgot password?</Link>
          </a>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          Sign in
        </button>
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
  );
};

export default SignIn;
