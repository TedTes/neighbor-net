import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { connectDB } from "./utils";
import { PostRouter } from "./routes";
import { logger } from "./utils";
import { config } from "./config";

const { appServerPort, mongoDBConnectionString } = config;
const app = express();

connectDB()
  .then(() => {
    logger.info(`connected to mongodb ${mongoDBConnectionString}`);
    app.listen(appServerPort, () => {
      logger.info(`server listening on port:${appServerPort}`);
    });
  })
  .catch((error) => {
    logger.debug(`Error:${error}`);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());

app.use("/api/v1/posts", PostRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});
export default app;
