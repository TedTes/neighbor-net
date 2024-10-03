import { Request, Response } from "express";
import { Post } from "../models";
import { PostService } from "../services";
import { logger } from "../utils";

export class PostController {
  static async createPostController(req: Request, res: Response) {
    try {
      const { content, mediaUrl } = req.body;
      const userId = req.user?.userId;
      if (!userId) throw `user not found`;
      const post = await PostService.createPostService(
        userId,
        content,
        mediaUrl
      );
      res.status(201).json(post);
    } catch (error: any) {
      logger.error({
        methodName: "createPostController",
        description: error.message,
        stack: error.stack || error,
      });
      res
        .status(500)
        .json({ error: `Failed to create post:${error?.message}` });
    }
  }
  static async getAllPostsController(req: Request, res: Response) {
    try {
      const posts = await PostService.getAllPostsWithUsersService();
      res.status(200).json(posts);
    } catch (error: any) {
      logger.error({
        methodName: "getAllPostsController",
        description: error.message,
        stack: error.stack || error,
      });
      res.status(500).json({ error: "Failed to retrieve posts" });
    }
  }

  static async getUserPostsController(req: Request, res: Response) {
    try {
      const userId = req.params.user_id;
      const posts = await PostService.getUserPostsService(userId);
      res.status(200).json(posts);
    } catch (error) {
      logger.error({
        methodName: "getUserPostsController",
        errorDescription: error,
      });
      res.status(500).json({ error: "Failed to retrieve posts" });
    }
  }
  static async updatePostController(req: Request, res: Response) {
    try {
      const { post_id } = req.params;
      const { content } = req.body;
      const updatedPost = await PostService.updatePostService(post_id, content);
      res.status(200).json(updatedPost);
    } catch (error) {
      logger.error({
        methodName: "updatePost",
        errorDescription: error,
      });
      res.status(500).json({ error: "Failed to retrieve posts" });
    }
  }
  static async deletePostController(req: Request, res: Response) {
    try {
      const { post_id } = req.params;
      await PostService.deletePostService(post_id);
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      logger.error({
        methodName: "deletePost",
        errorDescription: error,
      });
      res.status(500).json({ error: "Failed to delete post" });
    }
  }

  static async likePostController(req: Request, res: Response) {
    try {
      const { post_id } = req.params;
      const user_id = req.user.userId;
      await PostService.likePostService(post_id, user_id);
      res.status(200);
    } catch (error) {
      logger.error({
        methodName: "likePost",
        errorDescription: error,
      });
      res.status(500).json({ error: "Failed to like post" });
    }
  }
  static async unlikePostController(req: Request, res: Response) {
    try {
      const { post_id } = req.params;
      const user_id = req.user.userId;
      await PostService.unlikePostService(post_id, user_id);
      res.status(200);
    } catch (error) {
      logger.error({
        methodName: "unlikePost",
        errorDescription: error,
      });
      res.status(500).json({ error: "Failed to unlike post" });
    }
  }
  static async getPostLikesController(req: Request, res: Response) {
    try {
      const { post_id } = req.params;
      const likes = await PostService.getPostLikesService(post_id);
      res.status(200).json(likes);
    } catch (error) {
      logger.error({
        methodName: "getPostLikes",
        errorDescription: error,
      });
      res.status(500).json({ error: "Failed to fetch likes" });
    }
  }
  static async addCommentController(req: Request, res: Response) {
    try {
      const { post_id } = req.params;
      const { content } = req.body;
      const comments = await PostService.addCommentService(
        post_id,
        content,
        req.user.userId
      );
      res.status(201).json(comments);
    } catch (error) {
      logger.error({
        methodName: "addComment",
        errorDescription: error,
      });
      res.status(500).json({ error: "Failed to add comment" });
    }
  }
  static async replyToCommentController(req: Request, res: Response) {
    try {
      const { post_id, comment_id } = req.params;
      const { content } = req.body;
      const replies = await PostService.replyToCommentService(
        post_id,
        comment_id,
        content,
        req.user.userId
      );
      res.status(201).json(replies);
    } catch (error) {
      logger.error({
        methodName: "addComment",
        errorDescription: error,
      });
      res.status(500).json({ error: "Failed to reply to comment" });
    }
  }
  static async getPostCommentsController(req: Request, res: Response) {
    try {
      const { post_id } = req.params;

      const comments = await PostService.getPostCommentsService(post_id);
      res.status(201).json(comments);
    } catch (error) {
      logger.error({
        methodName: "addComment",
        errorDescription: error,
      });
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  }
  static async updateCommentController(req: Request, res: Response) {
    try {
      const { comment_id } = req.params;
      const { content } = req.body;
      const post = await PostService.updateCommentService(comment_id, content);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to update comment" });
    }
  }
  static async deleteCommentController(req: Request, res: Response) {
    try {
      const { comment_id } = req.params;
      const post = await PostService.deleteCommentService(comment_id);

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete comment" });
    }
  }

  static async getMentionsController(req: Request, res: Response) {
    try {
      //TODO:
      res.status(200).json({ message: "Mentions fetched successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch mentions" });
    }
  }

  static async getPostsByTagController(req: Request, res: Response) {
    try {
      const { tag_name } = req.params;
      // TODO:
      res.status(200).json({ message: `Posts for tag ${tag_name} fetched` });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts by tag" });
    }
  }

  static async getNotificationsController(req: Request, res: Response) {
    try {
      // TODO
      res.status(200).json({ message: "Notifications fetched successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notifications" });
    }
  }

  // Mark a notification as read
  static async markNotificationAsReadController(req: Request, res: Response) {
    try {
      const { notification_id } = req.params;
      // TODO
      res
        .status(200)
        .json({ message: `Notification ${notification_id} marked as read` });
    } catch (error) {
      res.status(500).json({ error: "Failed to mark notification as read" });
    }
  }

  static async searchPostsController(req: Request, res: Response) {
    try {
      const { query } = req.query;
      // TODO
      res.status(200).json({ message: "Search results fetched successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch search results" });
    }
  }
}
