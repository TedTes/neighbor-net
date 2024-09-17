import { Like } from "../models/Like";
import { Schema } from "mongoose";

export const createLike = async (
  userId: Schema.Types.ObjectId,
  contentId: Schema.Types.ObjectId,
  contentType: string
) => {
  const like = new Like({ userId, contentId, contentType });
  return await like.save();
};

export const deleteLike = async (
  userId: Schema.Types.ObjectId,
  contentId: Schema.Types.ObjectId,
  contentType: string
) => {
  return await Like.findOneAndDelete({ userId, contentId, contentType });
};

export const checkLikeExists = async (
  userId: Schema.Types.ObjectId,
  contentId: Schema.Types.ObjectId,
  contentType: string
) => {
  return await Like.findOne({ userId, contentId, contentType });
};

export const getLikesForContent = async (
  contentId: Schema.Types.ObjectId,
  contentType: string
) => {
  return await Like.find({ contentId, contentType });
};
