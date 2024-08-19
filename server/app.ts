import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { router, authRouter } from "./routes";
const app = express();
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());
//app.use("/", authRouter);
app.use("/", router);
const test = `<!doctype html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    <title>MERN Skeleton</title>
    </head>
    <body>
    <div id="root">Hello World</div>
    </body>
    </html>`;
app.get("/", (req: Request, res: Response) => {
  res.status(200).send(test);
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
