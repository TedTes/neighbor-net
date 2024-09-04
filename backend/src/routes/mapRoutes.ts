import express from "express";
import { mapController } from "../controllers";
const mapRouter = express.Router();
mapRouter.route("/places").get(mapController);
export { mapRouter };
