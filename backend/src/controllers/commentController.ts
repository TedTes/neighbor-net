import * as commentService from "../services/commentService";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { Schema } from "mongoose";
export const createComment = async (req: Request, res: Response) => {
  const { userId, contentId, contentType, text } = req.body;
  try {
    const newComment = await commentService.createComment(
      userId,
      contentId,
      contentType,
      text
    );
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Error creating comment", error });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  try {
    const commentIdToObjectId = new Schema.Types.ObjectId(commentId);
    const comment = await commentService.deleteComment(commentIdToObjectId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }
    res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
};

export const getCommentsForContent = async (req: Request, res: Response) => {
  const { contentId, contentType } = req.params;
  try {
    const contentIdToObjectId = new Schema.Types.ObjectId(contentId);
    const comments = await commentService.getCommentsForContent(
      contentIdToObjectId,
      contentType
    );
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

export const getCommentById = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  try {
    const commentIdToObjectId = new Schema.Types.ObjectId(commentId);
    const comment = await commentService.getCommentById(commentIdToObjectId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comment", error });
  }
};
