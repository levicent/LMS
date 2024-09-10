import mongoose from "mongoose";
import { ICourse } from "../interfaces/ICourses";

interface ICourseModel extends ICourse, mongoose.Document {}

const courseSchema: mongoose.Schema<ICourseModel> = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  //   modules: [
  //     {
  //       titles: String,
  //       content: String,
  //       resources: [String],
  //       quizzes: [
  //         {
  //           question: String,
  //           options: [String],
  //           answer: String,
  //         },
  //       ],
  //     },
  //   ],
  category: {
    type: String,
    required: true,
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Course: mongoose.Model<ICourseModel> = mongoose.model(
  "Course",
  courseSchema
);
export default Course;
