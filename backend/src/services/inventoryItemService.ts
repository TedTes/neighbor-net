import { InventoryItem, IInventoryItem } from "../models/InventoryItem";
import { FilterQuery } from "mongoose";

export const createItem = async (
  itemData: IInventoryItem
): Promise<IInventoryItem> => {
  const newItem = new InventoryItem(itemData);
  return await newItem.save();
};

export const getAllItems = async (query: any): Promise<IInventoryItem[]> => {
  const filter: FilterQuery<IInventoryItem> = {};
  if (query.category) filter.category = query.category;
  if (query.status) filter.status = query.status;
  if (query.location) {
    filter["location.coordinates"] = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [
            parseFloat(query.longitude),
            parseFloat(query.latitude),
          ],
        },
        $maxDistance: parseInt(query.maxDistance) || 10000, // 10km default
      },
    };
  }
  return await InventoryItem.find(filter).exec();
};

export const getItemById = async (
  itemId: string
): Promise<IInventoryItem | null> => {
  return await InventoryItem.findById(itemId).exec();
};

export const updateItem = async (
  itemId: string,
  updateData: IInventoryItem
): Promise<IInventoryItem | null> => {
  return await InventoryItem.findByIdAndUpdate(itemId, updateData, {
    new: true,
  }).exec();
};

export const deleteItem = async (
  itemId: string
): Promise<IInventoryItem | null> => {
  return await InventoryItem.findByIdAndDelete(itemId).exec();
};
