import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());

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
app.get("/", (request, response) => {
  response.status(200).send(test);
});

export default app;
