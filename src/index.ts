import mongoose from "mongoose";
import app from "./app";
// import * as dotenv from "dotenv";
// dotenv.config({ path: __dirname + "/.env" });
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database", error);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});