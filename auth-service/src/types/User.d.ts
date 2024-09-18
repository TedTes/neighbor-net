import { ObjectId } from "mongodb";

export interface userInput {
  name?: string;
  email: string;
  password: string;
}
export interface userData {
  _id: string;
  username?: string;
  email: string;
  password?: string;
}
export interface responseData {
  token: string;
  expirationDate: Date;
  user: userData;
}

export interface UserType {
  _id?: string;
  username?: string;
  email: string;
  updatedAt: Date;
  createdAt: Date;
}
export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  updated: Date;
  created: Date;
  hashed_password: string | undefined;
  salt: string | undefined;
  save(): Promise<UserDocument>;
  remove(): Promise<UserDocument>;
}
