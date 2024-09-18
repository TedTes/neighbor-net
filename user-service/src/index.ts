import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import path from "path";
const { sequelize } = require("./config/dbConfig");
import { UserRouter } from "./routes";

const app = express();

app.use(express.static(path.resolve(__dirname)));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());

app.use("/api/v1/users", UserRouter);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to postgress database has been established successfully."
    );
  })
  .catch((err: any) => {
    console.error("Unable to connect to the database:", err);
  });

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});
export default app;
