import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../database/data-source.js";
import { InvalidCredentialsError } from "../utils/error.js";

const login = async ({ username, password }) => {
  const userRepository = AppDataSource.getRepository("User");
  const user = await userRepository.findOne({ where: { username } });

  if (!user) {
    throw new InvalidCredentialsError();
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new InvalidCredentialsError();
  }

  const accessToken = jwt.sign(
    { sub: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { accessToken };
};

const authService = {
  login,
};

export default authService;
