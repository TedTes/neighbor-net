import { Request, Response } from "express";
import { userService, s3Service } from "../services";
import { User } from "../models";

class UserController {
  private _profilePhotoUrl = "";

  async createUser(req: Request, res: Response): Promise<Object | void> {
    try {
      const { username, email, password } = req.body;
      const file = req.file;
      if (!username || !email || !password) {
        return res.status(400).json({
          error: "All fields (username, email, password) are required",
        });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "Email is already registered" });
      }

      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) {
        return res.status(400).json({ error: "Username is already taken" });
      }
      if (file) {
        this._profilePhotoUrl = await s3Service.upload(file);
      }

      const token = await userService.createUser({
        username,
        email,
        password,
        profilePhotoUrl: this._profilePhotoUrl,
      });

      res.status(201).json(token);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  }

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
