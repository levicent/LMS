import React from "react";
import { AuthProvider } from "./context/authContext";
import { ThemeProvider } from "./context/themeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import SignInPage from "./pages/Authentication/SignInPage";
import SignupPage from "./pages/Authentication/SignUpPage";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ProfilePage from "./pages/ProfilePage";
import AccountSettings from "./pages/AccountSettings";
import CourseInfo from "./pages/CourseInfo";
import { CartProvider } from "./context/cartContext";
import BillingInfo from "./pages/BillingInfo";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import LearningDashboard from "./pages/LearningDashboard";
import ContactPage from "./pages/ContactPage";

const App: React.FC = () => {
  return (
    <div className="bg-white text-black">
      <AuthProvider>
        <ThemeProvider>
          <CartProvider>
            <ToastContainer />
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                {/* <Route path="/profile" element={<ProfilePage />} /> */}
                <Route path="/profile" element={<AccountSettings />} />
                <Route path="/course" element={<CourseInfo />} />
                <Route path="/billing" element={<BillingInfo />} />
                <Route path="/my-courses" element={<LearningDashboard />} />
                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </Router>
          </CartProvider>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
