import { Document, Schema, Model, model } from "mongoose";

interface IInventoryItem extends Document {
  owner: Schema.Types.ObjectId;
  title: string;
  description?: string;
  category: string;
  price: number;
  currency?: string;
  condition: "New" | "Like New" | "Good" | "Fair" | "Poor";
  images?: string[];
  location?: {
    city?: string;
    country?: string;
    coordinates: {
      type: "Point";
      coordinates: [number, number]; // [longitude, latitude]
    };
  };
  tags?: string[];
  status: "Available" | "Sold" | "Removed";
  viewsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const inventoryItemSchema: Schema = new Schema<IInventoryItem>(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    condition: {
      type: String,
      enum: ["New", "Like New", "Good", "Fair", "Poor"],
      required: true,
    },
    images: [{ type: String }],
    location: {
      city: { type: String },
      country: { type: String },
      coordinates: {
        type: { type: String, enum: ["Point"], required: true },
        coordinates: { type: [Number], required: true },
      },
    },
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ["Available", "Sold", "Removed"],
      default: "Available",
    },
    viewsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Indexes for efficient search
inventoryItemSchema.index({ owner: 1 });
inventoryItemSchema.index({ category: 1, status: 1 });
inventoryItemSchema.index({ "location.coordinates": "2dsphere" });

const InventoryItem: Model<IInventoryItem> = model<IInventoryItem>(
  "InventoryItem",
  inventoryItemSchema
);

export { InventoryItem, IInventoryItem };
