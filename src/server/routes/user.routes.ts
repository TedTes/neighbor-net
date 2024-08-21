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
router.route("/").get(list).post(create);
router
  .route("/:userId")
  .get(requireSignin, hasAuthorization, read)
  .put(requireSignin, hasAuthorization, update)
  .delete(requireSignin, hasAuthorization, remove);
router.param("userId", userByID);
export { router };
