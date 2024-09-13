import React from "react";
import SignIn from "../components/User-Account/SignIn";

const SignInPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {" "}
      {/* Light gray background */}
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {/* Left Section: Brand Info */}
        <div className="flex flex-col justify-center text-center md:text-left space-y-6">
          <h1 className="text-black text-4xl font-bold">LMS by GWT</h1>{" "}
          {/* Black text */}
          <p className="text-black text-lg">
            Elevate your learning experience with LMS. Manage your courses,
            track your progress, and stay on top of your studies.
          </p>
        </div>

        {/* Right Section: Login Form */}
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          {" "}
          {/* White background for form */}
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
