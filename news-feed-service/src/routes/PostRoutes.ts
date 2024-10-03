import { Router } from "express";
import { PostController } from "../controllers";
import { authMiddleware } from "../middleware/AuthMiddleware";
const PostRouter = Router();

//Routes for posts
PostRouter.post("/", authMiddleware, PostController.createPostController)
  .get("/", PostController.getAllPostsController)
  .get("/:user_id/posts", PostController.getUserPostsController)
  .put("/:post_id", authMiddleware, PostController.updatePostController)
  .delete("/:post_id", PostController.deletePostController)

  // Rotues for likes
  .post("/:post_id/like", authMiddleware, PostController.likePostController)
  .delete("/:post_id/like", authMiddleware, PostController.unlikePostController)
  .get("/:post_id/likes", PostController.getPostLikesController)

  //Routes for comments
  .post(
    "/:post_id/comments",
    authMiddleware,
    PostController.addCommentController
  )
  .get("/:post_id/comments", PostController.getPostCommentsController)
  .put(
    "/comments/:comment_id",
    authMiddleware,
    PostController.updateCommentController
  )
  .delete(
    "/comments/:comment_id",
    authMiddleware,
    PostController.deleteCommentController
  )
  .post(
    "/:post_id/comments/:comment_id/reply",
    authMiddleware,
    PostController.replyToCommentController
  )

  //Other routes
  .get("/mentions", PostController.getMentionsController)
  .get("/tags/:tag_name", PostController.getPostsByTagController)
  .get("/notifications", PostController.getNotificationsController)
  .post(
    "/notifications/:notification_id/read",
    authMiddleware,
    PostController.markNotificationAsReadController
  )
  .get("/search", PostController.searchPostsController);

export { PostRouter };
