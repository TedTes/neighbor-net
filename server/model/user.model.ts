import mongoose, { Schema, Document } from "mongoose";
import { createHmac } from "crypto";
import bcrypt from "bcrypt";

interface userTemplate extends Document {
  name: string;
  email: string;
  created: Date;
  updated: Date;
  hashed_password: string;
  salt: string;
  _password: string | undefined;
  passwordManager(password: string): Promise<string>;
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
    required: [true, "Password is required"],
  },
  salt: String,
  updated: Date,
});
userSchema
  .virtual("password")
  .set(async function (password) {
    this._password = password;
    this.hashed_password = await this.passwordManager(password);
    this._password = undefined;
  })
  .get(function () {
    return this.hashed_password;
  });
userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compare(password, this.hashed_password);
  },
  passwordManager: async function (password): Promise<string> {
    if (!password) return "";
    try {
      const saltRounds = 10;
      return bcrypt.hash(password, saltRounds);
    } catch (err) {
      return "";
    }
  },
};
userSchema.path("_password").validate(function () {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
});
export default mongoose.model("User", userSchema);
