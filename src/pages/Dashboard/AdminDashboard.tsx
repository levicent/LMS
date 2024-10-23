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

  const getCompletionStatus = (completion : number) => {
    if (completion === 100) return { label: "Completed", color: "bg-green-500" };
    if (completion >= 70) return { label: "In Progress", color: "bg-yellow-500" };
    return { label: "Started", color: "bg-blue-500" };
  };
  const formatDate = (dateString : string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AdminLayout>
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Students
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Enrolled Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      {user.course}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${user.completion}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 mt-1">
                      {user.completion}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getCompletionStatus(user.completion).color} text-white`}>
                      {getCompletionStatus(user.completion).label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {formatDate(user.enrolledDate)}
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


