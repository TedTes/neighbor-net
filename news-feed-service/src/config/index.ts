import dotenv from "dotenv";

dotenv.config();

export const config = {
  appServerPort: process.env.APP_SERVER_PORT || 3003,
  mongoDBConnectionString:
    `mongodb://${process.env.MONGODB_USENAME}:${process.env.MONGODB_PASSWORD}@${
      process.env.MONGODB_CONTAINER_NAME || "mongodb"
    }:${process.env.MONGODB_PORT || 27017}/${
      process.env.MONGODB_NAME
    }?authSource=admin&directConnection=true&serverSelectionTimeoutMS=10000` ||
    `mongodb://root:123@mongodb:27017/newsFeedDB?authSource=admin&directConnection=true&serverSelectionTimeoutMS=10000`,
};
