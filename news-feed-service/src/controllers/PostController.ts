import { Request, Response } from "express";
import { Post } from "../models";
import { PostService } from "../services";
export class PostController {
  static createPost = async (req: Request, res: Response) => {
    try {
      const { content, imageUrl } = req.body;
      const userId = req.user?.userId;
      if (!userId) throw `user not found`;
      const post = await PostService.createPost(userId, content, imageUrl);
      return res.status(201).json(post);
    } catch (error: any) {
      return res.status(500).json({ error: `Failed to create post:${error}` });
    }
  };
  static getAllPosts = async (req: Request, res: Response) => {
    try {
      const posts = await PostService.getAllPostsWithUsers();
      return res.status(200).json(posts);
    } catch (error: any) {
      return res.status(500).json({ error: "Failed to retrieve posts" });
    }
  };
}
