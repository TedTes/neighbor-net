import express from "express";
import { signin, signout } from "../controllers";
const authRouter = express.Router();
authRouter.route("/auth/signin").post(signin);
authRouter.route("/auth/signout").get(signout);
export { authRouter };
