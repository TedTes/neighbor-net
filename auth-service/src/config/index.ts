import dotenv from "dotenv";

dotenv.config();

export const config = {
  databaseConfig: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME ? String(process.env.DB_NAME) : undefined,
  },

  appServerPort: process.env.APP_SERVER_PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "secret_key",
  environment: process.env.NODE_ENV || "developement",
  isSecure: process.env.NODE_ENV === "developement",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
};
