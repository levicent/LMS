"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
// import * as dotenv from "dotenv";
// dotenv.config({ path: __dirname + "/.env" });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const PORT = process.env.PORT || 5000;
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => {
    console.log("Connected to database");
})
    .catch((error) => {
    console.error("Error connecting to database", error);
});
app_1.default.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
