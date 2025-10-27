"use server";
import Coupon, { CouponDocument } from "@/models/Coupon";
import { connectDb } from "@/lib/connection";
import { generateCustomId } from "@/helper/generateCustomId";
import { revalidatePath } from "next/cache";

export async function validateCoupon(code: string) {
  try {
    await connectDb();
    const coupon = await Coupon.findOne({ code: code.trim() }).lean();

    if (!coupon) {
      return { success: false, message: "Invalid Coupon" };
    }

    const now = new Date();
    if (now < new Date(coupon.startDate)) {
      return { success: false, message: "Coupon not active yet" };
    }
    if (now > new Date(coupon.expiryDate)) {
      return { success: false, message: "Coupon Expired" };
    }

    if (!coupon.active) {
      return { success: false, message: "Coupon Inactive" };
    }

    return {
      success: true,
      discount: coupon.discount,
      message: "Coupon Applied Successfully",
    };
  } catch (err) {
    console.error("validateCoupon error:", err);
    return { success: false, message: "Internal server error" };
  }
}

export async function createCoupon(formData: FormData) {
  try {
    await connectDb();

    const name = (formData.get("name") as string)?.trim();
    const code = (formData.get("code") as string)?.trim();
    const discount = Number(formData.get("discount"));
    const startDate = new Date(formData.get("startDate") as string);
    const expiryDate = new Date(formData.get("expiryDate") as string);

    if (!name || !code || !discount || !startDate || !expiryDate)
      return { success: false, message: "All fields are required" };

    const couponId = await generateCustomId(Coupon, "couponId", "#CP-");

    const newCoupon = await Coupon.create({
      couponId,
      name,
      code,
      discount,
      startDate,
      expiryDate,
      active: true,
    });

    revalidatePath("/admin-coupon-management");
    return {
      success: true,
      message: "Coupon created successfully",
      data: JSON.parse(JSON.stringify(newCoupon)),
    };
  } catch (err) {
    console.error("createCoupon error:", err);
    return { success: false, message: "Failed to create coupon" };
  }
}

// ✅ Get All Coupons
export async function getAllCoupons(
  page: number | string = 1,
  limit: number | string = 10,
  sort: string = "createdAt",
  order: "asc" | "desc" = "desc"
) {
  try {
    await connectDb();
    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * pageSize;

    const sortOrder = order === "asc" ? 1 : -1;
    const sortQuery: Record<string, 1 | -1> = { [sort]: sortOrder };

    
    const totalCount = await Coupon.countDocuments();
    const coupons = await Coupon.find()
      .sort(sortQuery)
      .skip(skip)
      .limit(pageSize)
      .lean<CouponDocument[]>();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(coupons)),
      pagination: {
        totalCount,
        currentPage: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (err) {
    console.error("getAllCoupons error:", err);
     return {
       success: false,
       data: [],
       pagination: { totalCount: 0, currentPage: 1, limit: 10, totalPages: 0 },
     };
  }
}

export async function updateCoupon(
  id: string,
  updates: Partial<CouponDocument>
) {
  try {
    await connectDb();
    const updated = await Coupon.findOneAndUpdate(
      { couponId: id },
      { $set: updates },
      { new: true }
    );
    if (!updated) return { success: false, message: "Coupon not found" };
    revalidatePath("/admin-coupon-management");
    return { success: true, message: "Coupon updated successfully" };
  } catch (err) {
    console.error("updateCoupon error:", err);
    return { success: false, message: "Failed to update coupon" };
  }
}

export async function deleteCoupon(id: string) {
  try {
    await connectDb();
    const deleted = await Coupon.findOneAndDelete({ couponId: id });
    if (!deleted) return { success: false, message: "Coupon not found" };
    revalidatePath("/admin-coupon-management");
    return { success: true, message: "Coupon deleted successfully" };
  } catch (err) {
    console.error("deleteCoupon error:", err);
    return { success: false, message: "Failed to delete coupon" };
  }
}
