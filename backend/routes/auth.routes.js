import express from "express";
import { loginSchema } from "../schemas/auth.schemas.js";
import authService from "../services/auth.service.js";
import { UnauthorizedError, ValidationError } from "../utils/error.js";
import { checkAuth } from "../middlewares/check-auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ValidationError();
  }

  return res.status(200).json({
    accessToken: await authService.login(parsed.data),
  });
});

authRoutes.get("/me", checkAuth, async (req, res) => {
  return res.json({
    user: req.user,
  });
});

export default authRoutes;
