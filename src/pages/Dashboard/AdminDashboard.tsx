import AdminLayout from "../../layout/AdminLayout";
// import UsersTable from "@/components/Tables/UsersTable/UsersTable";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock, GraduationCap, Users } from "lucide-react";
const AdminDashboard = () => {
  return (
   
      <div className="col-span-12 xl:col-span-8">
        <UsersTable/>
      </div>
    
  );
};

export default AdminDashboard;



// user table
export const UsersTable = () => {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      course: "React Fundamentals",
      completion: 85,
      enrolledDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      course: "Node.js Basics",
      completion: 100,
      enrolledDate: "2024-02-01",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      course: "Python for Beginners",
      completion: 45,
      enrolledDate: "2024-02-15",
    },
    {
      id: 4,
      name: "John Doe",
      email: "john@example.com",
      course: "React Fundamentals",
      completion: 85,
      enrolledDate: "2024-01-15",
    },
    {
      id: 5,
      name: "Jane Smith",
      email: "jane@example.com",
      course: "Node.js Basics",
      completion: 100,
      enrolledDate: "2024-02-01",
    },
    {
      id: 6,
      name: "Mike Johnson",
      email: "mike@example.com",
      course: "Python for Beginners",
      completion: 45,
      enrolledDate: "2024-02-15",
    },
  ];

  const getCompletionStatus = (completion: number) => {
    if (completion === 100) return { label: "Completed", color: "bg-green-500 hover:bg-green-600" };
    if (completion >= 70) return { label: "In Progress", color: "bg-blue-500 hover:bg-blue-600" };
    return { label: "Started", color: "bg-purple-500 hover:bg-purple-600" };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <Card className="w-full bg-white shadow-lg">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
            <Users className="h-7 w-7 text-blue-500" />
            Students
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-100">
                  <TableHead className="bg-white py-5 text-base font-semibold text-gray-700">User</TableHead>
                  <TableHead className="bg-white py-5 text-base font-semibold text-gray-700">Course</TableHead>
                  <TableHead className="bg-white hidden py-5 text-base font-semibold text-gray-700 md:table-cell">Progress</TableHead>
                  <TableHead className="bg-white py-5 text-base font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="bg-white hidden py-5 text-base font-semibold text-gray-700 lg:table-cell">Enrolled Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow 
                    key={user.id}
                    className="border-b border-gray-500 hover:bg-gray-50/30 transition-colors"
                  >
                    <TableCell className="py-4">
                      <div className="flex flex-col gap-1 ">
                        <span className="font-semibold text-gray-900">{user.name}</span>
                        <span className="text-sm text-gray-500">{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-blue-500" />
                        <span className="font-medium text-gray-700">{user.course}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden py-4 md:table-cell">
                      <div className="w-full max-w-xs">
                        <div className="flex items-center gap-3">
                          <div className="h-2.5 flex-grow rounded-full bg-gray-100">
                            <div
                              className="h-2.5 rounded-full bg-blue-500 transition-all duration-300"
                              style={{ width: `${user.completion}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700 min-w-[45px]">
                            {user.completion}%
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge className={`${getCompletionStatus(user.completion).color} text-white font-medium px-3 py-1`}>
                        {getCompletionStatus(user.completion).label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden py-4 lg:table-cell">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600 font-medium">{formatDate(user.enrolledDate)}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

//Instructor table


// This only the courses That particular instructor created 


