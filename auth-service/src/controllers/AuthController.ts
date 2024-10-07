import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { Token } from "../models";
import { AuthServiceError } from "../utils";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { username, password, email } = req.body;
      await AuthService.register(email, password, username);
      res.json(200).json("success");
    } catch (error) {
      const statusCode =
        error instanceof AuthServiceError ? error.statusCode : 400;
      const message = error instanceof Error ? error.message : error;
      res.status(statusCode).json({ error: message });
    }
  }
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await AuthService.login(
        email,
        password
      );
      res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      const statusCode =
        error instanceof AuthServiceError ? error.statusCode : 400;
      const message = error instanceof Error ? error.message : error;
      res.status(statusCode).json({ error: message });
    }
  }

  static async refreshAccessToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const decoded = await AuthService.validateToken(refreshToken);
      const newAccessToken = AuthService.generateAccessToken(
        decoded.userId,
        decoded.username
      );
      res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      const statusCode =
        error instanceof AuthServiceError ? error.statusCode : 400;
      const message = error instanceof Error ? error.message : error;
      res.status(statusCode).json({ error: message });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      await Token.destroy({ where: { refreshToken: refreshToken } });
      res.status(200).json({ message: "Logged out" });
    } catch (error) {
      const statusCode =
        error instanceof AuthServiceError ? error.statusCode : 400;
      const message = error instanceof Error ? error.message : error;
      res.status(statusCode).json({ error: message });
    }
  }

  static async validateToken(req: Request, res: Response) {
    try {
      const { token } = req.body;
      const decoded = await AuthService.validateToken(token);
      res.status(200).json(decoded);
    } catch (error) {
      const statusCode =
        error instanceof AuthServiceError ? error.statusCode : 400;
      const message = error instanceof Error ? error.message : error;
      res.status(statusCode).json({ error: message });
    }
  }

  static async requestPasswordReset(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const resetToken = await AuthService.requestPasswordReset(email);
      res.status(200).json({ resetToken });
    } catch (error) {
      const statusCode =
        error instanceof AuthServiceError ? error.statusCode : 400;
      const message = error instanceof Error ? error.message : error;
      res.status(statusCode).json({ error: message });
    }
  }

  static async resetPassword(req: Request, res: Response) {
    try {
      const { token, newPassword } = req.body;
      await AuthService.resetPassword(token, newPassword);
      res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      const statusCode =
        error instanceof AuthServiceError ? error.statusCode : 400;
      const message = error instanceof Error ? error.message : error;
      res.status(statusCode).json({ error: message });
    }
  }
}
