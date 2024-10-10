import { Types } from "mongoose";

export interface ICart {
  userId: Types.ObjectId;
  items: {
    productId: Types.ObjectId;
    name: string;
    price: number;
    thumbnail: string;
    instructor: {
      id: Types.ObjectId;
      firstName: string;
      lastName: string;
    };
    duration: string;
    level: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
