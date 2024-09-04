import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import { router, authRouter, mapRouter } from "./routes";
const app = express();

app.use(express.static(path.resolve(__dirname)));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", router);
app.use("/api/v1/places", mapRouter);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});
export default app;
