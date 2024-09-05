import { User } from "../models";
import jwt from "jsonwebtoken";
import { logger } from "../utils/logger";
import { expressjwt } from "express-jwt";
import { jwtConfig } from "../config";
import { userInput, userData, responseData } from "../interfaces";

export const SigninService = async (
  userCreds: userInput
): Promise<responseData | null> => {
  try {
    const user = (await User.findOne({
      email: userCreds.email,
    }).exec()) as userData | null;
    if (!user) return null;

    const token = jwt.sign({ _id: user._id }, jwtConfig.jwtSecret, {
      algorithm: "HS256",
      expiresIn: "1h",
    });
    const expirationDate = new Date(Date.now() + 9999 * 1000);
    return {
      token,
      expirationDate,
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        authenticate: user.authenticate.bind(user),
      },
    };
  } catch (err) {
    logger.error(JSON.stringify(err));
    return null;
  }
};
