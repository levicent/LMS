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
import AccountSettings from "./pages/AccountSettings";
import CourseInfo from "./pages/CourseInfo";
import { CartProvider } from "./context/cartContext";
import BillingInfo from "./pages/BillingInfo";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import UsersTable from "./components/Tables/UsersTable/UsersTable.tsx";
import LearningDashboard from "./pages/LearningDashboard";
import ContactPage from "./pages/ContactPage";
import PrivateRoutes from "./routes/PrivateRoutes";
import { InstructorPrivateRoutes } from "./routes/PrivateRoutes";
import CreateUsersTablePage from "./pages/Dashboard/Tables/CreateUsersTablePage";
import CourseDashboard from "./pages/Dashboard/CourseDashboard";
import VideoUploadDashboard from "./pages/Dashboard/VideoUploadDashboard";
import CourseLearningPage from "./pages/CourseLearningPage";
import SearchResults from "./components/SearchBar/SearchResults";
import ShoppingCart from "./pages/ShoppingCart";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import NoPath from "./pages/NoPathThere";
import { Stats } from "./pages/Dashboard/InstructorDashboard";
import DonorPage from "./pages/DonorPage.tsx";
import InstructorsPage from "./pages/InstructorsPage.tsx";
import AddSectionForm from "./components/Tables/CourseTable/CreateSection.tsx";
import CourseView from "./pages/CourseView.tsx";
import VideoUploadPage from "./pages/VideoUploadPage.tsx";
import TermsOfService from "./pages/TermsofService.tsx";
import VideoPage from "./pages/VideoPage.tsx";
import CategoryPage from "./components/Categories/categoryPage.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import PDFPage from "./pages/PDFPage.tsx";
import DonorDashboard from "./pages/Temp.tsx";
import { LiveStreamInterface } from "./pages/Demo.tsx";
import MessagingInterface from "./pages/MsgInterface.tsx";
import EmployerDashboard from "./pages/EmployeeDash.tsx";
import EmployeeList from "./pages/EmployeeList.tsx";
import NotificationPage from "./pages/Notification.tsx";
const App: React.FC = () => {
  return (
    <div className="bg-white text-black">
      <ThemeProvider>
        <CartProvider>
          <ToastContainer />
          <Router>
            <AuthProvider>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/profile" element={<ProtectedRoutes element={<AccountSettings />} />} />
                <Route path="/courses/:id" element={<CourseInfo />} />
                <Route path="/billing" element={<BillingInfo />} />
                <Route path="/my-courses" element={<ProtectedRoutes element={<LearningDashboard />} />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/policy" element={<PrivacyPolicy />} />
                <Route
                  path="courses/category/:category"
                  element={<CategoryPage />}
                />

                <Route
                  path="/course/enrolled/:courseId"
                  element={<CourseLearningPage />}
                />
                <Route
                  path="/demo1"
                  element={<DonorDashboard />}
                />
                <Route
                  path="/demo2"
                  element={<LiveStreamInterface />}
                />
                <Route
                  path="/demo3"
                  element={<MessagingInterface />}
                />
                <Route
                  path="/demo4"
                  element={<EmployerDashboard />}
                />
                <Route
                  path="/demo5"
                  element={<EmployeeList />}
                />

                <Route
                  path="/notifications"
                  element={<NotificationPage />}
                />
                <Route path="/course/:courseId/learn" element={<VideoPage />} />
                <Route path="/donors" element={<DonorPage />} />
                <Route path="*" element={<NoPath />} />
                <Route
                  path="/instructors"
                  element={
                    <InstructorsPage />
                  }
                />
                <Route
                  path="/instructor/dashboard"
                  element={
                    <InstructorPrivateRoutes
                      element={<InstructorDashboard />}
                    />
                  }
                />
                <Route
                  path="/instructor/dashboard/videoDashboard"
                  element={
                    <InstructorPrivateRoutes
                      element={<VideoUploadDashboard />}
                    />
                  }
                />
                <Route
                  path="/instructor/dashboard/stats"
                  element={<InstructorPrivateRoutes element={<Stats />} />}
                />
                <Route
                  path="/instructor/dashboard/courses"
                  element={
                    <InstructorPrivateRoutes element={<CourseDashboard />} />
                  }
                />
                <Route
                  path="/add-section/:courseId"
                  element={
                    <InstructorPrivateRoutes element={<AddSectionForm />} />
                  }
                />
                <Route
                  path="/edit-section/:courseId/sections/:sectionId"
                  element={
                    <InstructorPrivateRoutes element={<AddSectionForm />} />
                  }
                />
                <Route
                  path="instructor/dashboard/course/:courseId"
                  element={<InstructorPrivateRoutes element={<CourseView />} />}
                />
                <Route
                  path="/courses/:courseId/sections/:sectionId/upload"
                  element={
                    <InstructorPrivateRoutes element={<VideoUploadPage />} />
                  }
                />
                <Route
                  path="/upload-pdf/:courseId/:sectionId/:videoId"
                  element={<InstructorPrivateRoutes element={<PDFPage />} />}
                />

                {/* Shopping Cart */}
                <Route
                  path="/cart"
                  element={<ProtectedRoutes element={<ShoppingCart />} />}
                />
                {/* Admin Routes */}
                <Route
                  path="/admin/dashboard"
                  element={<PrivateRoutes element={<AdminDashboard />} />}
                />
                <Route
                  path="/admin/student"
                  element={<PrivateRoutes element={<UsersTable />} />}
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
