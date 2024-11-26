"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
// import reviewRoutes from './routes/reviewRoutes';
const razorpayRoutes_1 = __importDefault(require("./routes/razorpayRoutes"));
const sectionRoutes_1 = __importDefault(require("./routes/sectionRoutes"));
const videoRoutes_1 = __importDefault(require("./routes/videoRoutes"));
// import { deleteReview } from "./controllers/reviewController";
const app = (0, express_1.default)();
const allowedOrigins = [
    "https://lms-1-0v55.onrender.com",
    "http://localhost:5173",
];
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use("/api", authRoutes_1.default);
app.use("/api", userRoutes_1.default);
app.use("/api", courseRoutes_1.default);
app.use("/api", cartRoutes_1.default);
app.use("/api", sectionRoutes_1.default);
app.use("/api", videoRoutes_1.default);
// app.use('/api', reviewRoutes);
// app.use("/api", deleteReview);
app.use("/api/payment", razorpayRoutes_1.default);
app.use("/uploads", express_1.default.static("uploads"));
exports.default = app;
