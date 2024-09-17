import { Schema, model } from "mongoose";

interface commentType extends Document {
  userId: Schema.Types.ObjectId;
  contentId: Schema.Types.ObjectId;
  contentType: string;
  text: string;
  createdAt: Date;
  udatedAt: Date;
}
const commentSchema: Schema<commentType> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    contentId: { type: Schema.Types.ObjectId, required: true },
    contentType: { type: String, enum: ["post", "comment"], required: true },
    text: { type: String, required: true },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt
);

export const Comment = model<commentType>("Comment", commentSchema);
