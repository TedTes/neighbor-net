import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models";

export class AuthService {
  static async loginUser(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      }
    );

    return { user, token };
  }

  static verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET || "secret");
  }
}
