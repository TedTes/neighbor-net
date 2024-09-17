import { Request, Response } from "express";
import * as InventoryService from "../services/inventoryItemService";
import { IInventoryItem } from "../models/InventoryItem";

export const createItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newItem: IInventoryItem = await InventoryService.createItem(req.body);
    res.status(201).json(newItem);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error creating item", error: error.message });
  }
};

export const getAllItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const items: IInventoryItem[] = await InventoryService.getAllItems(
      req.query
    );
    res.status(200).json(items);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching items", error: error.message });
  }
};

export const getItemById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const item: IInventoryItem | null = await InventoryService.getItemById(
      req.params.id
    );
    if (!item) {
      res.status(404).json({ message: "Item not found" });
      return;
    }
    res.status(200).json(item);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching item", error: error.message });
  }
};

export const updateItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedItem: IInventoryItem | null =
      await InventoryService.updateItem(req.params.id, req.body);
    if (!updatedItem) {
      res.status(404).json({ message: "Item not found" });
      return;
    }
    res.status(200).json(updatedItem);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error updating item", error: error.message });
  }
};

export const deleteItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedItem: IInventoryItem | null =
      await InventoryService.deleteItem(req.params.id);
    if (!deletedItem) {
      res.status(404).json({ message: "Item not found" });
      return;
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error deleting item", error: error.message });
  }
};
