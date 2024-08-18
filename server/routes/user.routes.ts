import express from "express";
import { create, userByID, read, list, remove, update } from "../controllers";
const router = express.Router();
router.route("/api/users").get(list).post(create);
router.route("/api/users/:userId").get(read).put(update).delete(remove);
router.param("userId", userByID);
export { router };
