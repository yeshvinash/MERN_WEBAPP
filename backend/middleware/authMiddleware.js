import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userData = await User.findOne({ email: decoded.email }).select(
      "-password"
    );
    console.log(userData);
    req.user = userData; // attach user data to request
    req.token = token;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};
