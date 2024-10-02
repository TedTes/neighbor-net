import { Router } from "express";
import { PostController } from "../controllers";
import { authMiddleware } from "../middleware/AuthMiddleware";
const PostRouter = Router();

PostRouter.post("/", authMiddleware, PostController.createPost);
PostRouter.get("/", PostController.getAllPosts);

export { PostRouter };
