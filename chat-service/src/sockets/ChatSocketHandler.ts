import { Server, Socket } from "socket.io";
import { ChatService } from "../services";
import { logger } from "../utils";

export const ChatSocketHandler = (io: Server, socket: Socket) => {
  const chatService = new ChatService();
  socket.on("join_channel", (channelName: string) => {
    socket.join(channelName);
    logger.info(`user joined channel ${channelName}`);
  });

  socket.on("send_message", async ({ channelName, message, userId }) => {
    io.to(channelName).emit("message", message);
    await chatService.createMessage(message, userId, channelName);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected from WebSocket");
  });
};
