import mongoose from "mongoose";
import { db } from "./config";
import { logger } from "./utils/logger";
import app from "./app";

app.listen(db.port, async () => {
  logger.info(`server running on port:${db.port}`);
  try {
    mongoose.Promise = global.Promise;
    await mongoose
      .connect(db.mongoUri)
      .then(() => {
        logger.debug(`connected to mongodb`);
      })
      .catch((error) => {
        logger.debug(JSON.stringify(error));
      });
  } catch (error) {
    logger.debug("from catch");
    logger.debug(JSON.stringify(error));
  }
});
