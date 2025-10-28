"use server";

import { connectDb } from "@/lib/connection";
import Popup, { PopupDocument } from "@/models/Popup";
import { revalidatePath } from "next/cache";
import { uploadFile, deleteFile } from "@/lib/cloudinaryService"; // replace with your logic
import { parseImage } from "@/helper/parseImage";
import { generateCustomId } from "@/helper/generateCustomId";

export async function createPopup(formData: FormData) {
  try {
    await connectDb();

    const name = formData.get("name") as string;
    const popupImg = formData.get("image") as File;

    if (!name || !popupImg)
      return { success: false, message: "Missing fields" };

    // Upload image
    const tempFilePath = await parseImage(popupImg);
        const [fileUploadResult, popupId] = await Promise.all([
          uploadFile(tempFilePath),
          generateCustomId(Popup, "popupId", "#POP-"),
        ]);
    
        if (fileUploadResult instanceof Error) {
          return { success: false, message: "Image upload failed" };
        }

   const popup = await Popup.create({
      popupId,
      name,
      image: {
        public_id: fileUploadResult.public_id,
        secure_url: fileUploadResult.secure_url,
      },
    });
    const savedItem = await popup.save();

    revalidatePath("/admin-popup-management");
    revalidatePath("/");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(savedItem)),
      message: "Popup created successfully",
    };
  } catch (error) {
    console.error("createPopup error:", error);
    return { success: false, message: "Error creating popup" };
  }
}

export async function getAllPopups(
  page: number | string = 1,
  limit: number | string = 10,
  sort: string = "createdAt",
  order: "asc" | "desc" = "desc",
) {
  try {
    await connectDb();
   const pageNumber = parseInt(page as string, 10);
   const pageSize = parseInt(limit as string, 10);
   const skip = (pageNumber - 1) * pageSize;

   const sortOrder = order === "asc" ? 1 : -1;
   const sortQuery: Record<string, 1 | -1> = { [sort]: sortOrder };

   await connectDb();

   const popups = await Popup.find()
     .sort(sortQuery)
     .skip(skip)
     .limit(pageSize)
     .lean<PopupDocument[]>();

   const totalPopups = await Popup.countDocuments();

   return {
     success: true,
     data: JSON.parse(JSON.stringify(popups)),
     pagination: {
       totalCount: totalPopups,
       currentPage: pageNumber,
       limit: pageSize,
       totalPages: Math.ceil(totalPopups / pageSize),
     },
   };
  } catch (error) {
    console.error("getAllPopups error:", error);
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

export async function deletePopup(id: string) {
  try {
   await connectDb();
   const deleteItem = await Popup.findOne({ popupId: id });
   if (!deleteItem) return { success: false, message: "Item not found" };
   await deleteFile(deleteItem.image.public_id);

   const deleted = await Popup.findOneAndDelete({ popupId: id });
   if (!deleted) return { success: false, message: "Popup not found" };

   revalidatePath("/admin-popup-management");
   revalidatePath("/");

   return { success: true, message: "Popup deleted successfully" };
  } catch (error) {
    console.error("deletePopup error:", error);
    return { success: false, message: "Error deleting popup" };
  }
}
