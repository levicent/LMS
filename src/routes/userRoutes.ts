import express from "express";
const router = express.Router();
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserProfile,
  updateUserProfile,
  getUserByRole,
} from "../controllers/userController";
import authMiddleware from "../middleware/auth";
import checkRole from "../middleware/role";

router.post("/users", authMiddleware, checkRole(["admin"]), createUser);
router.get(
  "/users",
  authMiddleware,
  checkRole(["admin", "teacher"]),
  getAllUsers
);
router.get(
  "/users/:id",
  authMiddleware,
  checkRole(["admin", "teacher"]),
  getUserById
);
router.put(
  "/users/:id",
  authMiddleware,
  checkRole(["admin", "student"]),
  updateUserById
);
router.delete(
  "/users/:id",
  authMiddleware,
  checkRole(["admin"]),
  deleteUserById
);

router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);
router.get('/users/role/teacher', getUserByRole);

export default router;
