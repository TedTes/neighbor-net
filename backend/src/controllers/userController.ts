import { Request, Response, NextFunction } from "express";
import { User } from "../models";
import _ from "lodash";
import { getErrorMessage } from "./error.controller";
import {
  createUserService,
  listUsersService,
  findUserByIdService,
  updateUserService,
  removeUserService,
} from "../services";
const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { name, email, password } = req.body;
    await createUserService({ name, email, password });
    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};
const list = async (req: Request, res: Response) => {
  try {
    let users = await listUsersService();
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};
const userByID = async (
  req: Request,
  res: Response,
  next: NextFunction,
  id: string
): Promise<Response | void> => {
  try {
    let user = await findUserByIdService(id);
    if (!user)
      return res.status(400).json({
        error: "User not found",
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve user",
    });
  }
};
const read = (req: Request, res: Response) => {
  try {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
  } catch (error) {
    return res.status(400).json({
      error: getErrorMessage(error),
    });
  }
};
const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user = req.profile;
    await updateUserService(user, req.body);
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};
const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user = req.profile;
    const deletedUser = await removeUserService(user);
    if (deletedUser) {
      deletedUser.hashed_password = undefined;
      deletedUser.salt = undefined;
    }
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};
export { create, userByID, read, list, remove, update };
