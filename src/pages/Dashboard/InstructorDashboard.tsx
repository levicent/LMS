import TeacherLayout from "../../layout/TeacherLayout";
import CreateOrEditCourseForm from "@/components/Tables/CourseTable/CreateCourseTable";
const InstructorDashboard = () => {
  return (
    <TeacherLayout>
      <div className="col-span-12 xl:col-span-8">
        <CreateOrEditCourseForm />
      </div>
    </TeacherLayout>
  );
};

export default InstructorDashboard;
