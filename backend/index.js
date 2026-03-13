import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import "reflect-metadata";
import { logger, httpLogger } from "./utils/logger.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./utils/error.js";
import translationRoutes from "./routes/translation.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(helmet());
app.use(
  // cors({
  //   origin: process.env.CORS_ORIGIN,
  // })
  cors("*")
);
app.use(httpLogger);

app.get("/", async (req, res) => {
  return res.json({
    hello: "world",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/translations/locales", translationRoutes);
app.use("/api/products", productRoutes);

app.use(errorHandler);

try {
  const { AppDataSource } = await import("./database/data-source.js");
  await AppDataSource.initialize();
  logger.info("database connected");

  process.on("SIGINT", async () => {
    logger.info("shutting down gracefully");
    await AppDataSource.destroy();
    process.exit(0);
  });

  app.listen(3000, (err) => {
    if (err) {
      logger.error(err, "failed to start server");
      process.exit(1);
    }
    logger.info("server running on port 3000");
  });
} catch (error) {
  logger.error(error, "failed to initialize database");
  process.exit(1);
}
