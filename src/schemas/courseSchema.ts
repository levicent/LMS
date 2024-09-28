import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  duration: z.string().min(1, "Duration is required"),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  // instructor: z.string().min(1, "Instructor is required"),
  category: z.enum([
    "Development",
    "Business",
    "Finance & Accounting",
    "IT & Software",
    "Office Productivity",
    "Personal Development",
    "Design",
    "Marketing",
    "Lifestyle",
    "Photography & Video",
    "Health & Fitness",
    "Music",
    "Teaching & Academics",
  ]),
  language: z.string().min(1, "Language is required"),
  // tags: z.array(z.string()).optional(),
});

export const courseUpdateSchema = courseSchema.partial();
