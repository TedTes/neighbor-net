import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";

import { logger } from "./utils";
import { connectDB } from "./utils";

import { UserRouter } from "./routes";
import { config } from "./config";

const { appServerPort, dbConfig } = config;
const app = express();

(async () => {
  try {
    await connectDB();
    logger.info(
      `user-service server connected to postgres database:${dbConfig.host}`
    );

    app.listen(appServerPort, async () => {
      logger.info(`server listening on port:${appServerPort}`);
    });
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
})();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());

app.use("/api/v1/user", UserRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    logger.debug(err);
  }
});
export default app;
