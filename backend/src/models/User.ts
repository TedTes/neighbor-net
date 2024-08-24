import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { logger } from "../utils/logger";
interface userTemplate extends Document {
  name: string;
  email: string;
  created: Date;
  updated: Date;
  hashed_password: string;
  _plain_password: string;
  _password: string;
  password: string;
  passwordManager(password: string): Promise<string>;
  authenticate(password: string): boolean;
}
const userSchema: Schema<userTemplate> = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: [true, "Email is required"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
  hashed_password: {
    type: String,
  },
  updated: Date,
});
userSchema
  .virtual("_password")
  .set(function (this: userTemplate, password: string) {
    if (password && password.length < 6) {
      this.invalidate("password", "Password must be at least 6 characters.");
    }
    this._plain_password = password;
    this.markModified("hashed_password");
  })
  .get(function () {
    return this._plain_password;
  });

userSchema.pre("save", async function (this: userTemplate, next) {
  if (this.isModified("hashed_password")) {
    try {
      this.hashed_password = await this.passwordManager(this._password!);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return next(err);
      } else {
        return next(new Error("unexpected error occured"));
      }
    }
  }
  next();
});
userSchema.methods = {
  authenticate: async function (password: string) {
    return await bcrypt.compare(password, this.hashed_password);
  },
  passwordManager: async function (password: string): Promise<string> {
    if (!password) return "";
    try {
      const saltRounds = 10;
      return bcrypt.hash(password, saltRounds);
    } catch (err) {
      logger.info(err);
      return "";
    }
  },
};

export const User = mongoose.model("User", userSchema);
