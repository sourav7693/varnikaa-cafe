import mongoose from "mongoose";

export enum ItemStatus {
    ACTIVE = "Active",
    INACTIVE = "Inactive",
}

export enum CategoryType {
    CLOUD_KITCHEN_MENU = "Cloud Kitchen Menu",
    CAFE_MENU = "Cafe Menu", 
}

export interface MenuItemDocument extends mongoose.Document {
  itemId: string;
  categoryType: string;
  categoryName: string;
  itemName: string;
  itemMRP: number;
  itemDiscount: number;
  itemPrice: number;
  itemDescription: string;
  itemImage: {
    public_id: string;
    secure_url: string;
  };
  status: ItemStatus;
  createdAt: Date;
}

const menuItemSchema = new mongoose.Schema<MenuItemDocument>(
  {
    itemId: {
      type: String,
      unique: true,
      required: true,
    },
    categoryType: {
      type: String,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    itemMRP: {
      type: Number,
      required: true,
    },
    itemDiscount: {
      type: Number,
      required: true,
    },
    itemPrice: {
      type: Number,
      required: true,
    },
    itemDescription: {
      type: String,
      required: true,
    },
    itemImage: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(ItemStatus),
      default: ItemStatus.ACTIVE,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  { timestamps: true }
);

const MenuItem: mongoose.Model<MenuItemDocument> =
  mongoose.models?.MenuItem ||
  mongoose.model<MenuItemDocument>("MenuItem", menuItemSchema);

export default MenuItem;

export type MenuItemResponse = {
  success: boolean;
  data: MenuItemDocument[];
  pagination: {
    totalCount: number;
    currentPage: number;
    limit: number;
    totalPages: number;
  };
};
