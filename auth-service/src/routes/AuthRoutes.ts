import { Router } from "express";
import { AuthController } from "../controllers";
const AuthRouter = Router();

AuthRouter.post("/login", AuthController.login);
// AuthRouter.post("/logout", AuthController.logout);
// AuthRouter.post("/refresh-token", AuthController.login);
// AuthRouter.post("/authorized", AuthController.login);

export { AuthRouter };

const router = Router();
