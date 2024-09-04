import express from "express";
import { mapController } from "../controllers";
const mapRouter = express.Router();
mapRouter.route("/search").get(mapController);
export { mapRouter };
