import mongoose from "mongoose";
import { logger } from ".";
import { config } from "../config";
const { mongoDBConnectionString } = config;
const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBConnectionString);
    logger.info("connected to newsfeed_db");
  } catch (error: any) {
    console.error("newsFeedDB connection failed:", error.message);
    process.exit(1);
  }
};

export { connectDB };
