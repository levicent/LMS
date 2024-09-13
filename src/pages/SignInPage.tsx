import React from "react";
import SignIn from "../components/User-Account/SignIn";
import ParticlesComponent from "../components/ParticleBackground/ParticleBackground";

const SignInPage: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Particles */}
      <ParticlesComponent id="tsparticles" className="absolute inset-0 z-0" />

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 p-8">
        <div className="flex flex-col justify-center text-center md:text-left space-y-6">
          <h1 className="text-white text-4xl font-bold">LMS by GWT</h1>
          <p className="text-white text-lg">
            Elevate your learning experience with LMS. Manage your courses,
            track your progress, and stay on top of your studies.
          </p>
        </div>

        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
