import mongoose from "mongoose";
import { db } from "./config";
import { logger } from "./utils/logger";
import app from "./app";

app.listen(db.port, () => {
  logger.info(`server running on port:${db.port}`);
});

mongoose.Promise = global.Promise;
mongoose.connect(db.mongoUri);
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${db.mongoUri}`);
});

mongoose.connection.on("connected", () => {
  logger.info(`connected to mongodb`);
});
