import dotenv from "dotenv";

dotenv.config();

export const config = {
  appServerPort: process.env.APP_SERVER_PORT || 3003,
  mongoDBConnectionString:
    `mongodb://${process.env.MONGODB_USERNAME}:${
      process.env.MONGODB_PASSWORD
    }@${process.env.MONGODB_HOST_NAME || "news-feed-service-mongoDB"}:${
      process.env.MONGODB_PORT || 27017
    }/${
      process.env.MONGODB_NAME
    }?authSource=admin&serverSelectionTimeoutMS=10000` ||
    `mongodb://root:test@news-feed-service-mongoDB:27017/newsfeed_db?authSource=admin&directConnection=true&serverSelectionTimeoutMS=10000`,
};
