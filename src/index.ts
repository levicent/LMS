import mongoose, { mongo } from "mongoose";
import app from "./app";
import "dotenv/config";

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
