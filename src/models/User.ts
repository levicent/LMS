import mongoose, { mongo } from "mongoose";
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
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["student", "teacher", "admin"],
  },
});

const User: mongoose.Model<IUserModel> = mongoose.model("User", userSchema);
export default User;
