import { Request, Response } from "express";
import { userService } from "../services/UserService"; // Import the service

class UserController {
  // Create a new user
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }

  // Update user profile photo
  async updateProfilePhoto(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const file = req.file;

      const user = await userService.updateProfilePhoto(Number(userId), file);
      res.status(200).json(user);
    } catch (error) {
      res
        .status(400)
        .json({ error: error instanceof Error ? error.message : error });
    }
  }
}

export const userController = new UserController();
