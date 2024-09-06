import {
  createChannel,
  joinChannel,
  sendMessage,
  disconnectUser,
} from "../services";
import { Server, Socket } from "socket.io";
export const MessageController = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("A user connected:", socket.id);

    socket.on("create_channel", (channelName: string) => {
      createChannel(channelName);
    });

    socket.on("join_channel", (channelName: string) => {
      joinChannel(socket, channelName);
    });

    socket.on("send_message", ({ channelName, message }) => {
      sendMessage(io, socket, channelName, message);
    });

    socket.on("disconnect", () => {
      disconnectUser(socket);
    });
  });
};
