import { Request, Response, NextFunction, RequestHandler } from "express";
import { logger } from "../utils/logger";
import { expressjwt } from "express-jwt";
import { AuthService } from "../services";
import { config } from "../config";
import jwt from "jsonwebtoken";
const { isSecure, jwtSecret } = config;
export class AuthController {
  static login = async (req: Request, res: Response) => {
    try {
      let { isValid, user } = await AuthService.login({
        email: req.body.email,
        password: req.body.password,
      });
      if (!isValid || !user) throw new Error("Invalid credentials");

      const token = AuthService.generateToken(user);

      const expirationDate = new Date(Date.now() + 9999 * 1000);
      res.cookie("auth_token", token, {
        expires: expirationDate,
        httpOnly: true,
        secure: isSecure,
      });

      return res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
        },
        token,
        expirationDate,
      });
    } catch (err: unknown) {
      logger.error(JSON.stringify(err));
      return res
        .status(401)
        .json({ error: `Could not sign in:${(err as Error).message}` });
    }
  };
  static logout = async (req: Request, res: Response) => {
    try {
      res.clearCookie("auth_token");
      return res.status(200).json({
        message: "signed out",
      });
    } catch (err: unknown) {
      logger.error(JSON.stringify(err));
      return res
        .status(500)
        .json({ error: `Logout failed: ${(err as Error).message}` });
    }
  };
  static refreshToken = async (req: Request, res: Response) => {
    try {
      const oldToken = req.cookies.auth_token;
      if (!oldToken) throw new Error("Token not found");

      const decoded = jwt.verify(oldToken, jwtSecret);

      if (typeof decoded !== "object" || !("id" in decoded)) {
        throw new Error("Invalid token");
      }
      const user = await AuthService.findUserById(decoded.id);

      if (!user) throw new Error("User not found");

      const newToken = AuthService.generateToken(user);

      const expirationDate = new Date(Date.now() + 3600 * 1000);
      res.cookie("auth_token", newToken, {
        expires: expirationDate,
        httpOnly: true,
        secure: isSecure,
      });
      return res.status(200).json({ token: newToken, expirationDate });
    } catch (err: unknown) {
      logger.error(JSON.stringify(err));
      return res
        .status(401)
        .json({ error: `Could not refresh token: ${(err as Error).message}` });
    }
  };

  hasAuthorization = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let userId = Number(req.params.userId);
      let user = await AuthService.findUserById(userId);
      if (!user) throw "User not found";

      const authorized = userId == user.id || user.role === "admin";

      if (!authorized) {
        return res.status(403).json({
          error: "User is not authorized",
        });
      }
      next();
    } catch (error: unknown) {
      logger.error(`Error checking authorization: ${(error as Error).message}`);
      return res.status(403).json({ error: "User is not authorized" });
    }
  };
  requireSignin = expressjwt({
    secret: jwtSecret as string,
    algorithms: ["HS256"],
    requestProperty: "user",
  });
}
