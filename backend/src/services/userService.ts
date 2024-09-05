import { Request, Response, NextFunction } from "express";
import { User } from "../models";
import _ from "lodash";
import { userInput, userData, UserType, UserDocument } from "../interfaces";
import { logger } from "../utils";
export const createUserService = async ({
  name,
  email,
  password,
}: userInput): Promise<userData | null> => {
  try {
    const newUser = new User({
      name,
      email,
      password,
    });
    newUser._password = password;

    const userSaved = (await newUser.save()) as userData | null;
    return userSaved;
  } catch (err) {
    return null;
  }
};
export const listUsersService = async (): Promise<UserType[]> => {
  try {
    let users = await User.find().select("_id name email updated created");
    return users as UserType[];
  } catch (err) {
    logger.debug(
      JSON.stringify({
        method: "listUsersService",
        error: err,
      })
    );
    return [];
  }
};

export const findUserByIdService = async (
  id: string
): Promise<UserType | null> => {
  try {
    let user = await User.findById(id);
    return user as UserType;
  } catch (error) {
    logger.debug(
      JSON.stringify({
        methodName: "findUserByIdService",
        error,
      })
    );
    return null;
  }
};

export const updateUserService = async (
  user: UserDocument,
  userData: userInput
): Promise<UserDocument | null> => {
  try {
    const updatedUser = _.extend({}, user, userData);
    updatedUser.updated = new Date();
    const result = await updatedUser.save();
    return result;
  } catch (error) {
    logger.debug(
      JSON.stringify({
        methodName: "updateUserService",
        error,
      })
    );
    return null;
  }
};
export const removeUserService = async (
  user: UserDocument
): Promise<UserDocument | null> => {
  try {
    let deletedUser = await user.remove();
    return deletedUser;
  } catch (error) {
    logger.debug(
      JSON.stringify({
        methodName: "removeUserService",
        error,
      })
    );
    return null;
  }
};
