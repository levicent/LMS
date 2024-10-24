import React, { useState } from "react";
import {
  ChevronRight,
  Laptop,
  GraduationCap,
  BookOpen,
  Users,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import DefaultLayout from "@/layout/DefaultLayout";

export default function DonorPage() {
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [donationType, setDonationType] = useState<"one-time" | "monthly">(
    "one-time"
  );

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Donation submitted:", {
      amount: donationAmount,
      type: donationType,
    });
  };

  return (
    <DefaultLayout>
      <main className="bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
            Empower India's Future Through Education
          </h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Your donation supports free online education for underprivileged
            students across India, providing scholarships, laptops, and
            essential resources.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="border-2 border-orange-500 dark:border-orange-400 shadow-xl bg-white dark:bg-gray-800">
              <CardHeader className="bg-orange-500 dark:bg-orange-600 text-white">
                <CardTitle className="text-2xl font-bold text-center">
                  Make Your Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleDonationSubmit} className="space-y-6">
                  <div>
                    <Label
                      htmlFor="donation-type"
                      className="text-lg font-semibold mb-2 block"
                    >
                      Donation Type
                    </Label>
                    <RadioGroup
                      id="donation-type"
                      className="flex space-x-4"
                      value={donationType}
                      onValueChange={(value) =>
                        setDonationType(value as "one-time" | "monthly")
                      }
                    >
                      <div className="flex items-center">
                        <RadioGroupItem value="one-time" id="one-time" />
                        <Label htmlFor="one-time" className="ml-2">
                          One-time
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly" className="ml-2">
                          Monthly
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label
                      htmlFor="amount"
                      className="text-lg font-semibold mb-2 block"
                    >
                      Donation Amount (INR)
                    </Label>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {[1000, 2500, 5000, 10000, 25000].map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant={
                            donationAmount === amount.toString()
                              ? "default"
                              : "outline"
                          }
                          onClick={() => setDonationAmount(amount.toString())}
                          className="text-lg font-semibold"
                        >
                          ₹{amount}
                        </Button>
                      ))}
                      <Input
                        type="number"
                        id="custom-amount"
                        placeholder="Custom"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="text-lg"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white text-xl font-bold py-4"
                  >
                    Donate Now
                    <ChevronRight className="ml-2 w-6 h-6" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-white dark:bg-gray-800 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Our Goal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={60} className="h-4" />
                    <p className="text-lg font-semibold">
                      ₹60,00,000 raised of ₹1,00,00,000 goal
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Help us reach our goal to support 10,000 students this
                      year!
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Your Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <BookOpen className="w-8 h-8 text-orange-500 mr-4" />
                      <span className="text-lg">
                        ₹1,000 provides course materials for a student
                      </span>
                    </li>
                    <li className="flex items-center">
                      <Laptop className="w-8 h-8 text-orange-500 mr-4" />
                      <span className="text-lg">
                        ₹25,000 funds a laptop for remote learning
                      </span>
                    </li>
                    <li className="flex items-center">
                      <GraduationCap className="w-8 h-8 text-orange-500 mr-4" />
                      <span className="text-lg">
                        ₹50,000 covers a full scholarship for a year
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
              Our Impact Across India
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white dark:bg-gray-800 shadow-lg transform hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <Users className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    25,000+
                  </h3>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    Students Supported
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 shadow-lg transform hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <Laptop className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    5,000+
                  </h3>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    Laptops Provided
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 shadow-lg transform hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <GraduationCap className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    90%
                  </h3>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    Course Completion Rate
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
              Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white dark:bg-gray-800 shadow-lg">
                <CardContent className="p-6">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Student using laptop"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Priya's Journey to Tech
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    "The free online courses and laptop provided by this program
                    helped me secure a job as a web developer. I'm now able to
                    support my family and inspire others in my community."
                  </p>
                  <Button variant="outline" className="w-full">
                    Read Priya's Story <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 shadow-lg">
                <CardContent className="p-6">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Student teaching others"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Rahul: Student to Instructor
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    "After completing several courses, I created my own course
                    on mobile app development. The stipend I receive as an
                    instructor helps me continue my education while giving back
                    to the community."
                  </p>
                  <Button variant="outline" className="w-full">
                    Discover Rahul's Impact{" "}
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="text-center bg-orange-600 text-white p-12 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-4">
              Join Our Mission to Educate India
            </h2>
            <p className="text-xl mb-8">
              Your contribution empowers underprivileged students across India
              with free education, essential resources, and opportunities for a
              brighter future.
            </p>
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50 text-xl font-bold py-6 px-12"
              onClick={() =>
                document
                  .getElementById("donation-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Donate Now <Gift className="ml-2 w-6 h-6" />
            </Button>
          </section>
        </div>
      </main>
    </DefaultLayout>
  );
}
