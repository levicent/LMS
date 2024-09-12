import mongoose from "mongoose";
import { IStudent } from "../interfaces/IStudent";

const studentSchema: mongoose.Schema<IStudent> = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    unique: true,
  },
  courses: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "course",
  },
  cart: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "course",
  },
  wishlist: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "course",
  },
});

const Student: mongoose.Model<IStudent> = mongoose.model(
  "Student",
  studentSchema
);
export default Student;
