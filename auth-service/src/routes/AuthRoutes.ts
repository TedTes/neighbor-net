import express, { Router } from "express";
import { AuthController } from "../controllers";
const AuthRouter = Router();

AuthRouter.post("/register", AuthController.register);
AuthRouter.post("/login", AuthController.login);

export { AuthRouter };
