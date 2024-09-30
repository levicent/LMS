import AdminLayout from "../../layout/AdminLayout";

import CourseDisplay from "@/components/CourseDisplay/CourseDisplay";
const CourseDashboard = () => {
  return (
    <AdminLayout>
      <div className="col-span-12 xl:col-span-8">
        <CourseDisplay />
      </div>
    </AdminLayout>
  );
};

export default CourseDashboard;
