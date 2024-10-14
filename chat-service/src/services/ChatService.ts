import { ChatModel } from "../models";
import { IMessage } from "../models";
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
  async createChannel(
    participants: string[],
    isGroupChat: boolean
  ): Promise<any> {
    try {
      const newChatRoom = new ChatModel({
        participants,
        isGroupChat,
        messages: [],
      });
      return await newChatRoom.save();
    } catch (error) {
      throw new Error("Failed to create chat room");
    }
  }

  async listParticipants(roomId: string): Promise<string[]> {
    try {
      const chatRoom = await ChatModel.findById(roomId).exec();
      if (!chatRoom) {
        throw new Error("Chat room not found");
      }
      return chatRoom.participants;
    } catch (error) {
      throw new Error("Failed to retrieve participants");
    }
  }
  async getUserChannels(userId: string): Promise<any> {
    try {
      const userChatRooms = await ChatModel.find({
        participants: userId,
      }).exec();
      return userChatRooms;
    } catch (error) {
      throw new Error("Failed to fetch user's chat rooms");
    }
  }
  async deleteMessage(roomId: string, messageId: string): Promise<any> {
    try {
      const chatRoom = await ChatModel.findById(roomId);
      if (!chatRoom) throw new Error("Chat room not found");

      chatRoom.messages = chatRoom.messages.filter(
        (message: IMessage) => message._id !== messageId
      );
      await chatRoom.save();
      return chatRoom;
    } catch (error) {
      throw new Error("Failed to delete message");
    }
  }
  async removeParticipantFromChannel(
    channelId: string,
    userId: string
  ): Promise<any> {
    try {
      const channel = await ChatModel.findById(channelId);
      if (!channel) throw new Error("Chat room not found");

      channel.participants = channel.participants.filter(
        (participant) => participant !== userId
      );
      await channel.save();
      return channel;
    } catch (error) {
      throw new Error("Failed to remove participant");
    }
  }
  async addParticipantToChannel(
    channelId: string,
    userId: string
  ): Promise<any> {
    try {
      const channel = await ChatModel.findById(channelId);
      if (!channel) throw new Error("channel not found");

      if (!channel.participants.includes(userId)) {
        channel.participants.push(userId);
        await channel.save();
      }
      return channel;
    } catch (error) {
      throw new Error("Failed to add participant");
    }
  }
}
