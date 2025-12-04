import { z } from "zod";
// ----------------- Registration validation schema -----------------

export const registerSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email format" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// ----------------- Login validation schema ------------------
export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email format" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// export const validateRegistration = (req, res, next) => {
//   const { error } = registerSchema.safeParse(req.body);
//   if (error) {
//     return res.status(400).json({ error: error.message });
//   }
//   next();
// };
