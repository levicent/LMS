import TeacherLayout from "@/layout/TeacherLayout";

import CourseDisplay from "@/components/CourseDisplay/CourseDisplay";
const CourseDashboard = () => {
  return (
    <TeacherLayout>
      <div className="col-span-12 xl:col-span-8">
        <CourseDisplay />
      </div>
    </TeacherLayout>
  );
};

export default CourseDashboard;
