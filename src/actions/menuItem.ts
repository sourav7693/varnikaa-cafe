"use server";
import { generateCustomId } from "@/helper/generateCustomId";
import { parseImage } from "@/helper/parseImage";
import { deleteFile, uploadFile } from "@/lib/cloudinaryService";
import { connectDb } from "@/lib/connection";
import MenuItem, { ItemStatus, MenuItemDocument } from "@/models/MenuItem";
import { revalidatePath } from "next/cache";

export async function createMenuItem(formData: FormData) {
  try {
    const categoryType = (formData.get("categoryType") as string)?.trim();
    const categoryName = (formData.get("categoryName") as string)?.trim();
    const itemName = (formData.get("itemName") as string)?.trim();
    const itemMRP = Number(formData.get("itemMRP"));
    const itemDiscount = Number(formData.get("itemDiscount"));
    const itemPrice = Number(formData.get("itemPrice"));
    const itemDescription = (formData.get("itemDescription") as string)?.trim();
    const itemImage = formData.get("itemImage") as File;

    if (
      !categoryType ||
      !categoryName ||
      !itemName ||
      !itemMRP ||
      !itemDescription ||
      !itemImage
    ) {
      return { success: false, message: "All fields are required" };
    }

    await connectDb();

    const tempFilePath = await parseImage(itemImage);
    const [fileUploadResult, itemId] = await Promise.all([
      uploadFile(tempFilePath),
      generateCustomId(MenuItem, "itemId", "#MI-"),
    ]);

    if (fileUploadResult instanceof Error) {
      return { success: false, message: "Image upload failed" };
    }

    const newMenuItem = new MenuItem({
      itemId,
      categoryType,
      categoryName,
      itemName,
      itemMRP,
      itemDiscount,
      itemPrice,
      itemDescription,
      itemImage: {
        secure_url: fileUploadResult.secure_url,
        public_id: fileUploadResult.public_id,
      },
    });

    const savedItem = await newMenuItem.save();

    revalidatePath("/admin-menu-products-management");
    revalidatePath("/");
    revalidatePath("/menu");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(savedItem)),
      message: "Menu item created successfully",
    };
  } catch (error) {
    console.error("Error creating MenuItem:", error);
    return { success: false, message: "Internal server error" };
  }
}

export async function getAllItems(
  page: number | string = 1,
  limit: number | string = 10,
  sort: string = "createdAt",
  order: "asc" | "desc" = "desc",
  categoryType?: string,
  searchQuery?: string
) {
  try {
    await connectDb();

    const filter: Record<string, unknown> = {};

    if (categoryType && categoryType.trim() !== "") {
      filter.categoryType = categoryType.trim();
    }

    if (searchQuery && searchQuery.trim() !== "") {
      const searchRegex = { $regex: searchQuery.trim(), $options: "i" };
      filter.$or = [
        { itemName: searchRegex },
        { categoryName: searchRegex },
        { categoryType: searchRegex },
      ];
    }

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * pageSize;

    const sortOrder = order === "asc" ? 1 : -1;
    const sortQuery: Record<string, 1 | -1> = { [sort]: sortOrder };

    // ✅ Query execution
   let query = MenuItem.find(filter).sort(sortQuery);
   if (pageSize > 0) {
     query = query.skip(skip).limit(pageSize);
   }

   const [items, totalCount] = await Promise.all([
     query.lean(),
     MenuItem.countDocuments(filter),
   ]);

   return {
     success: true,
     data: JSON.parse(JSON.stringify(items)),
     pagination: {
       totalCount,
       currentPage: pageNumber,
       limit: pageSize,
       totalPages: pageSize > 0 ? Math.ceil(totalCount / pageSize) : 1,
     },
   };
  } catch (error) {
    console.error("getAllItems error:", error);
    return {
      success: false,
      data: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
        limit: 10,
        totalPages: 0,
      },
    };
  }
}



export async function deleteMenuItem(itemId: string) {
  try {
    await connectDb();
    const deleteItem = await MenuItem.findOne({ itemId });
    if (!deleteItem)  return { success: false, message: "Item not found" };
    await deleteFile(deleteItem.itemImage.public_id);

    const deleted = await MenuItem.findOneAndDelete({ itemId });
    if (!deleted) return { success: false, message: "Menu item not found" };

    revalidatePath("/admin-menu-products-management");
    revalidatePath("/");
    revalidatePath("/menu");

    return { success: true, message: "Menu item deleted successfully" };
  } catch (err: unknown) {
    console.error(
      "deleteMenuItem error:",
      err instanceof Error ? err.message : err
    );
    return { success: false, message: "Failed to delete item" };
  }
}

export async function updateMenuItem(formData: FormData) {
  try {
    await connectDb();

    const itemId = formData.get("itemId") as string;
    if (!itemId) return { success: false, message: "Item ID required" };

    const updatedData: Partial<MenuItemDocument> = {
      categoryName: (formData.get("categoryName") as string)?.trim(),
      categoryType: (formData.get("categoryType") as string)?.trim(),
      itemName: (formData.get("itemName") as string)?.trim(),
      itemMRP: Number(formData.get("itemMRP")),
      itemDiscount: Number(formData.get("itemDiscount")),
      itemPrice: Number(formData.get("itemPrice")),
      itemDescription: (formData.get("itemDescription") as string)?.trim(),
      status: formData.get("status") as ItemStatus,
    };

    const newImageFile = formData.get("newImage") as File | null;
    if (newImageFile && newImageFile.size > 0) {
      const deleteItem = await MenuItem.findOne({ itemId });
      if (!deleteItem) return { success: false, message: "Error in uploading image as item not found" };
      await deleteFile(deleteItem.itemImage.public_id);
      const tempPath = await parseImage(newImageFile);
      const uploadResult = await uploadFile(tempPath);
      if (!(uploadResult instanceof Error)) {
        updatedData.itemImage = {
          public_id: uploadResult.public_id,
          secure_url: uploadResult.secure_url,
        };
      }
    }

    const updatedItem = await MenuItem.findOneAndUpdate(
      { itemId },
      { $set: updatedData },
      { new: true }
    );

    if (!updatedItem) return { success: false, message: "Menu item not found" };

    revalidatePath("/admin-menu-products-management");
    revalidatePath("/");
    revalidatePath("/menu");

    return { success: true, data: JSON.parse(JSON.stringify(updatedItem)) };
  } catch (err) {
    console.error("updateMenuItem error:", err);
    return { success: false, message: "Failed to update item" };
  }
}


