import { Request, Response } from "express";

export class UserController {
  static getAllUsers = async (req: Request, res: Response) => {
    const roomId = req.params.roomId;
    try {
      res.status(200).json(history);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chat history" });
    }
  };
  static createUser = async (req: Request, res: Response) => {
    const { content, sender, roomId } = req.body;
    try {
      res.status(201).json();
    } catch (error) {
      res.status(500).json({ message: "Failed to create message" });
    }
  };
}
