import { config } from "../config";
import mongoose from "mongoose";
import { logger } from "./";
const { mongoDBConnectionString } = config;

export const connectDB = async () => {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(mongoDBConnectionString);
    logger.info(`connected to mongodb`);
  } catch (error) {
    logger.debug(JSON.stringify(error));
    process.exit(1);
  }
};
