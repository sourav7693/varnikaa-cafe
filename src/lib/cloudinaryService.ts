import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import fs from "fs/promises";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export interface UploadFileResult {
  secure_url: string;
  public_id: string;
  format: string;
  resource_type: string;
  [key: string]: unknown;
}
 
export const uploadFile = async (
  tempFilePath: string,  
): Promise<UploadFileResult | Error> => {
  try {
    const format = "jpg";
    const resourceType: "image" | "video" | "raw" | "auto" = "image";

    const result: UploadFileResult = await cloudinary.uploader.upload(
      tempFilePath,
      {
        folder: `varnikaaCafe/items`,
        resource_type: resourceType,
        format: format,
      }
    );

    await fs.unlink(tempFilePath);
    return result;
  } catch (error) {
    console.error("Error uploading file:", error);
    return new Error("File upload failed");
  }
};


export const deleteFile = async (
  publicId: string
): Promise<UploadApiResponse | Error> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting file:", error);
    return new Error("File deletion failed");
  }
};

export default cloudinary;