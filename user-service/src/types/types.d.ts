import { Request } from "express";
import { User } from "../models";
declare module "socket.io" {
  interface Socket {
    currentChannel?: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
      user: User;
    }
  }
}
