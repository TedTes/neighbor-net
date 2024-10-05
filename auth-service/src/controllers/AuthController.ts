import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.loginUser(email, password);
      res.status(200).json({ user, token });
    } catch (error) {
      res
        .status(400)
        .json({ error: error instanceof Error ? error.message : error });
    }
  }
}
