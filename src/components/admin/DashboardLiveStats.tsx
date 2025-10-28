"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getDashboardStats } from "@/actions/dashboardStats";
import { CustomerOrderDocument } from "@/models/CustomerOrder";
import { MenuItemDocument } from "@/models/MenuItem";
import DashboardCard from "../ui/DashboardCard";

interface DashboardData {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalCoupons: number;
  lastOrder: CustomerOrderDocument;
  lastProduct: MenuItemDocument;
}

export default function DashboardLiveStats({
  initialData,
}: {
  initialData: DashboardData;
}) {
  const [data, setData] = useState<DashboardData>(initialData);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      setIsRefreshing(true);
      const res = await getDashboardStats();
      if (res.success) setData(res.data);
      setIsRefreshing(false);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Products"
          count={data.totalProducts}
          color="bg-green-100"
        />
        <DashboardCard
          title="Total Categories"
          count={data.totalCategories}
          color="bg-blue-100"
        />
        <DashboardCard
          title="Total Orders"
          count={data.totalOrders}
          color="bg-yellow-100"
        />
        <DashboardCard
          title="Total Coupons"
          count={data.totalCoupons}
          color="bg-purple-100"
        />
      </div>

      {isRefreshing && (
        <p className="text-xs text-gray-400 italic text-center mt-2">
          Updating stats...
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Last Order */}
        <div className="bg-gradient-to-br from-amber-100 to-yellow-50 border border-yellow-200 rounded-xl p-6 shadow hover:shadow-lg transition-all">
          <h2 className="text-xl font-semibold text-amber-800 mb-4">
            🧾 Last Order Summary
          </h2>
          {data.lastOrder ? (
            <div className="space-y-2 text-amber-900">
              <p>
                <strong>Order ID:</strong> {data.lastOrder.orderId}
              </p>
              <p>
                <strong>Customer:</strong> {data.lastOrder.customerName}
              </p>
              <p>
                <strong>Total:</strong> ₹{data.lastOrder.orderValue}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(data.lastOrder.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    data.lastOrder.status === "Delivered"
                      ? "text-green-600"
                      : "text-orange-500"
                  }`}
                >
                  {data.lastOrder.status}
                </span>
              </p>
              <Link
                href="/admin-customer-order-management"
                className="inline-block mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
              >
                Visit Orders →
              </Link>
            </div>
          ) : (
            <p className="text-gray-600">No orders found yet.</p>
          )}
        </div>

        {/* Last Product */}
        <div className="bg-gradient-to-br from-green-100 to-teal-50 border border-green-200 rounded-xl p-6 shadow hover:shadow-lg transition-all">
          <h2 className="text-xl font-semibold text-green-800 mb-4">
            🍴 Last Product Added
          </h2>
          {data.lastProduct ? (
            <div className="space-y-2 text-green-900">
              <p>
                <strong>Item:</strong> {data.lastProduct.itemName}
              </p>
              <p>
                <strong>Category:</strong> {data.lastProduct.categoryName}
              </p>
              <p>
                <strong>Type:</strong> {data.lastProduct.categoryType}
              </p>
              <p>
                <strong>Price:</strong> ₹{data.lastProduct.itemPrice}
              </p>
              <p>
                <strong>Added On:</strong>{" "}
                {new Date(data.lastProduct.createdAt).toLocaleString()}
              </p>
              <Link
                href="/admin-menu-products-management"
                className="inline-block mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Visit Products →
              </Link>
            </div>
          ) : (
            <p className="text-gray-600">No products added yet.</p>
          )}
        </div>
      </div>
    </>
  );
}