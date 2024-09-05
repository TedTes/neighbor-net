import { Request, Response, NextFunction, RequestHandler } from "express";
import { User } from "../models";
import jwt from "jsonwebtoken";
import { logger } from "../utils/logger";
import { expressjwt } from "express-jwt";
import { jwtConfig } from "../config";
import { SigninService } from "../services";
import { responseData } from "../interfaces";

const signin = async (req: Request, res: Response) => {
  try {
    let response: responseData | null = await SigninService({
      email: req.body.email,
      password: req.body.password,
    });
    if (!response) {
      return res
        .status(401)
        .json({ error: "User not found or authentication failed" });
    }
    const { token, expirationDate, user } = response;
    if (!user) return res.status(401).json({ error: "User not found" });
    if (!user.authenticate(req.body.password)) {
      return res.status(401).send({ error: "Email and password don't match." });
    }

    res.cookie("auth_token", token, { expires: expirationDate });
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    logger.error(JSON.stringify(err));
    return res.status(401).json({ error: "Could not sign in" });
  }
};
const signout = (req: Request, res: Response) => {
  res.clearCookie("auth_token");
  return res.status(200).json({
    message: "signed out",
  });
};
const requireSignin = expressjwt({
  secret: jwtConfig.jwtSecret as string,
  algorithms: ["HS256"],
  requestProperty: "user",
});
const hasAuthorization = (req: Request, res: Response, next: NextFunction) => {
  const authorized = req.profile && req.user && req.profile._id == req.user._id;

  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }
  next();
};
export { signin, signout, requireSignin, hasAuthorization };
