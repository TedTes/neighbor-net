import { Sequelize } from "sequelize";
import pg from "pg";
import { config } from "../config";
const { dbConfig } = config;
export const sequelize = new Sequelize({
  ...dbConfig,
  dialect: "postgres",
  dialectModule: pg,
});
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
