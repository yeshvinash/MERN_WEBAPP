import express from "express";
import {
  home,
  register,
  login,
  logout,
  user,
} from "../controlllers/authController.js";
import { validateMiddleware } from "../middleware/validateMiddleware.js";
import { loginSchema, registerSchema } from "../validators/authValidator.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
// ----------------- Router paths -----------------
// router.get("/", home);
// router.get("/register", register);

// you can write this way also
router.route("/").get(home);
router.route("/register").post(validateMiddleware(registerSchema), register);
router.route("/login").post(validateMiddleware(loginSchema), login);
router.route("/user").get(verifyToken, user);
router.route("/logout").get(logout);

export default router;
