import express, { Request, Response, NextFunction } from "express";
import { logger } from "./utils/logger";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import { AuthRouter } from "./routes";
import { connectDB } from "./utils";
import { config } from "./config";
const app = express();

const { appServerPort, databaseConfig } = config;

(async () => {
  try {
    await connectDB(); // Connect to PostgreSQL
    logger.info(
      `auth server connected to postgres database:${databaseConfig.host}`
    );

    app.listen(appServerPort, async () => {
      logger.info(`server listening on port:${appServerPort}`);
    });
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
})();

app.use(express.static(path.resolve(__dirname)));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());
app.use("/api/v1/auth", AuthRouter);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});
export default app;
