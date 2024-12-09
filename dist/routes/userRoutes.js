"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controllers/userController");
const auth_1 = __importDefault(require("../middleware/auth"));
const role_1 = __importDefault(require("../middleware/role"));
router.post("/users", auth_1.default, (0, role_1.default)(["admin"]), userController_1.createUser);
router.get("/users", auth_1.default, (0, role_1.default)(["admin", "teacher"]), userController_1.getAllUsers);
router.get("/users/:id", auth_1.default, (0, role_1.default)(["admin", "teacher"]), userController_1.getUserById);
router.put("/users/:id", auth_1.default, (0, role_1.default)(["admin", "student"]), userController_1.updateUserById);
router.delete("/users/:id", auth_1.default, (0, role_1.default)(["admin"]), userController_1.deleteUserById);
router.get("/profile", auth_1.default, userController_1.getUserProfile);
router.put("/profile", auth_1.default, userController_1.updateUserProfile);
router.get('/users/role/teacher', userController_1.getUserByRole);
exports.default = router;
