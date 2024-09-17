import { Schema, model } from "mongoose";

interface likeType extends Document {
  userId: Schema.Types.ObjectId;
  contentId: Schema.Types.ObjectId;
  contentType: string;
}
const likeSchema: Schema<likeType> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    contentId: { type: Schema.Types.ObjectId, required: true },
    contentType: { type: String, enum: ["post", "comment"], required: true },
  },
  { timestamps: true }
);

export const Like = model<likeType>("Like", likeSchema);
