import { config } from "../config";
import { logger } from "../utils/logger";
import app from "./app.ts";

app.listen(config.port, () => {
  logger.info(`server running on port:${config.port}`);
});
