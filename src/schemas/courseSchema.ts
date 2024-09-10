import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  instructor: z.string().min(1, "Instructor is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).optional(),
});

export const courseUpdateSchema = courseSchema.partial();
