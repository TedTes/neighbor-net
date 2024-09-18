import express, { Router } from "express";
import { AuthController } from "../controllers";
const AuthRouter = Router();

AuthRouter.post("/login", AuthController.login);
AuthRouter.post("/logout", AuthController.logout);
AuthRouter.post("/refresh-token", AuthController.login);
AuthRouter.post("/verify-token", AuthController.login);

export { AuthRouter };
