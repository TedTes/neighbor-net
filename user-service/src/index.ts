import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";

import { logger } from "./utils";
import { sequelize } from "./utils";

import { UserRouter } from "./routes";
import { config } from "./config";

const { appServerPort } = config;
const app = express();

sequelize
  .authenticate()
  .then(() => {
    logger.info(
      "Connection to postgress database has been established successfully."
    );
    app.listen(appServerPort, () => {
      logger.info(`server running on port ${appServerPort}`);
    });
  })
  .catch((err: Error) => {
    logger.debug("Unable to connect to the database:", err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());

app.use("/api/v1/users", UserRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    logger.debug(err);
  }
});
export default app;
