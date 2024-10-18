import { Star, Clock, Calendar, PlayCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import DefaultLayout from "../layout/DefaultLayout";

export default function CourseOverview() {
  const course = {
    title: "Angular - The Complete Guide (2024 Edition)",
    description:
      "Master Angular (formerly 'Angular 2') and build awesome, reactive web apps with the successor of Angular.js",
    rating: 4.7,
    students: 785978,
    hours: 55.5,
    lastUpdated: "August 2024",
    instructor: "Maximilian Schwarzmüller",
    languages: ["English", "German", "French", "Spanish"],
    lectures: 756,
    level: "All Levels",
    features: ["iOS", "Android"],
    certificate: true,
    sections: [
      { title: "About This Course", duration: "3min" },
      { title: "Course Setup & Resources", duration: "9min" },
      {
        title: "Angular Essentials - Components, Templates, Services & More",
        duration: "4hr 47min",
      },
      { title: "Angular Essentials - Working with Modules", duration: "30min" },
      { title: "Angular Essentials - Time To Practice", duration: "37min" },
      { title: "Debugging Angular Apps", duration: "16min" },
    ],
  };

  return (
    <DefaultLayout>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 dark:text-white">
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="relative aspect-video bg-gray-600">
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircle className="w-20 h-20 text-white opacity-70" />
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {course.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {course.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="font-bold">{course.rating}</span>
                <span className="text-gray-500 ml-1">
                  ({course.students.toLocaleString()} students)
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-400 mr-1" />
                <span>{course.hours} total hours</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-1" />
                <span>Last updated {course.lastUpdated}</span>
              </div>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="content">Course Content</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>
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
                          <li>Skill level: {course.level}</li>
                          <li>Students: {course.students.toLocaleString()}</li>
                          <li>Languages: {course.languages.join(", ")}</li>
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
                      <p>Available on {course.features.join(" and ")}</p>
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
              </TabsContent>
              <TabsContent value="content">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.sections.map((section, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          <span>{section.title}</span>
                          <Badge variant="secondary">{section.duration}</Badge>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="instructor">
                <Card>
                  <CardHeader>
                    <CardTitle>Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-bold">
                        {course.instructor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {course.instructor}
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
    </DefaultLayout>
  );
}
