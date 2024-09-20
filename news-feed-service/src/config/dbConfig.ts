import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "../utils";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://root:123@mongodb:27017/newsFeedDB"
    );
    logger.info("newsFeedDB connected");
  } catch (error: any) {
    console.error("newsFeedDB connection failed:", error.message);
    process.exit(1);
  }
};

export { connectDB };
