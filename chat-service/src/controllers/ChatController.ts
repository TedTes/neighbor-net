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
  async getUserChannels(req: Request, res: Response) {
    try {
      const userId = req.user?.userId as string;
      const channels = await this.chatService.getUserChannels(userId);
      res.status(200).json(channels);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user channels" });
    }
  }
  async createChannel(req: Request, res: Response) {
    const { participants, isGroupChat } = req.body;
    try {
      const newChannel = await this.chatService.createChannel(
        participants,
        isGroupChat
      );
      res.status(201).json(newChannel);
    } catch (error) {
      res.status(500).json({ message: "Failed to create channel" });
    }
  }
  async joinChannel(req: Request, res: Response) {
    const { channelId } = req.params;
    const userId = req.user?.userId as string;
    try {
      await this.chatService.addParticipantToChannel(channelId, userId);
      res.status(200).json({ message: "Joined channel successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to join channel" });
    }
  }
  async leaveChannel(req: Request, res: Response) {
    const { channelId } = req.params;
    const userId = req.user?.userId as string;
    try {
      await this.chatService.removeParticipantFromChannel(channelId, userId);
      res.status(200).json({ message: "Left channel successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to leave channel" });
    }
  }
  async deleteMessage(req: Request, res: Response) {
    const { messageId, channelId } = req.params;
    try {
      await this.chatService.deleteMessage(messageId, channelId);
      res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete message" });
    }
  }
}
