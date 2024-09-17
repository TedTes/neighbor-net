const express = require("express");

const likeController = require("../controllers/likeController");
const likeRouter = express.Router();

likeRouter.post("/", likeController.createLike);
likeRouter.delete("/", likeController.deleteLike);
likeRouter.get("/:contentId/:contentType", likeController.getLikesForContent);

export { likeRouter };
