"use client";

import { useEffect, useState } from "react";
import { updateCoupon, deleteCoupon } from "@/actions/coupon";
import { FaEdit, FaSave, FaTrash, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import { CouponDocument } from "@/models/Coupon";

export default function CouponTable({
  initialCoupons,
}: {
  initialCoupons: CouponDocument[];
}) {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<CouponDocument>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleEdit = (coupon: CouponDocument) => {
    setEditingId(coupon.couponId);
    setEditData(coupon);
  };

  const handleSave = async (id: string) => {
    const res = await updateCoupon(id, editData);
    if (res.success) {
      toast.success("Coupon updated!");
      setEditingId(null);
    } else toast.error(res.message);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const res = await deleteCoupon(deleteId);
    if (res.success) {
      setCoupons((prev) => prev.filter((c) => c.couponId !== deleteId));
      toast.success("Coupon deleted!");
    } else toast.error(res.message);
    setDeleteId(null);
  };

  useEffect(() => {
    setCoupons(initialCoupons);
  }, [initialCoupons]);


  return (
    <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto relative">
      <h2 className="text-xl font-bold text-defined-green mb-4">
        Coupons List
      </h2>

      {coupons.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No coupons available</p>
      ) : (
        <table className="w-full border-collapse">
          <thead className="bg-defined-green text-white text-left">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Code</th>
              <th className="p-3">Start Date</th>
              <th className="p-3">Expiry Date</th>
              <th className="p-3">Discount</th>
              <th className="p-3">Active</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {coupons.map((coupon : CouponDocument) => (
              <tr key={coupon.couponId} className="border-b">
                <td className="p-3">{coupon.couponId}</td>

                <td className="p-3">
                  {editingId === coupon.couponId ? (
                    <input
                      type="text"
                      value={editData.code || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, code: e.target.value })
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    coupon.code
                  )}
                </td>

                <td className="p-3">
                  {editingId === coupon.couponId ? (
                    <DatePicker
                      selected={
                        editData.startDate
                          ? new Date(editData.startDate)
                          : new Date()
                      }
                      onChange={(date) =>
                        date &&
                        setEditData({
                          ...editData,
                          startDate: date,
                        })
                      }
                      showTimeSelect
                      dateFormat="Pp"
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    new Date(coupon.startDate).toLocaleString()
                  )}
                </td>

                <td className="p-3">
                  {editingId === coupon.couponId ? (
                    <DatePicker
                      selected={
                        editData.expiryDate
                          ? new Date(editData.expiryDate)
                          : new Date()
                      }
                      onChange={(date) =>
                        date &&
                        setEditData({
                          ...editData,
                          expiryDate: date,
                        })
                      }
                      showTimeSelect
                      dateFormat="Pp"
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    new Date(coupon.expiryDate).toLocaleString()
                  )}
                </td>

                <td className="p-3">{coupon.discount}%</td>

                <td className="p-3">
                  {editingId === coupon.couponId ? (
                    <select
                      value={String(editData.active)}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          active: e.target.value === "true",
                        })
                      }
                      className="border p-1 rounded w-full"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        coupon.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {coupon.active ? "Active" : "Inactive"}
                    </span>
                  )}
                </td>

                <td className="p-3 flex justify-center gap-2">
                  {editingId === coupon.couponId ? (
                    <>
                      <button
                        onClick={() => handleSave(coupon.couponId)}
                        className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(coupon)}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => setDeleteId(coupon.couponId)}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 🔥 Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-sm">
            <h3 className="text-lg font-semibold text-defined-darkbrown mb-2">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this coupon? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
