import { Sequelize } from "sequelize";
import pg from "pg";
import { config } from "../config";
const { dbConfig } = config;
const sequelize = new Sequelize({
  ...dbConfig,
  dialect: "postgres",
  dialectModule: pg,
});

export { sequelize };
