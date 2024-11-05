import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import courseRoutes from "./routes/courseRoutes";
import cartRoutes from "./routes/cartRoutes";
import razorpayRoutes from "./routes/razorpayRoutes";
import sectionRoutes from "./routes/sectionRoutes";
import videoRoutes from "./routes/videoRoutes";
const app = express();

const allowedOrigins = [
  "https://lms-1-0v55.onrender.com",
  "http://localhost:5173",
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", cartRoutes);
app.use("/api", sectionRoutes);
app.use("/api", videoRoutes);
app.use("/api/payment", razorpayRoutes);
app.use("/uploads", express.static("uploads"));
export default app;