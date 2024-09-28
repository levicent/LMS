"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseUpdateSchema = exports.courseSchema = void 0;
const zod_1 = require("zod");
exports.courseSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    price: zod_1.z.string().min(1, "Price is required"),
    duration: zod_1.z.string().min(1, "Duration is required"),
    level: zod_1.z.enum(["beginner", "intermediate", "advanced"]),
    instructor: zod_1.z.string().min(1, "Instructor is required"),
    category: zod_1.z.enum([
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
    language: zod_1.z.string().min(1, "Language is required"),
    // tags: z.array(z.string()).optional(),
});
exports.courseUpdateSchema = exports.courseSchema.partial();
