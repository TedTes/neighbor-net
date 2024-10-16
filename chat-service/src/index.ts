import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { ChatSocketHandler } from "./sockets/ChatSocketHandler";
import { chatRouter } from "./routes";
import { logger } from "./utils/logger";
import { config } from "./config";
import { connectDB } from "./utils";
const { appServerPort } = config;
const app = express();

connectDB()
  .then(() => {
    app.listen(appServerPort, async () => {
      logger.info(`server running on port:${appServerPort}`);
    });
  })
  .catch((error) => {
    logger.debug(`Error :${error}`);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());

app.use("/api/v1/chat", chatRouter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
ChatSocketHandler(io);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});
export default app;
