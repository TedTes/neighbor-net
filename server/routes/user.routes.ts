import express from "express";
import {
  create,
  userByID,
  read,
  list,
  remove,
  update,
  requireSignin,
  hasAuthorization,
} from "../controllers";

const router = express.Router();
router.route("/api/users").get(list).post(create);
router
  .route("/api/users/:userId")
  .get(requireSignin, read)
  .put(requireSignin, hasAuthorization, update)
  .delete(requireSignin, hasAuthorization, remove);
router.param("userId", userByID);
export { router };
