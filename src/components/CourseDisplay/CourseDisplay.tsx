import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface Course {
  title: string
  image: string
  progress: number
  slug: string
}

const courses: Course[] = [
  {
    title: "Ad Hoc Classes",
    image: "/placeholder.svg?height=400&width=600",
    progress: 0,
    slug: "ad-hoc-classes"
  },
  {
    title: "DSA Classes",
    image: "/placeholder.svg?height=400&width=600",
    progress: 0,
    slug: "dsa-classes"
  },
  {
    title: "Cohort 3.0 | Web Dev",
    image: "/placeholder.svg?height=400&width=600",
    progress: 0,
    slug: "cohort-3-web-dev"
  }
]

export default function CourseDisplay() {
  const [category, setCategory] = useState("")

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value)
  }

  return (
    <div className="min-h-screen text-white p-8 shadow-lg">
      
      {/* Category Dropdown aligned to the right */}
      <div className="flex justify-between mb-8">
        {/* <label className="block text-lg text-black mb-2">Select a Category:</label> */}
        <select
          value={category}
          onChange={handleCategoryChange}
          className="ml-auto w-full max-w-xs bg-gray-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a category</option>
          <option value="Development">Development</option>
          <option value="Business">Business</option>
          <option value="Finance & Accounting">Finance & Accounting</option>
          <option value="IT & Software">IT & Software</option>
          <option value="Personal Development">Personal Development</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Photography & Video">Photography & Video</option>
          <option value="Health & Fitness">Health & Fitness</option>
          <option value="Music">Music</option>
          <option value="Teaching & Academics">Teaching & Academics</option>
        </select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div key={course.slug} className="bg-gray-800 rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <Button className="w-full mb-2 bg-blue-500 hover:bg-blue-600">View Course</Button>
              <Button className="w-full mb-2 bg-blue-300 hover:bg-blue-400">Edit Course</Button>
              <Button className="w-full mb-2 bg-blue-100 hover:bg-blue-200">Delete Course</Button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
