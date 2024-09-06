import { Socket, Server } from "socket.io";

const channels: Record<string, string[]> = {};

export const createChannel = (channelName: string): void => {
  if (!channels.channelName) {
    channels.channelName = [];
    console.log(`Channel ${channelName} created.`);
  }
};

export const joinChannel = (socket: Socket, channelName: string): void => {
  if (channels.channelName) {
    socket.join(channelName);
    socket.currentChannel = channelName;
    console.log(`User ${socket.id} joined channel ${channelName}.`);
  }
};

export const sendMessage = (
  io: Server,
  socket: Socket,
  channelName: string,
  message: string
): void => {
  if (channels.channelName) {
    io.to(channelName).emit("receive_message", {
      channelName,
      message,
      sender: socket.id,
    });
    console.log(`Message sent to ${channelName}: ${message}`);
  }
};

export const disconnectUser = (socket: Socket): void => {
  console.log(`User disconnected: ${socket.id}`);
};
