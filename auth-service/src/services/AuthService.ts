import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models";
import { Token } from "../models";
import { AuthServiceError } from "../utils";

export class AuthService {
  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Invalid credentials");

    const accessToken = this.generateAccessToken(user.id, user.username);
    const refreshToken = this.generateRefreshToken(user.id);

    await Token.create({ userId: user.id, refreshToken: refreshToken });

    return { accessToken, refreshToken };
  }

  static generateAccessToken(userId: number, username: string) {
    return jwt.sign({ userId, username }, process.env.JWT_SECRET as string, {
      expiresIn: "1hr",
    });
  }

  static generateRefreshToken(userId: number) {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET as string, {
      expiresIn: "7d",
    });
  }
  static async validateToken(token: string): Promise<JwtPayload> {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;
      return decoded;
    } catch (error) {
      throw new AuthServiceError("Invalid token");
    }
  }

  static async requestPasswordReset(email: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new AuthServiceError("User not found");

    const resetToken = this.generateAccessToken(user.id, user.username);

    // TODO: Send reset token to user (via email)
    // await EmailService.sendResetLink(user.email, resetToken);
    return resetToken;
  }
  static async resetPassword(token: string, newPassword: string) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (typeof decoded === "object" && (decoded as JwtPayload).userId) {
      const user = await User.findByPk(decoded.userId);
      if (!user) throw new AuthServiceError("User not found");
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
    } else {
      throw new AuthServiceError("Invalid token");
    }
  }
}
