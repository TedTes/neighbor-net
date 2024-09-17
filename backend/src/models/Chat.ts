import { Schema, model } from "mongoose";

interface chatSchemaType extends Document {
  _id: string;
  participants: string[];
  isGroupChat: boolean;
  messages: {
    sender: string;
    message: string;
    messageType: string;
    timestamp: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
const chatSchema: Schema<chatSchemaType> = new Schema(
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

export const Chat = model<chatSchemaType>("Chats", chatSchema);
