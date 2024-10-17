import mongoose, { Types } from "mongoose";

export interface IEnrolledCourse {
  courseId: mongoose.Types.ObjectId; // The ID of the enrolled course
  enrollmentDate: Date;               // The date of enrollment
}
export interface IUser {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  phone: Number;
  image: String;
  role: "student" | "teacher" | "admin";
  enrolledCourses: IEnrolledCourse[];
  default:[],
  refreshToken: String;
  refreshTokenExp: Date;
}
