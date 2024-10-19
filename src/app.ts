import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import courseRoutes from "./routes/courseRoutes";
import cartRoutes from "./routes/cartRoutes";
import razorpayRoutes from "./routes/razorpayRoutes";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", cartRoutes);
app.use("/api/payment", razorpayRoutes);
app.use("/uploads", express.static("uploads"));
export default app;
