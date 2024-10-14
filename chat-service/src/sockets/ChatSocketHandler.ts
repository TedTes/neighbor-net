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
    logger.info(`User connected: ${socket.data.user.username}`);

    socket.on("join_channel", async (channelName: string) => {
      socket.join(channelName);
      logger.info(
        `User ${socket.data.user.username} joined channel ${channelName}`
      );
      // user joined notification-in the channel
      io.to(channelName).emit("user_joined", {
        user: socket.data.user.username,
      });
    });
    socket.on("leave_channel", async (channelName: string) => {
      socket.leave(channelName);
      logger.info(
        `User ${socket.data.user.username} left channel ${channelName}`
      );

      //user left notification-in the channel
      io.to(channelName).emit("user_left", { user: socket.data.user.username });
    });
    socket.on("send_message", async ({ channelName, message }) => {
      io.to(channelName).emit("new_message", {
        user: socket.data.user.username,
        message,
      });
      await chatService.createMessage(
        message,
        socket.data.user.id,
        channelName
      );
    });
    socket.on(
      "get_chat_history",
      async (channelName: string, callback: (history: any) => void) => {
        try {
          const history = await chatService.getChatHistory(channelName);
          callback(history);
        } catch (error) {
          callback({ error: "Failed to fetch chat history" });
        }
      }
    );

    socket.on("send_private_message", async ({ recipientId, message }) => {
      const recipientSocket = Array.from(io.sockets.sockets.values()).find(
        (s) => s.data.user.id === recipientId
      );
      if (recipientSocket) {
        recipientSocket.emit("private_message", {
          message,
          from: socket.data.user.username,
        });
        logger.info(
          `Private message from ${socket.data.user.username} to user ${recipientId}`
        );

        await chatService.createMessage(
          message,
          socket.data.user.id,
          `private-${recipientId}`
        );
      } else {
        socket.emit("error", { message: "Recipient not found" });
      }
    });

    socket.on(
      "list_users_in_channel",
      async (channelName: string, callback: (users: any[]) => void) => {
        const users = [] as string[];
        const clients = io.sockets.adapter.rooms.get(channelName);
        if (clients) {
          clients.forEach((clientId) => {
            const clientSocket = io.sockets.sockets.get(clientId);
            users.push(clientSocket?.data.user.username);
          });
        }
        callback(users);
      }
    );

    socket.on("disconnect", () => {
      console.log("User disconnected from WebSocket");
    });
  });
};
