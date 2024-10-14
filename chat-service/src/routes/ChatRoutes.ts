import express from "express";
import { ChatController } from "../controllers";
import { authMiddleWare } from "../middleware";
const chatRouter = express.Router();
const chatController = new ChatController();
chatRouter.get(
  "/history/:roomId",
  authMiddleWare.validateToken,
  chatController.getChatHistory
);
chatRouter.post(
  "/message",
  authMiddleWare.validateToken,
  chatController.createMessage
);

export { chatRouter };
