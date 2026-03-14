import { Not } from "typeorm";
import { AppDataSource } from "../database/data-source.js";
import Product from "../database/entities/Product.entity.js";
import {
  NotFoundError,
  ProductArticleNoAlreadyExistsError,
  ProductNameAlreadyExistsError,
} from "../utils/error.js";

const getAll = async () => {
  const productRepository = AppDataSource.getRepository(Product);
  return await productRepository.find({
    order: {
      createdAt: "asc",
    },
  });
};

const updateById = async (id, payload) => {
  const productRepository = AppDataSource.getRepository(Product);
  const product = await productRepository.findOne({ where: { id } });

  if (!product) {
    throw new NotFoundError("Product not found");
  }

  const productWithSameName = await productRepository.findOne({
    where: { name: payload.name, id: Not(id) },
  });

  if (productWithSameName) {
    throw new ProductNameAlreadyExistsError(payload.name);
  }

  const productWithSameArticleNo = await productRepository.findOne({
    where: { articleNo: payload.articleNo, id: Not(id) },
  });

  if (productWithSameArticleNo) {
    throw new ProductArticleNoAlreadyExistsError(payload.articleNo);
  }

  const updatedProduct = productRepository.merge(product, payload);
  return await productRepository.save(updatedProduct);
};

const productService = {
  getAll,
  updateById,
};

export default productService;
