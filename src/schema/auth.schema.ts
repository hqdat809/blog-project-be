import { z } from "zod";

export const emailSchema = z.string().email().min(1).max(255);

export const nameSchema = z.string().min(1);

const passwordSchema = z.string().min(6).max(255);

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = loginSchema
  .extend({
    name: nameSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
