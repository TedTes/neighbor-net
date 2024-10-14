import dotenv from "dotenv";
dotenv.config();
export const config = {
  appServerPort: process.env.APP_SERVER_PORT || 3001,
  mongoDBConnectionString:
    `mongodb://${process.env.MONGODB_USERNAME}:${
      process.env.MONGODB_PASSWORD
    }@${process.env.MONGODB_HOST_NAME || "chat-service-mongoDB"}:${
      process.env.MONGODB_PORT || 27017
    }/${
      process.env.MONGODB_NAME
    }?authSource=admin&serverSelectionTimeoutMS=10000` ||
    `mongodb://root:test@chat-service-mongoDB:27017/chat_db?authSource=admin`,
  authServiceAPI:
    process.env.AUTH_SERVICE_API || "http://auth-service/auth/validate-token",
};
