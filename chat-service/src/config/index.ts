import dotenv from "dotenv";
dotenv.config();
export const config = {
  appServerPort: process.env.APP_SERVER_PORT || 3001,
  mongoDBConnectionString:
    `mongodb://${process.env.USENAME}:${process.env.PASSWORD}@${
      process.env.CONTAINER_NAME || "mongodb"
    }:${process.env.MONGODB_PORT || 27017}/${
      process.env.DB_NAME
    }?authSource=admin&directConnection=true&serverSelectionTimeoutMS=10000` ||
    `mongodb://root:123@mongodb:27017/neighbor-net?authSource=admin&directConnection=true&serverSelectionTimeoutMS=10000`,
};
