import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";
import { UnauthorizedError } from "../utils/error.js";

export const checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new UnauthorizedError();
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { password: _, ...user } = await userService.getById(payload.sub);
    if (!user) throw new UnauthorizedError();
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};
