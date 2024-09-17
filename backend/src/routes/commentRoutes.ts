const express = require("express");

const commentController = require("../controllers/postController");
const commentRouter = express.Router();

commentRouter.post("/", commentController.createComment);
commentRouter.delete("/:commentId", commentController.deleteComment);
commentRouter.get(
  "/:contentId/:contentType",
  commentController.getCommentsForContent
);
commentRouter.get("/:commentId", commentController.getCommentById);

export { commentRouter };
