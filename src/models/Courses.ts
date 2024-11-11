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
    type: String,
    required: true,
  },

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
    enum: ["beginner", "intermediate", "advanced"],
  },

  thumbnail: {
    type: String,
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
    enum: [
      "Development",
      "Business",
      "Finance & Acounting",
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
    ],
  },
  tags: [String],
  studentsEnrolled: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
  ],
  language: {
    type: String,
    required: true,
  },
  sections: [
    {
      sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
      },
      title: {
        type: String,
        required: true,
      },
      videos: [
        {
          videoId: {
            type: mongoose.Schema.Types.ObjectId,
            default: new mongoose.Types.ObjectId(),
          },
          title: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
          publicId: {
            type: String,
            required: true,
          },
          duration: {
            type: String,
          },
        },
      ],
    },
  ],
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