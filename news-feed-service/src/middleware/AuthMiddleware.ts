import axios from "axios";
import { Request, Response, NextFunction } from "express";
import { logger } from "../utils";
class AuthMiddleware {
  private userState: Map<string, UserState>;

  constructor() {
    this.userState = new Map();
  }

  async validateToken(token: string) {
    const response = await axios.post(
      "http://auth-service/api/v1/validateToken",
      {
        token,
      }
    );
    return response.data;
  }

  async handle(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    try {
      const data = await this.validateToken(token);
      if (data.user) {
        req.user = data.user;
        let userState = this.userState.get(data.user.userId);
        if (!userState) {
          userState = { requestCount: 0 };
          this.userState.set(data.user.userId, userState);
        }
        userState.requestCount += 1;
        logger.info(
          `User ${data.user.userId} has made ${userState.requestCount} requests`
        );

        next();
      } else {
        throw { message: "Invalid authentication token" };
      }
    } catch (error) {
      res.status(401).json({ message: `Unauthorized:${error}` });
    }
  }
}

export const authMiddleware = new AuthMiddleware().handle;
