import mongoose from "mongoose";
import { config } from "../config/index";
import { logger } from "../utils/logger/index";
import app from "./app";

app.listen(config.port, () => {
  logger.info(`server running on port:${config.port}`);
});

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri);
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

mongoose.connection.on("connected", () => {
  logger.info(`connected to mongodb`);
});
