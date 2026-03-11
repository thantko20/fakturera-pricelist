import "reflect-metadata";
import authService from "../services/auth.service.js";
import { AppDataSource } from "../database/data-source.js";
import { logger } from "../utils/logger.js";

try {
  await AppDataSource.initialize();

  const user = await authService.createUser({
    email: "johndoe@example.com",
    password: "password123",
  });

  logger.info({
    message: "user created",
    email: user.email,
  });
} catch (error) {
  logger.error(error, "failed to create user");
  process.exitCode = 1;
} finally {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
}
