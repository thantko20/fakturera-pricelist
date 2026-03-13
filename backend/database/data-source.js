import dotenv from "dotenv";
import { DataSource } from "typeorm";
import User from "./entities/User.entity.js";
import Translation from "./entities/Translation.entity.js";
import Product from "./entities/Product.entity.js";

dotenv.config({ path: ".env" });

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  entities: [User, Translation, Product],
});
