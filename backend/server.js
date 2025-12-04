import express from "express";
import authRouter from "./routes/authRoutes.js";
import homeRouter from "./routes/authRoutes.js";
import contactRouter from "./routes/contactRoutes.js";
import serviceRouter from "./routes/serviceRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

dotenv.config();
const App = express();

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  // withCredentials: true,
  credentials: true,
  // exposedHeaders: ["Authorization"], // Expose Authorization header to frontend
};

// middleware
App.use(cors(corsOptions));
App.use(express.json());

// Route Paths
App.use("/api/home", homeRouter);
App.use("/api/auth", authRouter);
App.use("/api/form", contactRouter);
App.use("/api/data", serviceRouter);

// Admin Route
App.use("/api/admin", adminRouter);
App.use(errorMiddleware);

// Home route
App.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  App.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
