import { Schema, model } from "mongoose";

interface IMessage {
  sender: string;
  message: string;
  messageType: string;
  timestamp: Date;
}
interface IChat extends Document {
  _id: string;
  participants: string[];
  isGroupChat: boolean;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}
const chatSchema: Schema = new Schema(
  {
    participants: [{ type: String, required: true }],
    isGroupChat: { type: Boolean, required: true },
    messages: [
      {
        sender: { type: String, required: true },
        message: { type: String, required: true },
        messageType: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const ChatModel = model<IChat>("Chats", chatSchema);
