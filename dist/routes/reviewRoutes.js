"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewController_1 = require("../controllers/reviewController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post("/courses/:id/reviews", auth_1.default, reviewController_1.addReview);
router.get("/courses/:id/reviews", auth_1.default, reviewController_1.getAllReviews);
exports.default = router;
