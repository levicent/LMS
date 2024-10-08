import React from "react";
import { AuthProvider } from "./context/authContext";
import { ThemeProvider } from "./context/themeContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/Homepage";
import SignInPage from "./pages/Authentication/SignInPage";
import SignupPage from "./pages/Authentication/SignUpPage";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import { ToastContainer } from "react-toastify";
import InstructorDashboard from "./pages/Dashboard/InstructorDashboard";
import "react-toastify/dist/ReactToastify.css";
import AccountSettings from "./pages/AccountSettings";
import CourseInfo from "./pages/CourseInfo";
import { CartProvider } from "./context/cartContext";
import BillingInfo from "./pages/BillingInfo";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import LearningDashboard from "./pages/LearningDashboard";
import ContactPage from "./pages/ContactPage";
import PrivateRoutes from "./routes/PrivateRoutes";
import CreateUsersTablePage from "./pages/Dashboard/Tables/CreateUsersTablePage";
import CourseDashboard from "./pages/Dashboard/CourseDashboard";
import VideoUploadDashboard from "./pages/Dashboard/VideoUploadDashboard";
import CourseSearchResult from "./pages/CourseSearchResult";

const CourseInfoWrapper = () => {
  const location = useLocation();
  const course = location.state?.course;

  if (!course) {
    return <div>Course not found</div>;
  }

  return <CourseInfo course={course} />;
};

const App: React.FC = () => {
  return (
    <div className="bg-white text-black">
      <ThemeProvider>
        <CartProvider>
          <ToastContainer />
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/profile" element={<AccountSettings />} />
                <Route path="/course/:id" element={<CourseInfoWrapper />} />
                <Route path="/billing" element={<BillingInfo />} />
                <Route path="/my-courses" element={<LearningDashboard />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route
                  path="/course-search-result"
                  element={<CourseSearchResult />}
                />
                <Route
                  path="/instructor/dashboard"
                  element={<InstructorDashboard />}
                />
                <Route
                  path="/instructor/dashboard/videoDashboard"
                  element={<VideoUploadDashboard />}
                />
                <Route
                  path="/instructor/dashboard/courses"
                  element={<CourseDashboard />}
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
            </AuthProvider>
          </Router>
        </CartProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
