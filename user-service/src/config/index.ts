import dotenv from "dotenv";

dotenv.config();

export const config = {
  dbConfig: {
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "",
    database: process.env.POSTGRES_DB || "user_db",
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
  },
  appServerPort: process.env.APP_SERVER_PORT || 3005,
};
