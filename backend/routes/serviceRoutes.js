import express from "express";
import { services } from "../controlllers/serviceController.js";

const router = express.Router();

// Service routes
router.route("/service").get(services);

export default router;
