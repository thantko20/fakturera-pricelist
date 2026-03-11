import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../database/data-source.js";
import { InvalidCredentialsError } from "../utils/error.js";
import User from "../database/entities/User.entity.js";

const login = async ({ email, password }) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { email } });

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

  const { password: _, ...userWithoutPassword } = user;

  return { accessToken, user: userWithoutPassword };
};

const createUser = async ({ email, password }) => {
  const userRepository = AppDataSource.getRepository(User);
  const existingUser = await userRepository.findOne({ where: { email } });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = userRepository.create({ email, password: hashedPassword });
  await userRepository.save(newUser);

  const { password: _, ...userWithoutPassword } = newUser;

  return userWithoutPassword;
};

const authService = {
  login,
  createUser,
};

export default authService;
