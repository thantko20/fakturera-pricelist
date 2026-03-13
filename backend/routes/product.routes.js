import express from "express";
import { checkAuth } from "../middlewares/check-auth.middleware.js";
import { updateProductSchema } from "../schemas/product.schemas.js";
import productService from "../services/product.service.js";
import { ValidationError } from "../utils/error.js";

const productRoutes = express.Router();

productRoutes.get("/", checkAuth, async (req, res) => {
  return res.json(await productService.getAll());
});

productRoutes.put("/:id", checkAuth, async (req, res) => {
  const parsed = updateProductSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ValidationError();
  }

  return res.json(await productService.updateById(req.params.id, parsed.data));
});

export default productRoutes;
