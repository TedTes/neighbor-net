import { Router } from "express";
import * as inventoryController from "../controllers/inventoryItemController";

const inventroyRouter: Router = Router();

inventroyRouter.post("/", inventoryController.createItem);
inventroyRouter.get("/", inventoryController.getAllItems);
inventroyRouter.get("/:id", inventoryController.getItemById);
inventroyRouter.put("/:id", inventoryController.updateItem);
inventroyRouter.delete("/:id", inventoryController.deleteItem);

export { inventroyRouter };
