import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";

export class AuthMiddleware {
  static authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = AuthService.verifyToken(token.split(" ")[1]);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid Token" });
    }
  }
}
