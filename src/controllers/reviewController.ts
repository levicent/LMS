import { Request, Response } from "express";
import mongoose from "mongoose";
import Course from "../models/Courses";

export const addReview = async (req: Request, res: Response) => {
  try {
    const { rating, review } = req.body;
    const courseId = req.params.id;
    const userId = req.user?.id;

    if (!rating || !review) {
      return res
        .status(400)
        .json({ message: "Rating and review are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const alreadyReviewed = course.reviews?.find(
      (r: any) => r.user.toString() === userId
    );
    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this course" });
    }

    const newReview = {
      user: userId,
      rating: Number(rating),
      review,
    };

    course.reviews?.push(newReview as any);
    course.numReviews = course.reviews.length;
    course.rating =
      course.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
      course.reviews.length;

    await course.save();

    const updatedCourse = await Course.findById(courseId).populate({
      path: "reviews.user",
      select: "firstName lastName",
      model: "User",
    });

    const addedReview =
      updatedCourse?.reviews[updatedCourse?.reviews.length - 1];
    res.status(201).json({ message: "Review added", addedReview });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId).populate({
      path: "reviews.user",
      select: "firstName lastName",
      model: "User",
    });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course?.reviews);
  } catch (error) {
    console.error("Error getting reviews", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteReviewById = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    const reviewId = req.params.reviewId;

    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: {
          reviews: { _id: reviewId },
        },
      },
      { new: true }
    );
    if (!course) {
      return res
        .status(404)
        .json({ message: "Course or Review doesnot exists" });
    }
    res.status(200).json({
      message: "Review deleted successfully",
      course,
    });
  } catch (error) {
    console.error("Error deleting review", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
