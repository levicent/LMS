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

export interface ISection {
  sectionId: Types.ObjectId;
  title: string;
  videos: IVideo[];
}

export interface IVideo {
  videoId: Types.ObjectId;
  title: string;
  url: string;
  duration?: string;
}

export interface ICourse {
  title: string;
  description: string;
  price: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  instructor: Types.ObjectId;
  thumbnail: string;
  //   modules?: IModule[];
  category:
    | "Development"
    | "Business"
    | "Finance & Accounting"
    | "IT & Software"
    | "Office Productivity"
    | "Personal Development"
    | "Design"
    | "Marketing"
    | "Lifestyle"
    | "Photography & Video"
    | "Health & Fitness"
    | "Music"
    | "Teaching & Academics";
  studentsEnrolled: { user: Types.ObjectId }[];
  reviews?: { user: Types.ObjectId }[];
  language: string;
  tags?: string[];
  sections: ISection[];

  createdAt: Date;
  updatedAt: Date;
}
