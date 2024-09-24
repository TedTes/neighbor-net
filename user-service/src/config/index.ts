import dotenv from "dotenv";

dotenv.config();

export const config = {
  dbConfig: {
    postgressUser: process.env.POSTGRES_USER || "postgres",
    postgresPassword: process.env.POSTGRES_PASSWORD || "",
    postgresDB: process.env.POSTGRES_DB || "",
    postgresHost: process.env.POSTGRES_HOST,
    postgresPort: parseInt(process.env.POSTGRES_PORT || "5432", 10),
  },
  appServerPort: process.env.APP_SERVER_PORT || 3005,
};
