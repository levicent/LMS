import mongoose, { Cursor } from "mongoose";
import { Request, Response } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Course from "../models/Courses";

import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const upload = multer({ dest: "uploads/" });

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
    res.status(201).json({ message: "Section added successfully", course });
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

    res.status(200).json(course.sections);
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
      { $set: { "sections.$title": title } },
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

export const addVideoToSection = [
  upload.single("video"),
  async (req: Request, res: Response) => {
    try {
      const { courseId, sectionId } = req.params;
      const { title, duration } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "No video file uploaded" });
      }

      const uploadFile = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "video",
        folder: "course_videos",
      });

      const { secure_url, public_id } = uploadFile;

      const video = {
        videoId: new mongoose.Types.ObjectId(),
        title: title || "Untitled Video",
        url: secure_url,
        publicId: public_id,
        duration,
      };

      const course = await Course.findOneAndUpdate(
        { _id: courseId, "sections.sectionId": sectionId },
        { $push: { "sections.$.videos": video } },
        { new: true }
      );

      if (!course) {
        return res
          .status(404)
          .json({ message: "Course or section doesnot exists" });
      }

      res.status(201).json(course);
    } catch (error) {
      console.error("Error add videos to section", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];
