import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  Building2,
  GraduationCap,
  Calendar
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const EmployeeList = () => {
  const [employees] = useState([
    {
      id: 1,
      name: 'John Doe',
      role: 'Senior Frontend Developer',
      department: 'Engineering',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      joinDate: '2022-03-15',
      activeCourses: 2,
      status: 'Active',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      role: 'UX Designer',
      department: 'Design',
      email: 'sarah.wilson@company.com',
      phone: '+1 (555) 234-5678',
      joinDate: '2023-01-10',
      activeCourses: 1,
      status: 'Active',
      avatar: '/api/placeholder/32/32'
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Project Manager',
      department: 'Management',
      email: 'michael.chen@company.com',
      phone: '+1 (555) 345-6789',
      joinDate: '2021-08-22',
      activeCourses: 3,
      status: 'On Leave',
      avatar: '/api/placeholder/32/32'
    }
  ]);

  const [filterView, setFilterView] = useState('grid'); // 'grid' or 'list'

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Employees</h1>
        <Button>Add Employee</Button>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setFilterView('grid')}
            >
              <Filter className="w-4 h-4" />
              Grid
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setFilterView('list')}
            >
              <Filter className="w-4 h-4" />
              List
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap text-white">
          <Button variant="outline" size="sm">Department: All</Button>
          <Button variant="outline" size="sm">Status: All</Button>
          <Button variant="outline" size="sm">Course Status: All</Button>
        </div>
      </div>

      {filterView === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((employee) => (
            <Card key={employee.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={employee.avatar}
                      alt={employee.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{employee.name}</h3>
                      <p className="text-sm text-gray-500">{employee.role}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem>Manage Courses</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {employee.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {employee.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    {employee.department}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="w-4 h-4 text-gray-400" />
                    {employee.activeCourses} Active Courses
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    Joined {new Date(employee.joinDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className={`px-2 py-1 rounded text-sm ${
                    employee.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {employee.status}
                  </span>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Employee</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Department</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Courses</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{employee.department}</td>
                  <td className="px-6 py-4">{employee.activeCourses} Active</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-sm ${
                      employee.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>Manage Courses</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;