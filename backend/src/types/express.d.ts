import { Request } from "express";
import { User } from "../models";
declare global {
  namespace Express {
    interface Request {
      profile?: InstanceType<typeof UserModel>; // Instance of User model
      user?: InstanceType<typeof UserModel>;
    }
  }
}
