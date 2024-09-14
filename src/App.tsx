import React from "react";
import { AuthProvider } from "./context/authContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import SignInPage from "./pages/Authentication/SignInPage";
import SignupPage from "./pages/Authentication/SignUpPage";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <div className="bg-white text-black">
      <AuthProvider>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
