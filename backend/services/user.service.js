import { AppDataSource } from "../database/data-source.js";

const userRepository = AppDataSource.getRepository("User");

const getById = async (id) => {
  return await userRepository.findOne({ where: { id } });
};

const userService = {
  getById,
};

export default userService;
