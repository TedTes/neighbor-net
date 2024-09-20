import express from "express";
import { UserController } from "../controllers";
const UserRouter = express.Router();

UserRouter.get("/", UserController.getAllUsers);
UserRouter.post("/", UserController.createUser);
export { UserRouter };
