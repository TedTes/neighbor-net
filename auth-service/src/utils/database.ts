import { DataSource } from "typeorm";
import { logger } from "./logger";
import { User } from "../models";
import { config } from "../config";
const { databaseConfig } = config;
export const AuthDataSource = new DataSource({
  ...databaseConfig,
  type: "postgres",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
});

export const connectDB = async () => {
  try {
    await AuthDataSource.initialize();
    logger.info("PostgreSQL connected...");
  } catch (error) {
    logger.error("Error connecting to database:", error);
    process.exit(1);
  }
};
