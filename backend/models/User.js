import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ----------------- Compare Password method -----------------
userSchema.methods.isPasswordValid = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error("Invalid password");
  }
};

// ----------------- Pre-save middleware -----------------
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
//   next();
// });

//1.) Json web token  generate using the methods
// userSchema.methods.generateToken = async function () {
//   try {
//     return jwt.sign(
//       {
//         userId: this._id.toString(),
//         email: this.email,
//         isAdmin: this.isAdmin,
//       },
//       process.env.JWT_SECRET_KEY,
//       {
//         expiresIn: "1h",
//       }
//     );
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// -------------------------------------------------------------
// const User = mongoose.model("User", userSchema);
// -------------------------------------------------------------
export default mongoose.model("User", userSchema);
