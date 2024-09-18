import express from "express";
import { ChatController } from "../controllers";
const chatRouter = express.Router();

chatRouter.get("/history/:channelId", new ChatController().getChatHistory);
chatRouter.post("/channel", new ChatController().createMessage);

export { chatRouter };
