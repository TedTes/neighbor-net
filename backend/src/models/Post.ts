import { Schema, model } from "mongoose";
interface postType extends Document {
  author: string;
  content: string;
  media: string[];
  likes: string[];
  comments: [
    {
      commenter: string;
      comment: string;
      timestamp: Date;
    }
  ];
  createdAt: Date;
  updatedAt: Date;
}

const postSchema: Schema<postType> = new Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  media: [{ type: String, required: true }],
  likes: [{ type: String, required: true }],
  comments: [
    {
      commenter: { type: String, required: true },
      comment: { type: String, required: true },
      timestamp: { type: Date, default: Date.now() },
    },
  ],
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export const Post = model<postType>("Post", postSchema);
