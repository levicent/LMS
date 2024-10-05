import TeacherLayout from "../../layout/TeacherLayout";
import CreateOrEditCourseForm from "@/components/Tables/CourseTable/CreateCourseTable";

const InstructorDashboard = () => {
  return (
    <TeacherLayout>
      <div className="w-full">
        <CreateOrEditCourseForm />
      </div>
    </TeacherLayout>
  );
};

export default InstructorDashboard;
