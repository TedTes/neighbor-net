import { MessageModel } from "../models";

export class ChatService {
  async getChatHistory(roomId: string): Promise<any> {
    try {
      return await MessageModel.find({ chatRoom: roomId }).sort({
        timestamp: 1,
      });
    } catch (error) {
      throw new Error("Failed to fetch chat history");
    }
  }

  async createMessage(
    content: string,
    sender: string,
    roomId: string
  ): Promise<any> {
    const newMessage = new MessageModel({ content, sender, chatRoom: roomId });
    return await newMessage.save();
  }
}
