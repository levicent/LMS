import Course from "../models/Courses";
import { Request, Response } from "express";
import { courseSchema, courseUpdateSchema } from "../schemas/courseSchema";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploads = multer({ dest: "uploads/" });

export const createCourse = [
  uploads.single("thumbnail"),
  async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const parsed = courseSchema.safeParse(data);

      if (!parsed.success) {
        return res
          .status(400)
          .json({ message: "Validation failed", errors: parsed.error.errors });
      }

      const existingCourse = await Course.findOne({ title: data.title });
      if (existingCourse) {
        return res.status(400).json({ message: "Course already exists" });
      }

      if (req.file) {
        const thumbnail = await cloudinary.uploader.upload(req.file.path, {
          folder: "courses",
        });
        parsed.data.thumbnail = thumbnail.secure_url;
        fs.unlinkSync(req.file.path);
      }

      const newCourse = new Course(parsed.data);
      await newCourse.save();

      res.status(201).json({
        message: "Course created successfully",
        newCourse,
        thumbnailUrl: parsed.data.thumbnail,
      });
    } catch (error) {
      console.error("Error creating course: ", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];
export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find().populate(
      "instructor",
      "firstName lastName"
    );
    if (!courses) {
      return res.status(404).json({ message: "No courses found" });
    }
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error getting all courses: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate(
      "instructor",
      "firstName lastName"
    );
    if (!course) {
      return res.status(404).json({ message: "No course found" });
    }

    res.status(200).json({ course });
  } catch (error) {
    console.error("Error getting course by id: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = courseUpdateSchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.errors });
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, parsed.data, {
      new: true,
    });
    if (!updatedCourse) {
      return res.status(404).json({ message: "No course found" });
    }
    res.status(200).json({ updatedCourse });
  } catch (error) {
    console.error("Error updating course by id", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "No course found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course by id", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const searchCourseByQuery = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Please provide a query" });
    }
    const courses = await Course.find({
      title: { $regex: query, $options: "i" },
    });

    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error searching course by category", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const findCourseByCategory =async (req:Request, res:Response) => {
   try {
    const { category } = req.params;
    const courses = await Course.find({ category: new RegExp(`^${category}$`, 'i') });

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: 'No courses found for this category' });
    }
    res.status(200).json(courses);
   }
    catch(error){
      console.error("Error finding course by category", error);
      res.status(500).json({message:"Internal server error for category", error});
    }
}
