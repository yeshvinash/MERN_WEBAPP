import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { registerSchema, loginSchema } from "../validators/authValidator.js";

// env config

// ----------------- Home logic -----------------
export const home = async (req, res) => {
  try {
    res.status(200).json({ message: "API is running 🚀" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ----------------- Registration logic -----------------
export const register = async (req, res, next) => {
  try {
    // const { name, email, password } = registerSchema.parse(req.body);
    const { name, email, password } = req.body;
    console.log("Register request body:", req.body);

    // check user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists for email:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Hashed password:", hashedPassword);

    // // Create new user
    // const newUser = new User({
    //   name,
    //   email,
    //   password: hashedPassword,
    // });

    // await newUser.save();

    const user = await User.create({ name, email, password: hashedPassword });

    //1.) Debugging token generation
    // let token;
    // try {
    //   token = await user.generateToken();
    //   if (!token) {
    //     console.error("Token generation failed: token is null or undefined.");
    //   } else {
    //     console.log("Generated token:", token);
    //   }
    // } catch (tokenErr) {
    //   console.error("Error generating token:", tokenErr);
    //   return res.status(500).json({ error: "Token generation failed" });
    // }

    //2.) Generate JWT Token using simple method
    const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    // res.setHeader("Authorization", `Bearer ${token}`);
    res.status(201).header("Authorization", `Bearer ${token}`).json({
      message: "User registered successfully",
      user,
      token,
      userId: user._id.toString(),
    });

    // Debug raw user data:
    // console.log("Registered user object:", user);
    // res.status(200).json({ message: "Welcome to the Registration page" });
    // res.status(200).json({ message: req.body });
  } catch (err) {
    console.error("Registration error:", err);
    // res.status(500).json({ error: err.message });
    next(err);
  }
};

// ----------------- Login logic -----------------
export const login = async (req, res, next) => {
  try {
    ``;
    // const { email, password } = loginSchema.parse(req.body);
    const { email, password } = req.body;
    const userExit = await User.findOne({ email });
    if (!userExit) {
      res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await userExit.isPasswordValid(password);
    // const isMatch = await bcrypt.compare(password, userExit.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials ❌" });
    }

    //2.) Generate JWT Token using simple method
    const token = jwt.sign(
      { id: userExit._id, email: userExit.email, isAdmin: userExit.isAdmin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    //  res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).header("Authorization", `Bearer ${token}`).json({
      message: "Login successful ✅",
      token,
      userExit,
      // user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

// ----------------- Logout logic -----------------

export const logout = async (req, res, next) => {
  try {
    // res.clearCookie("jwt");
    res.status(200).json({
      message: "Logout successful ✅",
      success: true,
      status: 200,
      data: null,
    });
  } catch (error) {
    console.error("Logout error:", error);
    next(error);
  }
};

// ----------------- UserData logic -----------------

export const user = async (req, res) => {
  try {
    const userData = await req.user;
    res.status(200).json({ message: userData });
    console.log(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
