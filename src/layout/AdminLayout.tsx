import { useState } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
// import { Bars3Icon } from "@heroicons/react/24/outline";// Import the three-line hamburger icon

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content Area */}
      <div
        className={`relative flex flex-1 flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}  // Adjusts content based on sidebar state
      >
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Hamburger Icon for toggling sidebar */}
        {/* <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring"
        >
          <Bars3Icon className="w-6 h-6" />
        </button> */}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
