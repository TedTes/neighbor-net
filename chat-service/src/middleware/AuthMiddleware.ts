import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { config } from "../config";
import { logger } from "../utils";
class AuthMiddleware {
  async validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token is missing" });
    }
    try {
      const response = await axios.get(config.authServiceAPI, {
        headers: { Authorization: `Bearer ${token}` },
      });
      req.user = response.data.user;
      next();
    } catch (error) {
      logger.error("Token validation error:", error);

      return res.status(401).json({
        message: "Invalid or expired token",
        error:
          error instanceof Error ? error.message : "Unable to validate token",
      });
    }
  }
}

export const authMiddleWare = new AuthMiddleware();
