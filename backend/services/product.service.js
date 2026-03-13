import { AppDataSource } from "../database/data-source.js";
import Product from "../database/entities/Product.entity.js";
import { NotFoundError } from "../utils/error.js";

const getAll = async () => {
  const productRepository = AppDataSource.getRepository(Product);
  return await productRepository.find({
    order: {
      articleNo: "asc",
    },
  });
};

const updateById = async (id, payload) => {
  const productRepository = AppDataSource.getRepository(Product);
  const product = await productRepository.findOne({ where: { id } });

  if (!product) {
    throw new NotFoundError("Product not found");
  }

  const updatedProduct = productRepository.merge(product, payload);
  return await productRepository.save(updatedProduct);
};

const productService = {
  getAll,
  updateById,
};

export default productService;
