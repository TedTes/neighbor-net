import { Request, Response } from "express";
import { Post } from "../models";

export class PostController {
  static createPost = async (req: Request, res: Response) => {
    try {
      const { title, content, author } = req.body;
      const post = new Post({ title, content, author });
      await post.save();
      res.status(201).json(post);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
  static getPosts = async (req: Request, res: Response) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
