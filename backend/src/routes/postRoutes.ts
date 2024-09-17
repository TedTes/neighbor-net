const express = require("express");

const postController = require("../controllers/postController");
const postRouter = express.Router();

postRouter.get("/", postController.getAllPosts);
postRouter.post("/", postController.createPost);
postRouter.get("/:postId", postController.getPostById);
postRouter.put("/:postId", postController.updatePost);
postRouter.delete("/:postId", postController.deletePost);

export { postRouter };
