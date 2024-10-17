import { Request, Response } from "express";
import User from "../models/User";
import Course from "../models/Courses";
import mongoose from "mongoose";
import { IEnrolledCourse } from "../interfaces/IUser";

export const enrollCourseById = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user.id;
    const { courseId } = req.params;
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ error: "User or Course not found" });
    }
    user.enrolledCourses = user.enrolledCourses || [];

    // Check if the user is already enrolled in the course
    const alreadyEnrolled = user.enrolledCourses.some(
      (enrolled) => String(enrolled.courseId) === String(courseId)
    );

    if (alreadyEnrolled) {
      return res.status(400).json({ error: "Already enrolled in this course" });
    }

    const enrolledCourse: IEnrolledCourse = {
      courseId: new mongoose.Types.ObjectId(courseId),
      enrollmentDate: new Date(),
    };
    user.enrolledCourses.push(enrolledCourse);

    await user.save(); // Save the updated user document

    return res
      .status(200)
      .json({ message: "Successfully enrolled in the course!" });
  } catch (error) {
    console.error("Error enrolling in course by id: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getEnrolledCourses = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user.id;

    const user = await User.findById(userId).populate({
      path: "enrolledCourses.courseId",
      populate: {
        path: "instructor",
        select: "firstName lastName",
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ enrolledCourses: user.enrolledCourses });
  } catch (error) {
    console.error("Error fetching enrolled courses: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
