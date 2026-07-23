import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string('Name is required')
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(100, "Name is too long"),

    email: z
        .email('Invalid email address')
        .trim()
        .toLowerCase(),

    password: z
        .string('Password is required')
        .min(6, "Password must be at least 6 characters")
        .max(50, "Password is too long")
});