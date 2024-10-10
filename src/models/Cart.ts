import mongoose from "mongoose";
import { ICart } from "../interfaces/ICart";

const cartSchema: mongoose.Schema<ICart> = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
      thumbnail: {
        type: String,
      },
      instructor: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
      },
      duration: {
        type: String,
      },
      level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
      },
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

const Cart = mongoose.model<ICart>("Cart", cartSchema);
export default Cart;
