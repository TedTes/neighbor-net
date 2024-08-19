import { Request, Response, NextFunction } from "express";
import { User } from "../models";
import _ from "lodash";
import { getErrorMessage } from "./error.controller";

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const user = new User(req.body);
  try {
    await user.save();
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
    let users = await User.find().select("name email updated created");
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
    let user = await User.findById(id);
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
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};
const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user = req.profile;
    user = _.extend(user, req.body);
    user.updated = Date.now();
    await user.save();
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
    let deletedUser = await user.remove();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};
export { create, userByID, read, list, remove, update };
