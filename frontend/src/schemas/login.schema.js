import z from "zod";

export const LoginSchema = z.object({
  username: z
    .string("login.error.username.missing")
    .min(1, "login.error.username.missing"),
  password: z
    .string("login.error.password.missing")
    .min(6, "login.error.password.min"),
});
