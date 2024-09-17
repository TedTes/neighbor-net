import { Comment } from "../models/Comment";
import { Schema } from "mongoose";

// Create a comment
export const createComment = async (
  userId: Schema.Types.ObjectId,
  contentId: Schema.Types.ObjectId,
  contentType: string,
  text: string
) => {
  const comment = new Comment({ userId, contentId, contentType, text });
  return await comment.save();
};

// Delete a comment
export const deleteComment = async (commentId: Schema.Types.ObjectId) => {
  return await Comment.findByIdAndDelete(commentId);
};

// Get all comments for a specific content
export const getCommentsForContent = async (
  contentId: Schema.Types.ObjectId,
  contentType: string
) => {
  return await Comment.find({ contentId, contentType });
};

// Get a specific comment by its ID
export const getCommentById = async (commentId: Schema.Types.ObjectId) => {
  return await Comment.findById(commentId);
};
