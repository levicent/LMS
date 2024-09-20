import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import DefaultLayout from "@/layout/DefaultLayout";
import Ratings from "@/components/Ratings/Ratings";

export default function CourseInfo() {
  return (
    <DefaultLayout>
      <div className="dark:bg-gray-900">
        <div className="max-w-5xl mx-auto p-4 space-y-8 dark:bg-gray-900">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3 space-y-4">
              <h1 className="text-3xl font-bold dark:text-gray-100">
                Introduction to Machine Learning
              </h1>
              <div className="flex justify-between mx-3">
                <Badge variant="secondary">Data Science</Badge>

                <Ratings />
              </div>
              <p className="text-muted-foreground dark:text-gray-400">
                Dive into the fascinating world of Machine Learning with this
                comprehensive introductory course. Perfect for beginners and
                those looking to solidify their foundational knowledge.
              </p>
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-gray-100">
                    Course Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>This course covers:</p>
                  <ul className="list-disc list-inside space-y-2 mt-2 dark:text-gray-300">
                    <li>Fundamentals of Machine Learning algorithms</li>
                    <li>Supervised and Unsupervised Learning techniques</li>
                    <li>
                      Practical applications using Python and popular ML
                      libraries
                    </li>
                    <li>Real-world case studies and projects</li>
                    <li>Best practices for model evaluation and deployment</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <CardDescription className="dark:text-gray-400">
                    Duration: 8 weeks | Difficulty: Intermediate |
                    Prerequisites: Basic Python knowledge
                  </CardDescription>
                </CardFooter>
              </Card>
            </div>
            <div className="md:w-1/3 space-y-4">
              <Card className="dark:bg-gray-800">
                <CardContent className="p-0">
                  <img
                    src="https://img.freepik.com/premium-vector/mathematics-circular-flat-illustration-vector-math-banner_104589-3151.jpg"
                    alt="Machine Learning Course Cover"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-t-lg"
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-center p-6">
                  <div className="text-2xl font-bold mb-4 dark:text-gray-100">
                    $199.99
                  </div>
                  <Button className="w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                </CardFooter>
              </Card>
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-gray-100">
                    Course Instructor
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center space-x-4">
                  <img
                    src="image/blank-profile-picture-973460_1280.png"
                    alt="Instructor Avatar"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold dark:text-gray-100">
                      Dr. Jane Smith
                    </h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      PhD in Computer Science, 10+ years of industry experience
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
