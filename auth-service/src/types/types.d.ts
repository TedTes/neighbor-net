import { Request } from "express";

declare module "socket.io" {
  interface Socket {
    currentChannel?: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
