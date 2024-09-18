import { Request, Response, NextFunction, RequestHandler } from "express";
import { logger } from "../utils/logger";
import { expressjwt } from "express-jwt";
import { responseData } from "../types/User";
import { AuthService } from "../services";
import { jwtConfig } from "../config";
import jwt from "jsonwebtoken";
export class AuthController {
  static login = async (req: Request, res: Response) => {
    try {
      let { isValid, user } = await AuthService.login({
        email: req.body.email,
        password: req.body.password,
      });
      if (!isValid) throw new Error("Invalid credentials");

      const token = jwt.sign({ _id: user?._id }, jwtConfig.jwtSecret, {
        algorithm: "HS256",
        expiresIn: "1h",
      });
      const expirationDate = new Date(Date.now() + 9999 * 1000);
      res.cookie("auth_token", token, { expires: expirationDate });

      return {
        user: {
          _id: user?._id as string,
          email: user?.email,
        },
        token,
        expirationDate,
      };
    } catch (err) {
      logger.error(JSON.stringify(err));
      return res.status(401).json({ error: `Could not sign in:${err}` });
    }
  };
  static logout = async (req: Request, res: Response) => {
    try {
      // let { isValid, user } = await AuthService.login({
      //   email: req.body.email,
      //   password: req.body.password,
      // });
      // if (!isValid) throw new Error("Invalid credentials");
      // const token = jwt.sign({ _id: user?._id }, jwtConfig.jwtSecret, {
      //   algorithm: "HS256",
      //   expiresIn: "1h",
      // });
      // const expirationDate = new Date(Date.now() + 9999 * 1000);
      // res.cookie("auth_token", token, { expires: expirationDate });
      // return {
      //   user: {
      //     _id: user?._id as string,
      //     email: user?.email,
      //   },
      //   token,
      //   expirationDate,
      // };
      res.clearCookie("auth_token");
      return res.status(200).json({
        message: "signed out",
      });
    } catch (err) {
      logger.error(JSON.stringify(err));
      return res.status(401).json({ error: `Could not sign in:${err}` });
    }
  };
  static refreshToken = async (req: Request, res: Response) => {
    try {
      // let { isValid, user } = await AuthService.login({
      //   email: req.body.email,
      //   password: req.body.password,
      // });
      // if (!isValid) throw new Error("Invalid credentials");
      // const token = jwt.sign({ _id: user?._id }, jwtConfig.jwtSecret, {
      //   algorithm: "HS256",
      //   expiresIn: "1h",
      // });
      // const expirationDate = new Date(Date.now() + 9999 * 1000);
      // res.cookie("auth_token", token, { expires: expirationDate });
      // return {
      //   user: {
      //     _id: user?._id as string,
      //     email: user?.email,
      //   },
      //   token,
      //   expirationDate,
      // };
    } catch (err) {
      logger.error(JSON.stringify(err));
      return res.status(401).json({ error: `Could not sign in:${err}` });
    }
  };
  static verifyToken = async (req: Request, res: Response) => {
    try {
      // let { isValid, user } = await AuthService.login({
      //   email: req.body.email,
      //   password: req.body.password,
      // });
      // if (!isValid) throw new Error("Invalid credentials");
      // const token = jwt.sign({ _id: user?._id }, jwtConfig.jwtSecret, {
      //   algorithm: "HS256",
      //   expiresIn: "1h",
      // });
      // const expirationDate = new Date(Date.now() + 9999 * 1000);
      // res.cookie("auth_token", token, { expires: expirationDate });
      // return {
      //   user: {
      //     _id: user?._id as string,
      //     email: user?.email,
      //   },
      //   token,
      //   expirationDate,
      // };
    } catch (err) {
      logger.error(JSON.stringify(err));
      return res.status(401).json({ error: `Could not sign in:${err}` });
    }
  };
  // static async register(req: Request, res: Response) {
  //   try {
  //     const user = await AuthService.register(req.body);
  //     res.status(201).json(user);
  //   } catch (error: any) {
  //     res.status(400).json({ error: error.message });
  //   }
  // }
  // signout = (req: Request, res: Response) => {
  //   res.clearCookie("auth_token");
  //   return res.status(200).json({
  //     message: "signed out",
  //   });
  // };
  hasAuthorization = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let user = await AuthService.findUserById(req.params.userId);
      if (!user) throw "User not found";

      const authorized = req.params.userId == user._id;

      if (!authorized) {
        return res.status(403).json({
          error: "User is not authorized",
        });
      }
      next();
    } catch (error) {
      logger.debug("Error checking Authorization", error);
      return null;
    }
  };
  requireSignin = expressjwt({
    secret: jwtConfig.jwtSecret as string,
    algorithms: ["HS256"],
    requestProperty: "user",
  });
}
