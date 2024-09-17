const express = require("express");

const chatController = require("../controllers/postController");
const chatRouter = express.Router();

chatRouter.get("/", chatController.getAllPosts);
chatRouter.post("/", chatController.createPost);
chatRouter.get("/:postId", chatController.getPostById);
chatRouter.put("/:postId", chatController.updatePost);
chatRouter.delete("/:postId", chatController.deletePost);

export { chatRouter };
