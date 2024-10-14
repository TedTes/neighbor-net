import { Server, Socket } from "socket.io";
import { ChatService } from "../services";
import { logger } from "../utils";
import axios from "axios";
import { config } from "../config";
export const ChatSocketHandler = (io: Server) => {
  const chatService = new ChatService();
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      const response = await axios.get(config.authServiceAPI, {
        headers: { Authorization: `Bearer ${token}` },
      });
      socket.data.user = response.data.user;
      next();
    } catch (error) {
      next(new Error("Unauthorized"));
    }
  });
  io.on("connection", (socket: Socket) => {
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
  });
};
