import express from "express";
import { ChatController } from "../controllers";
import { authMiddleWare } from "../middleware";
const chatRouter = express.Router();
const chatController = new ChatController();
chatRouter
  .get(
    "/history/:roomId",
    authMiddleWare.validateToken,
    chatController.getChatHistory
  )
  .post("/message", authMiddleWare.validateToken, chatController.createMessage)
  .get(
    "/channels",
    authMiddleWare.validateToken,
    chatController.getUserChannels
  )
  .post("channel", authMiddleWare.validateToken, chatController.createChannel)
  .post(
    "/channel/:channelId/join",
    authMiddleWare.validateToken,
    chatController.joinChannel
  )
  .post(
    "/channel/:channelId/leave",
    authMiddleWare.validateToken,
    chatController.leaveChannel
  )
  .delete(
    "/message/:channelId/:messageId",
    authMiddleWare.validateToken,
    chatController.deleteMessage
  );

export { chatRouter };
