import { Request, Response } from "express";
import { logger } from "../utils";
export class UserController {
  static getAllUsers = async (req: Request, res: Response) => {
    try {
      res.status(200).json({ user: "tedi", value: "test" });
    } catch (error) {
      logger.error({
        methodName: "getAllUsers",
        errorDescription: error,
      });
      res.status(500).json({ message: "Failed to fetch users" });
    }
  };
  static createUser = async (req: Request, res: Response) => {
    const { content, sender, roomId } = req.body;
    try {
      res.status(201).json({ status: "success", createdUser: "user" });
    } catch (error) {
      logger.error({
        methodName: "createUser",
        errorDescription: error,
      });
      res.status(500).json({ message: "Failed to create user" });
    }
  };
}
