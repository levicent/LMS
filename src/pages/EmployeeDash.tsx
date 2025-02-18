import  { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  GraduationCap, 
  ShoppingCart, 
  UserPlus,
  Search,
  BookOpen
} from 'lucide-react';

const EmployerDashboard = () => {
  const [courses] = useState([
    { id: 1, title: 'Advanced Leadership', price: 199, enrolled: 15, category: 'Management' },
    { id: 2, title: 'Data Analysis Fundamentals', price: 149, enrolled: 23, category: 'Technical' },
    { id: 3, title: 'Effective Communication', price: 99, enrolled: 45, category: 'Soft Skills' },
  ]);

  const [candidates] = useState([
    { id: 1, name: 'John Doe', role: 'Frontend Developer', experience: '5 years', status: 'Available' },
    { id: 2, name: 'Jane Smith', role: 'UX Designer', experience: '3 years', status: 'Available' },
    { id: 3, name: 'Mike Johnson', role: 'Project Manager', experience: '7 years', status: 'Interviewing' },
  ]);

  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (course :any) => {
    setCart([...cart, course]);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Employer Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Cart ({cart.length})
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Team
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Training Courses</TabsTrigger>
          <TabsTrigger value="hiring">Hiring</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Users className="w-8 h-8 text-blue-500" />
                  <span className="text-2xl font-bold">126</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Enrolled in Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-8 h-8 text-green-500" />
                  <span className="text-2xl font-bold">83</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Open Positions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <UserPlus className="w-8 h-8 text-purple-500" />
                  <span className="text-2xl font-bold">5</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Filter</Button>
                <Button variant="outline">Sort</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{course.category}</span>
                        <span className="font-bold">${course.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{course.enrolled} enrolled</span>
                      </div>
                      <Button 
                        className="w-full"
                        onClick={() => addToCart(course)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="hiring">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search candidates..."
                  className="pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
              <Button>Post New Job</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {candidates.map((candidate) => (
                <Card key={candidate.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{candidate.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium">{candidate.role}</p>
                        <p className="text-sm text-gray-500">{candidate.experience}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded text-sm ${
                          candidate.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {candidate.status}
                        </span>
                        <Button variant="outline">View Profile</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployerDashboard;