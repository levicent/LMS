import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import SignInPage from "./pages/SignInPage";
import Signup from "./components/User-Account/SignUp";
import ForgotPassword from "./components/User-Account/ForgotPassword";

const App: React.FC = () => {
  return (
    <div className="bg-white text-black">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
