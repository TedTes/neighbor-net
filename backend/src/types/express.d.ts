import { Request } from "express";
import { User } from "../models";
declare global {
  namespace Express {
    interface Request {
      profile?: InstanceType<typeof UserModel>;
      user?: InstanceType<typeof UserModel>;
    }
  }
}
declare module "socket.io" {
  interface Socket {
    currentChannel?: string;
  }
}
