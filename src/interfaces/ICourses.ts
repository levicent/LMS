import { Types } from "mongoose";

export interface IModule {
  title: string;
  content: string;
  resources?: string[]; // Optional array of resource URLs or file paths
  quizzes?: IQuiz[]; // Optional array of quiz objects
}

export interface IQuiz {
  question: string;
  options: string[];
  answer: string;
}

export interface ICourse {
  title: string;
  description: string;
  price: number;
  instructor: Types.ObjectId;
  //   modules?: IModule[];
  category: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}
