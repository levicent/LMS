import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  duration: z.number().positive("Duration must be a positive number"),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  instructor: z.string().min(1, "Instructor is required"),
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
  language: z.array(z.string()).min(1, "Language is required"),
  tags: z.array(z.string()).optional(),
});

export const courseUpdateSchema = courseSchema.partial();
