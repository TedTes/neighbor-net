import { Schema, model } from "mongoose";

const postSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  mediaUrl: [
    {
      type: String,
      default: null,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: String,
    },
  ],
  comments: [
    {
      userId: {
        type: String,
        required: true,
      },
      content: { type: String, required: true },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      replies: [
        {
          userId: {
            type: String,
            required: true,
          },
          content: { type: String, required: true },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  ],
});

const Post = model("Post", postSchema);
export { Post };
