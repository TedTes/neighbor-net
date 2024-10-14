import { Router } from "express";
import { AuthController } from "../controllers";
const AuthRouter = Router();

AuthRouter.post("/login", AuthController.login)
  .post("/logout", AuthController.logout)
  .post("/refresh-token", AuthController.refreshAccessToken)
  .get("/validate-token", AuthController.validateToken)
  .post("/request-reset-password", AuthController.requestPasswordReset)
  .post("/reset-password", AuthController.resetPassword);

export { AuthRouter };

const router = Router();
