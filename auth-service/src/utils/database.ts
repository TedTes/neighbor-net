import { logger } from "./logger";
import { User } from "../models";
import { config } from "../config";
import { Sequelize } from "sequelize";
import pg from "pg";
const { databaseConfig } = config;
export const sequelize = new Sequelize({
  ...databaseConfig,
  dialect: "postgres",
  dialectModule: pg,
});
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Connection has been established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
};
