import dotenv from "dotenv";

dotenv.config();

export const config = {
  appServerPort: process.env.APP_SERVER_PORT,
  mongoDBConnectionString:
    process.env.MONGO_DB_CONNECTION_STRING ||
    "mongodb://root:123@mongodb:27017/newsFeedDB",
};
