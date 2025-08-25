import jwt from "jsonwebtoken";
import {
  IJwtPayload,
  IJwtPayloadChangePassword,
} from "../interfaces/IJwtPayload";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const generateToken = (payload: IJwtPayload): string => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET!, { expiresIn: "1h" });
};

export const generateTokenMobile = (payload: IJwtPayload): string => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET!, { expiresIn: "150d" });
};

export const generateTokenChangePassword = (
  payload: IJwtPayloadChangePassword
): string => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET!, { expiresIn: "15m" });
};
