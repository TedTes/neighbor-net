import { User } from "../models";
import { AuthDataSource } from "../utils/database";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config";

const { jwtExpiresIn, jwtSecret } = config;
export class AuthService {
  static async login({ email, password }: { email: string; password: string }) {
    const user = await AuthDataSource.getRepository(User).findOne({
      where: { email },
    });
    if (!user) {
      return { isValid: false, user: null };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { isValid: false, user: null };
    }

    return { isValid: true, user };
  }

  static async findUserById(id: number) {
    const user = await AuthDataSource.getRepository(User).findOne({
      where: { id },
    });

    return user;
  }

  static generateToken(user: User) {
    return jwt.sign({ id: user.id }, jwtSecret, {
      algorithm: "HS256",
      expiresIn: jwtExpiresIn, // Set expiration time for the token
    });
  }
}
