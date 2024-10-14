import { ChatModel } from "../models";

export class ChatService {
  async getChatHistory(roomId: string): Promise<any> {
    try {
      return await ChatModel.findOne({ _id: roomId }).sort({
        "messages.timestamp": 1,
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
    const message = {
      sender,
      message: content,
      messageType: "text",
      timeStamp: new Date(),
    };
    return ChatModel.findByIdAndUpdate(
      roomId,
      { $push: { messages: message } },
      { new: true }
    );
  }
}
