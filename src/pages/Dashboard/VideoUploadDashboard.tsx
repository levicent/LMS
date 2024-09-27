import TeacherLayout from "../../layout/TeacherLayout";
import VideoUpload from "@/components/Tables/CourseTable/videoUpload";
const VideoUploadDashboard = () => {
  return (
    <TeacherLayout>
      <div className="col-span-12 xl:col-span-8">
        <VideoUpload />
      </div>
    </TeacherLayout>
  );
};

export default VideoUploadDashboard;
