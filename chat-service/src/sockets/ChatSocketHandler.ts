import { Server, Socket } from "socket.io";
import { ChatService } from "../services";
export const ChatSocketHandler = (io: Server, socket: Socket) => {
  socket.on("join_channel", (channelName: string) => {
    socket.join(channelName);
  });

  socket.on("send_message", async ({ channelName, message, userId }) => {
    io.to(channelName).emit("message", message);
    await new ChatService().createMessage(message, userId, channelName);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected from WebSocket");
  });
};
