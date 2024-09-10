import Course from "../models/Courses";
import { Request, Response } from "express";
import { courseSchema, courseUpdateSchema } from "../schemas/courseSchema";
export const createCourse = async (req: Request, res: Response) => {
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

    const newCourse = new Course(data);
    await newCourse.save();

    res.status(201).json({ message: "Course created successfully" });
  } catch (error) {
    console.error("Error creating course: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
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
    const course = await Course.findById(id);
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
