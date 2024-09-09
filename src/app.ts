import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/api", authRoutes);

export default app;
