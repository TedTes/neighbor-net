import dotenv from "dotenv";

dotenv.config();

export const config = {
  databaseConfig: {
    host: process.env.POSTGRES_HOST || "localhost",
    port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "",
    database: process.env.POSTGRES_DB
      ? String(process.env.POSTGRES_DB)
      : "auth_db",
  },

  appServerPort: process.env.APP_SERVER_PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "secret_key",
  environment: process.env.NODE_ENV || "developement",
  isSecure: process.env.NODE_ENV === "production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
};
