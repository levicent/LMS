import { Types } from "mongoose";

export interface IStudent {
  user: Types.ObjectId;
  courses: Types.ObjectId[];
  cart: Types.ObjectId[];
  wishlist: Types.ObjectId[];
}
