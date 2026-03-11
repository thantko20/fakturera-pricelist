import z from "zod";

export const LoginSchema = z.object({
  username: z
    .string("login_username_missing_error")
    .min(1, "login_username_missing_error"),
  password: z
    .string("login_password_missing_error")
    .min(6, "login_password_min_error"),
});
