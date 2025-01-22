import jwt from "jsonwebtoken";
import config from "../config";

export const createToken = (userId: number) => {
  return jwt.sign({ userId }, config.jwtSecret!, { expiresIn: "1h" });
};

export const verifyToken = (
  token: string
): { userId: number | null } | null => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret!) as { userId: number };
    return { userId: decoded.userId };
  } catch (error) {
    return null;
  }
};
