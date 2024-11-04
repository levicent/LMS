import mongoose from "mongoose";
import { Request, Response } from "express";
import Course from "../models/Courses";

export const addSection = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const { title } = req.body;

    const section = {
      sectionId: new mongoose.Types.ObjectId(),
      title,
      videos: [],
    };

    const course = await Course.findByIdAndUpdate(courseId, {
      $push: { sections: section },
    });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(201).json({
      message: "Section added successfully",
      sectionId: section.sectionId,
      course,
    });
  } catch (error) {
    console.error("Error adding video to section: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllSection = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course?.sections);
  } catch (error) {
    console.error("Error getting section: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSectionById = async (req: Request, res: Response) => {
  try {
    const { courseId, sectionId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const section = course.sections.find(
      (item) => item.sectionId.toString() === sectionId
    );

    if (!section) {
      return res.status(404).json({ message: "Section doesnot exists" });
    }

    res.status(200).json(section);
  } catch (error) {
    console.error("Error getting section by id", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateSection = async (req: Request, res: Response) => {
  try {
    const { courseId, sectionId } = req.params;
    const { title } = req.body;

    const course = await Course.findOneAndUpdate(
      {
        _id: courseId,
        "sections.sectionId": sectionId,
      },
      { $set: { "sections.$.title": title } },
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course", course });
  } catch (error) {
    console.error("Error updating section: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteSection = async (req: Request, res: Response) => {
  try {
    const { courseId, sectionId } = req.params;

    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: { sections: { sectionId } },
      },
      {
        new: true,
      }
    );

    if (!course) {
      return res
        .status(404)
        .json({ message: "Course or section doesnot exists" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Error deleting section", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
