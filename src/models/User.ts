import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";

interface IUserModel extends IUser, mongoose.Document {}

const userSchema: mongoose.Schema<IUserModel> = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate emails
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    default: "student",
  },
  refreshToken: {
    type: String,
  },
  refreshTokenExp: {
    type: Date,
  },
  enrolledCourses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
      },
      enrollmentDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  default: [],
}, {
  timestamps: true,
});

const User: mongoose.Model<IUserModel> = mongoose.model("User", userSchema);
export default User;
