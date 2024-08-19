import { Request } from "express";
import { User } from "../models";
declare global {
  namespace Express {
    interface Request {
      profile?: typeof User.prototype;
      user?: typeof User.prototype;
    }
  }
}
