import jwt from "jsonwebtoken";
import config from "../config";

export const createToken = (userId: number) => {
  return jwt.sign({ userId }, config.jwtSecret!, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwtSecret!);
};
