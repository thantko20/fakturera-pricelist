import z from "zod";

export const LoginSchema = z.object({
  email: z
    .string("login.error.email.invalid")
    .min(1, "login.error.email.invalid"),
  password: z
    .string("login.error.password.missing")
    .min(6, "login.error.password.min"),
});
