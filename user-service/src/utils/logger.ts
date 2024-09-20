import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, errors } = format;

// Define the log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

export const logger = createLogger({
  level: "debug",
  // format: winston.format.json(),
  format: combine(timestamp(), errors({ stack: true }), logFormat),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    // new transports.File({ filename: "error.log", level: "error" }),
    // new transports.File({ filename: "combined.log" }),
    new transports.Console(),
  ],
});
