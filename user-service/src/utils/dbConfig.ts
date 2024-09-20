import { Sequelize } from "sequelize";
import pg from "pg";

const sequelize = new Sequelize({
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "",
  host: process.env.POSTGRES_HOST || "localhost",
  dialect: "postgres",
  port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
  dialectModule: pg,
});

export { sequelize };
