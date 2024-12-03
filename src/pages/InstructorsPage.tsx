
import React from "react";
import { useFetchInstructors } from "@/hooks/useFetchInstructors";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronRight,
  Users,
  BookOpen,
  Award,
  Mail,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import DefaultLayout from "@/layout/DefaultLayout";
export default function InstructorsPage() {
  //Temporary use only might use some validation logic here , If not anyone can get the details of instructor
  const { data: instructors, isLoading, error } = useFetchInstructors();
  const handleVolunteerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Volunteer form submitted");
  };

  const renderInstructors = (role: string) => {
    if (isLoading) {
      return <p className="text-center">Loading instructors...</p>;
    }

    if (error) {
      return (
        <Card className="bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700">
          <CardContent className="p-6 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
            <p className="text-red-500 dark:text-red-400">
              Error loading instructors. Please try again later.
            </p>
          </CardContent>
        </Card>
      );
    }

    if (!instructors || instructors.length === 0) {
      return <p className="text-center">No instructors found.</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {instructors
          .map((instructor:any, index:number) => (
            <Card key={index} className="bg-white dark:bg-gray-800 shadow-lg">
              <CardContent className="p-6">
              <img
                src={instructor.image ? instructor.image : `/placeholder.svg?height=100&width=100&text=${instructor.firstName.charAt(0)}${instructor.lastName.charAt(0)}`}
                alt={`${instructor.firstName} ${instructor.lastName}`}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 text-center mb-2">
                  {instructor.firstName} {instructor.lastName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                  {instructor.role}
                </p>
                {role === "current" && (
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" /> {instructor.email}
                  </Button>
                  
                )}
              </CardContent>
            </Card>
          ))}
      </div>
    );
  };

  return (
    <DefaultLayout>
      <main className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
            Our Inspiring Instructors
          </h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Meet the dedicated professionals who are shaping the future of
            education in India. Join our community of passionate educators and
            make a difference.
          </p>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
              Why Teach With Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Impact Lives",
                  description:
                    "Empower underprivileged students and shape their futures",
                  hoverDescription:
                    "Your teaching can change the course of a student's life, opening doors to new opportunities and brighter futures.",
                },
                {
                  icon: BookOpen,
                  title: "Flexible Teaching",
                  description:
                    "Create and deliver courses on your own schedule",
                  hoverDescription:
                    "Enjoy the freedom to design your curriculum and teach at times that suit you best, balancing your passion with other commitments.",
                },
                {
                  icon: Award,
                  title: "Earn Stipends",
                  description:
                    "Receive compensation for your valuable contributions",
                  hoverDescription:
                    "Your dedication is rewarded with competitive stipends, recognizing the value of your expertise and time.",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="bg-white dark:bg-gray-800 shadow-lg group hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <CardContent className="p-6 text-center relative h-full">
                    <div className="transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-full">
                      <item.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                    <div className="absolute inset-0 p-6 flex items-center justify-center bg-blue-600 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0">
                      <p>{item.hoverDescription}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
              Our Instructor Community
            </h2>
            <Tabs defaultValue="current" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="current">Current Instructors</TabsTrigger>
                <TabsTrigger value="previous">Previous Instructors</TabsTrigger>
              </TabsList>
              <TabsContent value="current">
                {renderInstructors("current")}
              </TabsContent>
              <TabsContent value="previous">
                {renderInstructors("previous")}
              </TabsContent>
            </Tabs>
          </section>

          <section className="mb-16">
            <Card className="bg-white dark:bg-gray-800 shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white">
                  <h2 className="text-3xl font-bold mb-4">
                    Join Our Teaching Community
                  </h2>
                  <p className="mb-6">
                    Share your expertise and make a lasting impact on students'
                    lives across India.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <Sparkles className="w-6 h-6 mr-2" />
                      <span>Empower underprivileged students</span>
                    </li>
                    <li className="flex items-center">
                      <Sparkles className="w-6 h-6 mr-2" />
                      <span>Flexible teaching schedules</span>
                    </li>
                    <li className="flex items-center">
                      <Sparkles className="w-6 h-6 mr-2" />
                      <span>Earn stipends for your contributions</span>
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/2 p-8">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                      Become a Volunteer Instructor
                    </CardTitle>
                    <CardDescription className="text-center">
                      Fill out the form below to start your journey as an
                      instructor
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      onSubmit={handleVolunteerSubmit}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="firstName"
                            className="text-sm font-medium"
                          >
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            placeholder="Enter your first name"
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="lastName"
                            className="text-sm font-medium"
                          >
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            placeholder="Enter your last name"
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="expertise"
                          className="text-sm font-medium"
                        >
                          Area of Expertise
                        </Label>
                        <Input
                          id="expertise"
                          placeholder="e.g., Web Development, Data Science"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="motivation"
                          className="text-sm font-medium"
                        >
                          Why do you want to volunteer?
                        </Label>
                        <Textarea
                          id="motivation"
                          placeholder="Tell us about your motivation to teach"
                          required
                          className="mt-1"
                          rows={4}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                      >
                        Submit Application
                      </Button>
                    </form>
                  </CardContent>
                </div>
              </div>
            </Card>
          </section>

          <section className="text-center bg-blue-600 text-white p-12 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl mb-8">
              Join our community of passionate educators and help shape the
              future of underprivileged students in India.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 text-xl font-bold py-6 px-12"
              onClick={() =>
                document
                  .getElementById("volunteer-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Become an Instructor
              <ChevronRight className="ml-2 w-6 h-6" />
            </Button>
          </section>
        </div>
      </main>
    </DefaultLayout>
  );
}
