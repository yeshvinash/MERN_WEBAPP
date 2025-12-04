import { z } from "zod";

// ----------------- Contact validation schema -----------------
export const contactSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email format" }),
  message: z
    .string({ required_error: "Message cannot be empty." })
    .trim()
    .min(10, { message: "Message must be at least 10 characters long." }) // Custom message for min length
    .max(200, { message: "Message cannot exceed 200 characters." }), // Custom message for max length
});
