import { Router } from "express";
import { userController } from "../controllers/UserController";
import { authMiddleware } from "../middleware/AuthMiddleware";
import multer from "multer";

const UserRouter = Router();
const upload = multer({ dest: "uploads/" }); // Configure multer for multipart file uploads

UserRouter.post("/", userController.createUser);
UserRouter.put(
  "/:userId/profile-photo",
  authMiddleware.authenticate,
  upload.single("photo"),
  userController.updateProfilePhoto
);

export { UserRouter };
