import express from "express";
import { UserController } from "../controllers";
const UserRouter = express.Router();

// chatRouter.get("/history/:channelId", new ChatController().getChatHistory);
// chatRouter.post("/channel", new ChatController().createMessage);

UserRouter.get("/", UserController.getAllUsers);
UserRouter.post("/", UserController.createUser);
export { UserRouter };
