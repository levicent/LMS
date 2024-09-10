"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseUpdateSchema = exports.courseSchema = void 0;
const zod_1 = require("zod");
exports.courseSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    price: zod_1.z.number().positive("Price must be a positive number"),
    instructor: zod_1.z.string().min(1, "Instructor is required"),
    category: zod_1.z.string().min(1, "Category is required"),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.courseUpdateSchema = exports.courseSchema.partial();
