import { Router } from "express";
import { PostController } from "../controllers";

const PostRouter = Router();

PostRouter.post("/", PostController.createPost);
PostRouter.get("/", PostController.getPosts);

export { PostRouter };
