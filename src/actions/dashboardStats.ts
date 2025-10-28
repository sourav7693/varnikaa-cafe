"use server";
import { connectDb } from "@/lib/connection";
import MenuItem from "@/models/MenuItem";
import Coupon from "@/models/Coupon";
import CustomerOrder from "@/models/CustomerOrder";

export async function getDashboardStats() {
  try {
    await connectDb();

    const [totalProducts, totalCategories, totalOrders, totalCoupons] =
      await Promise.all([
        MenuItem.countDocuments(),
        MenuItem.distinct("categoryName").then((cats) => cats.length),
        CustomerOrder.countDocuments(),
        Coupon.countDocuments(),
      ]);

    const lastOrder = await CustomerOrder.findOne()
      .sort({ createdAt: -1 })
      .select("customerName orderId orderValue createdAt status")
      .lean();

    const lastProduct = await MenuItem.findOne()
      .sort({ createdAt: -1 })
      .select("itemName categoryName categoryType itemPrice createdAt")
      .lean();

    return {
      success: true,
      data: {
        totalProducts: JSON.parse(JSON.stringify(totalProducts)),
        totalCategories: JSON.parse(JSON.stringify(totalCategories)),
        totalOrders: JSON.parse(JSON.stringify(totalOrders)),
        totalCoupons: JSON.parse(JSON.stringify(totalCoupons)),
        lastOrder : JSON.parse(JSON.stringify(lastOrder)),
        lastProduct : JSON.parse(JSON.stringify(lastProduct)),
      },
    };
  } catch (err) {
    console.error("Dashboard stats error:", err);
    return {
      success: false,
      data: {
        totalProducts: 0,
        totalCategories: 0,
        totalOrders: 0,
        totalCoupons: 0,
        lastOrder: null,
        lastProduct: null,
      },
    };
  }
}
