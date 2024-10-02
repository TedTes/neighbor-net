import { Post } from "../models";
import mongoose from "mongoose";
import { logger } from "../utils";
import { UserService } from "./UserService";
export class PostService {
  static async createPost(userId: string, content: string, imageUrl = null) {
    try {
      const newPost = new Post({
        userId,
        content,
        imageUrl,
      });
      return await newPost.save();
    } catch (error) {
      logger.error({
        methodName: "createPost",
        errorDescription: error,
      });
      throw error;
    }
  }

  static async getAllPostsWithUsers(): Promise<
    (IPost & { username: string })[]
  > {
    try {
      const posts = await Post.find({}).exec();

      if (posts.length === 0) {
        logger.info("No posts found");
        return [];
      }

      const userIds = posts.map((post: IPost) => post.userId);

      // Fetch user data from PostgreSQL based on userIds
      const users = await UserService.fetchUsersFromUserService(userIds);
      const userMap = new Map(users.map((user: IUser) => [user.id, user]));

      const populatedPosts = posts.map((post: IPost) => {
        const user: IUser = userMap.get(post.userId) as IUser;
        if (!user) {
          logger.warn(
            `User with ID ${post.userId} not found for post ${post.id}`
          );
        }

        return {
          ...post,
          username: user?.username || "Unknown User",
        };
      });

      return populatedPosts;
    } catch (error) {
      if (error instanceof Error) {
        logger.error({
          methodName: "getAllPostsWithUsers",
          errorDescription: error.message,
          stack: error.stack,
        });
      } else {
        logger.error({
          methodName: "getAllPostsWithUsers",
          errorDescription: error,
        });
      }

      return [];
    }
  }

  static async getUserPosts(userId: mongoose.Schema.Types.ObjectId) {
    try {
      return await Post.find({ userId }).exec();
    } catch (error) {
      logger.error({
        methodName: "getAllPosts",
        errorDescription: error,
      });
      throw error;
    }
  }
}
