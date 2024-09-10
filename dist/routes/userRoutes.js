"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controllers/userController");
router.post("/users", userController_1.createUser);
router.get("/users", userController_1.getAllUsers);
router.get("/users/:id", userController_1.getUserById);
router.put("/users/:id", userController_1.updateUserById);
router.delete("/users/:id", userController_1.deleteUserById);
exports.default = router;
