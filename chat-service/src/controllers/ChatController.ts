import { Request, Response } from "express";
import { ChatService } from "../services";

export class ChatController {
  private chatService = new ChatService();

  getChatHistory = async (req: Request, res: Response) => {
    const roomId = req.params.roomId;
    try {
      const history = await this.chatService.getChatHistory(roomId);
      if (!history) {
        return res.status(404).json({ message: "Chat room not found" });
      }
      res.status(200).json(history);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chat history" });
    }
  };
  createMessage = async (req: Request, res: Response) => {
    const { content, sender, roomId } = req.body;
    try {
      const message = await this.chatService.createMessage(
        content,
        sender,
        roomId
      );
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ message: "Failed to create message" });
    }
  };
}
