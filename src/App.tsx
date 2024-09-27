import React from "react";
import { AuthProvider } from "./context/authContext";
import { ThemeProvider } from "./context/themeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import SignInPage from "./pages/Authentication/SignInPage";
import SignupPage from "./pages/Authentication/SignUpPage";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import { ToastContainer } from "react-toastify";
import InstructorDashboard from "./pages/Dashboard/InstructorDashboard";
import "react-toastify/dist/ReactToastify.css";
// import ProfilePage from "./pages/ProfilePage";
import AccountSettings from "./pages/AccountSettings";
import CourseInfo from "./pages/CourseInfo";
import { CartProvider } from "./context/cartContext";
import BillingInfo from "./pages/BillingInfo";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import LearningDashboard from "./pages/LearningDashboard";
import ContactPage from "./pages/ContactPage";
import PrivateRoutes from "./routes/PrivateRoutes";
import CreateUsersTablePage from "./pages/Dashboard/Tables/CreateUsersTablePage";
import VideoUploadDashboard from "./pages/Dashboard/VideoUploadDashboard";
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
                <Route path="/contact" element={<ContactPage />} />
                <Route
                  path="/instructorDashboard"
                  element={<InstructorDashboard />}
                />
                <Route
                  path="/videoDashboard"
                  element={<VideoUploadDashboard />}
                />


                {/* Admin Routes */}

                <Route
                  path="/admin/dashboard"
                  element={<PrivateRoutes element={<AdminDashboard />} />}
                />
                <Route
                  path="/admin/dashboard/user/create"
                  element={<PrivateRoutes element={<CreateUsersTablePage />} />}
                />
                <Route
                  path="/admin/dashboard/user/edit/:id"
                  element={<PrivateRoutes element={<CreateUsersTablePage />} />}
                />
              </Routes>
            </Router>
          </CartProvider>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
