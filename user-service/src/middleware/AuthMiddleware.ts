import { Request, Response, NextFunction } from "express";
import axios from "axios";

class AuthMiddleware {
  public async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
      }

      const token = authHeader.split(" ")[1];

      const authServiceUrl =
        process.env.AUTH_SERVICE_URL ||
        "http://auth-service:3000/api/v1/auth/verifyToken";
      const response = await axios.post(authServiceUrl, { token });

      if (response.status !== 200 || !response.data.isValid) {
        return res.status(401).json({ message: "Invalid token" });
      }

      // Attach user information to the request object
      req.user = response.data.user;

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Failed to authenticate",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}

export const authMiddleware = new AuthMiddleware();
