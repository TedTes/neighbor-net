import { Post } from "../models";
import mongoose from "mongoose";
import { logger } from "../utils";
import { UserService } from "./index";
export class PostService {
  static async createPostService(
    userId: string,
    content: string,
    imageUrl = null
  ) {
    try {
      const newPost = new Post({
        userId,
        content,
        imageUrl,
      });
      return await newPost.save();
    } catch (error) {
      throw {
        methodName: "createPostService",
        message: error,
      };
    }
  }

  static async getAllPostsWithUsersService(): Promise<
    (IPost & { username: string })[] | undefined
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
      throw {
        methodName: "getAllPostsWithUsersService",
        message: error,
      };
    }
  }

  static async getUserPostsService(userId: string) {
    try {
      const posts = await Post.find({ userId }).exec();
      return posts;
    } catch (error) {
      throw {
        methodName: "getUserPostsService",
        message: error,
      };
    }
  }

  static async updatePostService(post_id: string, content: IPost) {
    try {
      const updatedPost = await Post.findByIdAndUpdate(post_id, content, {
        new: true,
      });
      return updatedPost;
    } catch (error) {
      throw {
        methodName: "updatePostService",
        message: error,
      };
    }
  }
  static async deletePostService(post_id: string) {
    try {
      const deletedPost = await Post.findByIdAndDelete(post_id);
      return deletedPost;
    } catch (error) {
      throw {
        methodName: "deletePostService",
        message: error,
      };
    }
  }
  static async likePostService(post_id: string, user_id: string) {
    try {
      const post = await Post.findById(post_id);
      if (!post.likes.includes(user_id)) {
        post.likes.push(user_id);
        await post.save();
      }
    } catch (error) {
      throw {
        methodName: "likePostService",
        message: error,
      };
    }
  }
  static async unlikePostService(post_id: string, user_id: string) {
    try {
      const post = await Post.findById(post_id);
      post.likes = post.likes.filter((userId: string) => userId !== user_id);
      await post.save();
    } catch (error) {
      throw {
        methodName: "unlikePostService",
        message: error,
      };
    }
  }
  static async getPostLikesService(post_id: string) {
    try {
      const post = await Post.findById(post_id).populate("likes");
      return post.likes;
    } catch (error) {
      throw {
        methodName: "getPostLikesService",
        message: error,
      };
    }
  }

  static async addCommentService(
    post_id: string,
    content: IPost,
    user_id: string
  ) {
    try {
      const post = await Post.findById(post_id);
      post.comments.push({ userId: user_id, content });
      await post.save();
      return post.comments;
    } catch (error) {
      throw {
        methodName: "addCommentService",
        message: error,
      };
    }
  }
  static async replyToCommentService(
    post_id: string,
    comment_id: string,
    content: IPost,
    user_id: string
  ) {
    try {
      const post = await Post.findById(post_id);
      const comment = post.comments.id(comment_id);
      if (comment) {
        comment.replies = comment.replies || [];
        comment.replies.push({ userId: user_id, content });
        await post.save();
        return comment.replies;
      } else {
        return [];
      }
    } catch (error) {
      throw {
        methodName: "replyToCommentService",
        message: error,
      };
    }
  }
  static async getPostCommentsService(post_id: string) {
    try {
      const post = await Post.findById(post_id).populate(
        "comments.userId",
        "username"
      );
      return post.comments;
    } catch (error) {
      throw {
        methodName: "getPostCommentsService",
        message: error,
      };
    }
  }
  static async updateCommentService(comment_id: string, content: IPost) {
    try {
      const post = await Post.findOneAndUpdate(
        { "comments._id": comment_id },
        { "comments.$.content": content },
        { new: true }
      );
      return post;
    } catch (error) {
      throw {
        methodName: "updateCommentService",
        message: error,
      };
    }
  }

  static async deleteCommentService(comment_id: string) {
    try {
      const post = await Post.findOneAndUpdate(
        { "comments._id": comment_id },
        { $pull: { comments: { _id: comment_id } } },
        { new: true }
      );
      return post;
    } catch (error) {
      throw {
        methodName: "deleteCommentService",
        message: error,
      };
    }
  }
}
