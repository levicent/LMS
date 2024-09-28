import { useState } from "react";
import Header from "../components/Header/Header";
import Sidebar1 from "../components/Sidebar/Sidebar1";

interface AdminLayoutProps {
  children: React.ReactNode;
}
const TeacherLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      {/* <div className="flex h-screen overflow-hidden"> */}
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar1 sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div
        className={`relative flex flex-1 flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}  // Adjusts content based on sidebar state
      >
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main className="flex-1 overflow-y-auto bg-gray-100">
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      {/* </div> */}
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default TeacherLayout;
