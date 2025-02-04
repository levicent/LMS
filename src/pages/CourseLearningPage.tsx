import {
  Star,
  Clock,
  Calendar,
  PlayCircle,
  FileText,
  // Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import useFetchCourseById from "@/hooks/useFetchCourseById";
import { useEffect, useState } from "react";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import Video from "@/components/Video/Video";
import CourseSidebar from "@/components/CourseSidebar/CourseSidebar";
import ReactPlayer from "react-player";
import Loading from "@/components/Loading/Loading";
export default function CourseOverview() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const { courseId }: any = useParams();
  const { data: courseData, isLoading, error } = useFetchCourseById(courseId);

  const course = courseData?.course;
  useEffect(() => {
    console.log("Course", course);
  }, [course]);

  useEffect(() => {
    console.log("Selected Video", selectedVideo);
  }, [selectedVideo]);

  if (isLoading) return <p>
    <Loading />
  </p>
  if (error) return <p>Error loading course</p>;
  if (!course) return <p>No course found</p>;

  const handleVideoSelect = (
    sectionId: string,
    videoId: string,
    url: string
  ) => {
    setSelectedVideo(url);
    console.log("Selected video: sectionID", sectionId, videoId, url);
  };

  return (
    <DefaultLayout>
      <div className="flex justify-between gap-5">
        <main className="flex min-h-screen bg-gray-50 justify-start dark:bg-gray-900 p-4 sm:p-6 lg:p-8 dark:text-white pr-80 mr-72">
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden justify-start">
            <div className="relative aspect-video bg-gray-600">
              <div className="absolute inset-0 flex items-center justify-center">
                {selectedVideo === null ? (
                  <PlayCircle className="w-20 h-20 text-white opacity-70" />
                ) : (
                  <ReactPlayer
                    url={selectedVideo}
                    width="100%"
                    height="100%"
                    controls
                  />
                )}
                {/* <VideoPlayer
                  videoTitle="Title 1"
                  videoUrl="https://res.cloudinary.com/de51cdx8q/video/upload/v1731353469/course_videos/rpq47mwzeyizbluzhbmz.webm"
                /> */}
              </div>
            </div>
            <div className="p-4 sm:p-6 max-w-5xl">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {course.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {course?.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="font-bold">{course?.rating.toFixed(2)}</span>
                  {/* <span className="text-gray-500 ml-1">
                  ({course.students.toLocaleString()} students)
                </span> */}
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-1" />
                  <span>{course?.duration} total hours</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-1" />
                  <span>
                    Last updated{" "}
                    {course?.updatedAt
                      ? new Date(course?.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold">By the numbers</h3>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Skill level: {course?.level}</li>
                            <li>
                              Students: {course?.students?.toLocaleString()}
                            </li>
                            <li>Languages: {course?.languages?.join(", ")}</li>
                            <li>Captions: Yes</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold">Certificates</h3>
                          <p>Get LMS certificate by completing entire course</p>
                          <Button variant="outline" className="mt-2">
                            <FileText className="w-4 h-4 mr-2" />
                            LMS certificate
                          </Button>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold">Features</h3>
                        <p>Available on {course?.features?.join(" and ")}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Description</h3>
                        <p>June 17th 2024: Big update released!</p>
                        <p>
                          The entire course was re-recorded from scratch and was
                          therefore completely updated! It's now 100% up-to-date
                          with the latest version of Angular again, covering
                          crucial modern features like signals, standalone
                          components etc.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="mt-4 p-4">
                    <CardHeader className="font-bold text-lg -ml-6">
                      Instructor's name
                    </CardHeader>
                    <div className="flex items-center space-x-4 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {course?.instructor?.firstName}{" "}
                          {course?.instructor?.lastName}
                        </h3>
                        <p className="text-gray-500">
                          Angular Expert and Course Instructor
                        </p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="instructor">
                  <Card>
                    <CardHeader>
                      <CardTitle>Instructor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        {/* <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-bold">
                        {course.instructor
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                        </div> */}
                        <div>
                          <h3 className="text-lg font-semibold">
                            {course?.instructor?.firstName}{" "}
                            {course?.instructor?.lastName}
                          </h3>
                          <p className="text-gray-500">
                            Angular Expert and Course Instructor
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
        <CourseSidebar
          sections={course.sections}
          onVideoSelect={handleVideoSelect}
        />
      </div>
    </DefaultLayout>
  );
}
