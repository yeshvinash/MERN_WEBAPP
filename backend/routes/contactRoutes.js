import express from "express";

import { contact } from "../controlllers/contactController.js";
import { validateMiddleware } from "../middleware/validateMiddleware.js";
import { contactSchema } from "../validators/contactValidator.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Contact routes
router
  .route("/contact")
  .post(verifyToken, validateMiddleware(contactSchema), contact);

export default router;
