import { User, IUser } from "../models";
import { userInput, userData, responseData } from "../types/User";

import { logger } from "../utils/logger";
import bcrypt from "bcrypt";
import { UserType } from "../types";
export class AuthService {
  static login = async (
    credentials: userInput
  ): Promise<{ isValid: boolean; user?: IUser }> => {
    try {
      const user = await User.findOne({
        email: credentials.email,
      }).exec();
      if (!user) throw new Error("User not found");

      const isValid: boolean = await bcrypt.compare(
        credentials.password,
        user.password
      );
      return { isValid, user };
    } catch (error) {
      logger.error(JSON.stringify(error));
      return { isValid: false };
    }
  };
  static async register(userData: Partial<IUser>) {
    try {
      if (!userData.password) throw new Error("password is required!");
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({ ...userData, password: hashedPassword });
      await user.save();
      return user;
    } catch (error) {
      logger.error(JSON.stringify(error));
      return null;
    }
  }
  static async findUserById(userId: string): Promise<UserType | null> {
    try {
      let user = await User.findById(userId);
      if (!user) return null;

      const userObject: UserType = {
        _id: user._id as string,
        email: user.email,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt,
      };
      return user as UserType;
    } catch (error) {
      logger.error(`Error finding user with ID ${userId}: ${error}`);
      return null;
    }
  }
}
