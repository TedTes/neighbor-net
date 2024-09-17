import { Request, Response, NextFunction, RequestHandler } from "express";
import * as likeService from "../services/likeService";
import { Schema } from "mongoose";

export const createLike = async (req: Request, res: Response) => {
  const { userId, contentId, contentType } = req.body;
  try {
    const likeExists = await likeService.checkLikeExists(
      userId,
      contentId,
      contentType
    );
    if (likeExists) {
      return res
        .status(400)
        .json({ message: "You have already liked this content." });
    }
    const newLike = await likeService.createLike(
      userId,
      contentId,
      contentType
    );
    res.status(201).json(newLike);
  } catch (error) {
    res.status(500).json({ message: "Error liking content", error });
  }
};

export const deleteLike = async (req: Request, res: Response) => {
  const { userId, contentId, contentType } = req.body;
  try {
    const like = await likeService.deleteLike(userId, contentId, contentType);
    if (!like) {
      return res.status(404).json({ message: "Like not found." });
    }
    res.status(200).json({ message: "Like removed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error removing like", error });
  }
};

export const getLikesForContent = async (req: Request, res: Response) => {
  let { contentId, contentType } = req.params;
  const objectContentId = new Schema.Types.ObjectId(contentId);
  try {
    const likes = await likeService.getLikesForContent(
      objectContentId,
      contentType
    );
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching likes", error });
  }
};
