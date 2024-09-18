import { Request } from "express";

declare module "socket.io" {
  interface Socket {
    currentChannel?: string;
  }
}
