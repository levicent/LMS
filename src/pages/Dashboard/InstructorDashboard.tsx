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


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, GraduationCap, BookOpen, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export const Stats = () => {
  // Sample data - replace with your actual data
  const students = [
    { id: 1, name: "John Doe", enrolledCourses: ["React Basics", "Node.js"], completion: 75 },
    { id: 2, name: "Jane Smith", enrolledCourses: ["Python Programming"], completion: 90 },
    { id: 3, name: "Mike Brown", enrolledCourses: ["React Basics", "MongoDB"], completion: 60 },
  ];

  const courseStats = [
    { name: "React Basics", students: 45, avgCompletion: 78 },
    { name: "Node.js", students: 30, avgCompletion: 65 },
    { name: "Python Programming", students: 35, avgCompletion: 82 },
    { name: "MongoDB", students: 25, avgCompletion: 70 },
  ];

  const completionTrend = [
    { month: 'Jan', completion: 65 },
    { month: 'Feb', completion: 70 },
    { month: 'Mar', completion: 75 },
    { month: 'Apr', completion: 78 },
    { month: 'May', completion: 82 },
    { month: 'Jun', completion: 85 },
  ];

  return (
    <TeacherLayout>
    <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-white border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">Total Students</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-700">{students.length}</div>
            <p className="text-xs text-gray-500">Active learners</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-700">{courseStats.length}</div>
            <p className="text-xs text-gray-500">Available courses</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">Avg. Completion</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-700">76%</div>
            <p className="text-xs text-gray-500">Across all courses</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">Active Enrollments</CardTitle>
            <GraduationCap className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-700">135</div>
            <p className="text-xs text-gray-500">Total enrollments</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Completion Graph */}
      <Card className="bg-white border-blue-100">
        <CardHeader>
          <CardTitle className="text-blue-600">Course Completion Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                <YAxis tick={{ fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'white', borderColor: '#e5e7eb' }}
                  labelStyle={{ color: '#374151' }}
                />
                <Bar dataKey="avgCompletion" fill="#3b82f6" name="Completion %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Completion Trend */}
      <Card className="bg-white border-blue-100">
        <CardHeader>
          <CardTitle className="text-blue-600">Completion Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={completionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fill: '#6b7280' }} />
                <YAxis tick={{ fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'white', borderColor: '#e5e7eb' }}
                  labelStyle={{ color: '#374151' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="completion" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Completion %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="bg-white border-blue-100">
        <CardHeader>
          <CardTitle className="text-blue-600">Enrolled Students</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-blue-100">
                <TableHead className="text-gray-500">Name</TableHead>
                <TableHead className="text-gray-500">Enrolled Courses</TableHead>
                <TableHead className="text-gray-500">Completion Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} className="border-blue-50">
                  <TableCell className="text-gray-600 font-medium">
                    {student.name}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {student.enrolledCourses.join(", ")}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div
                          className="bg-blue-500 h-2.5 rounded-full"
                          style={{ width: `${student.completion}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{student.completion}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
    </TeacherLayout>
  );
};


