import { timeStamp } from "console";
import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  updatedAt: Date;
  createdAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
UserSchema.virtual("_password")
  .set(function (this: IUser, password: string) {
    if (password && password.length < 6) {
      this.invalidate("password", "Password must be at least 6 characters.");
    }
    this.markModified("passwordHash");
  })
  .get(function () {
    return this.password;
  });
const User = mongoose.model<IUser>("User", UserSchema);

export { User, IUser };
