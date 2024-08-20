import express from "express";
import { signin, signout } from "../controllers";
const authRouter = express.Router();
authRouter.route("/signin").post(signin);
authRouter.route("/signout").get(signout);
export { authRouter };
