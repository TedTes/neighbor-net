import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import { ChatSocketHandler } from "./sockets/ChatSocketHandler";
import { chatRouter } from "./routes";
import mongoose from "mongoose";
import { db } from "./config/db";
import { logger } from "./utils/logger";

const app = express();

app.listen(db.port, async () => {
  logger.info(`server running on port:${db.port}`);
  try {
    mongoose.Promise = global.Promise;
    await mongoose
      .connect(db.mongoUri)
      .then(() => {
        logger.info(`connected to mongodb`);
      })
      .catch((error) => {
        logger.debug(JSON.stringify(error));
      });
  } catch (error) {
    logger.debug(JSON.stringify(error));
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());

app.use("/api/v1/chats", chatRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  ChatSocketHandler(io, socket);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});
export default app;
