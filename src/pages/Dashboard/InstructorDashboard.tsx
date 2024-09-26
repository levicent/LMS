import TeacherLayout from "../../layout/TeacherLayout";
import CreateUsersTable from "@/components/Tables/CourseTable/CreateCourseTable";
const InstructorDashboard = () => {
  return (
    <TeacherLayout>
      <div className="col-span-12 xl:col-span-8">
        <CreateUsersTable />
      </div>
    </TeacherLayout>
  );
};

export default InstructorDashboard;
