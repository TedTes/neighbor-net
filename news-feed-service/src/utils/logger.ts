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
  defaultMeta: { service: "news-feed-service" },
  transports: [new transports.Console()],
});
