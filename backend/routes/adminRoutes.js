import express from "express";
import {
  getAllContacts,
  getAllUsers,
  deleteUserById,
  getUserById,
  updateUserById,
  deleteContactById,
} from "../controlllers/adminController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.route("/users").get(verifyToken, adminMiddleware, getAllUsers);
router.route("/users/:id").get(verifyToken, adminMiddleware, getUserById);
router
  .route("/users/delete/:id")
  .delete(verifyToken, adminMiddleware, deleteUserById);
router
  .route("/users/update/:id")
  .put(verifyToken, adminMiddleware, updateUserById);

router.route("/contacts").get(verifyToken, adminMiddleware, getAllContacts);
router
  .route("/contacts/delete/:id")
  .delete(verifyToken, adminMiddleware, deleteContactById);

export default router;
