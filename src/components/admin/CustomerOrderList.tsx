"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  deleteExistingCustomerOrder,
  getAllCustomerOrder,
  updateCustomerOrder,
} from "@/actions/customerOrder";
import { CustomerOrderDocument, OrderStatus, PaymentStatus } from "@/models/CustomerOrder";
import Loader from "@/components/ui/Loader";
import Spinner from "@/components/ui/Spinner";
import { useRouter } from "next/navigation";
import { MdEditDocument } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import { IoMdEye } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

export default function CustomerOrderList({
  CustomerOrders,
  pagination,
}: {
  CustomerOrders: CustomerOrderDocument[];
  pagination: {
    totalCount: number;
    currentPage: number;
    limit: number;
    totalPages: number;
  };
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [orders, setOrders] = useState<CustomerOrderDocument[]>([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [confirmModalId, setConfirmModalId] = useState<string | null>(null);
  const [viewModalId, setViewModalId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalFormData, setModalFormData] = useState<
    Partial<CustomerOrderDocument>
  >({});
  
  const router = useRouter();

  const handleSearch = (value: string) => {
    setSearchQuery(value);

    if (searchTimeout) clearTimeout(searchTimeout);

    const timeout = setTimeout(async () => {
      if (value.trim() === "") {
        setOrders(CustomerOrders); // reset to initial list
        return;
      }

      setTableLoading(true);
      const res = await getAllCustomerOrder(
        1,
        10,
        "createdAt",
        "desc",
        undefined,
        value
      );
      if (res.success) {
        setOrders(res.data);
      } else {
        toast.error("Search failed");
      }
      setTableLoading(false);
    }, 800); // debounce 0.5s

    setSearchTimeout(timeout);
  };

  useEffect(() => {
    setOrders(CustomerOrders);
  }, [CustomerOrders]);

  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({ threshold: 0.1 });

  const loadMore = async () => {
    if (pagination.totalPages <= page) return;
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const nextPage = page + 1;
      const newOrders = await getAllCustomerOrder(nextPage);
      if (newOrders?.success) {
        setOrders((prev) => [...prev, ...newOrders.data]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Failed to load more orders", error);
    }
  };

  useEffect(() => {
    if (inView) loadMore();
  }, [inView]);  

  const handleDelete = async (orderId: string) => {
    setTableLoading(true);
    const res = await deleteExistingCustomerOrder(orderId);
    if (res.success) toast.success("Order deleted successfully");
    else toast.error("Failed to delete order");
    setConfirmModalId(null);
    setTableLoading(false);
    router.refresh();
  };

  const thead = [
    "Order ID",
    "Customer Name",    
    "Phone",
    "Order Value",
    "DateTime",
    "Address",    
    "Payment",
    "Status",
    "Actions",
  ];

  if (tableLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader />
      </div>
    );
  }

  const handleView = (order: CustomerOrderDocument, edit = false) => {
    setViewModalId(order.orderId);
    setIsEditMode(edit);
    setModalFormData(order);
  };

  return (
    <>
      <div className="relative">
        <FaSearch className="absolute left-5 top-3 text-lg text-defined-brown" />
        <input
          type="text"
          placeholder="Search by name or phone number"
          className="w-full text-lg text-defined-brown placeholder:text-defined-brown p-2 pl-12 border border-[#ccc] rounded-md outline-none"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-[60vh] overflow-y-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead className="font-bold text-white bg-defined-green">
              <tr>
                {thead.map((item, index) => (
                  <th key={index} scope="col" className="px-6 py-3 text-nowrap">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.orderId}
                  className="bg-white border-b border-gray-200 last:border-transparent"
                >
                  {/* Order ID */}
                  <td className="px-6 py-4 font-semibold text-sm">
                    {order.orderId}
                  </td>

                  {/* Customer Name */}
                  <td className="px-6 py-4">{order.customerName}</td>

                  {/* Phone */}
                  <td className="px-6 py-4">{order.customerPhone}</td>

                  {/* Order Value */}
                  <td className="px-6 py-4">₹{order.orderValue}</td>

                  {/* DateTime */}
                  <td className="px-6 py-4 text-sm">
                    {order.createdAt
                      ? (() => {
                          const date = new Date(order.createdAt);
                          const formattedDate = date.toLocaleDateString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "2-digit",
                            }
                          ); // e.g., 12 Oct 25
                          const formattedTime = date.toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          ); // e.g., 03:00 PM
                          return `${formattedDate} | ${formattedTime}`;
                        })()
                      : ""}
                  </td>

                  {/* Address */}
                  <td className="px-6 py-4 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {order.customerAddress}
                  </td>

                  {/* Payment Status */}
                  <td
                    className={`px-6 py-4 font-semibold ${
                      order.paymentStatus === "Paid"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {order.paymentStatus}
                  </td>

                  {/* Order Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 flex items-center justify-center gap-2">
                    {/* View */}
                    <button
                      onClick={() => handleView(order, false)}
                      className="flex items-center justify-center p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <IoMdEye />
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => handleView(order, true)}
                      className="flex items-center justify-center p-1 bg-purple-500 text-white rounded hover:bg-purple-600"
                    >
                      <MdEditDocument />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => setConfirmModalId(order.orderId)}
                      className="flex items-center justify-center p-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModalId && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-md p-6 w-[90%] max-w-md text-center space-y-4">
            <p className="text-lg font-semibold">
              Are you sure you want to delete this order?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setConfirmModalId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => handleDelete(confirmModalId)}
              >
                {tableLoading ? (
                  <div className="flex gap-2 items-center">
                    <span className="animate-pulse">Deleting...</span>{" "}
                    <Spinner />
                  </div>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {viewModalId && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-md w-full max-w-xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">
                {isEditMode ? "Edit Order" : "View Order"}
              </h2>
              <button
                className="size-8 flex items-center justify-center rounded-full bg-red-500"
                onClick={() => setViewModalId(null)}
              >
                <IoClose className="text-white" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 space-y-4">
              {/* Order ID */}
              <div>
                <label className="font-medium">Order ID:</label>
                <p>{modalFormData.orderId}</p>
              </div>

              {/* Customer Name */}
              <div>
                <label className="font-medium">Customer Name:</label>
                {isEditMode ? (
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={modalFormData.customerName}
                    onChange={(e) =>
                      setModalFormData({
                        ...modalFormData,
                        customerName: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p>{modalFormData.customerName}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="font-medium">Phone:</label>
                {isEditMode ? (
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={modalFormData.customerPhone}
                    onChange={(e) =>
                      setModalFormData({
                        ...modalFormData,
                        customerPhone: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p>{modalFormData.customerPhone}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="font-medium">Address:</label>
                {isEditMode ? (
                  <textarea
                    className="w-full border p-2 rounded"
                    value={modalFormData.customerAddress}
                    onChange={(e) =>
                      setModalFormData({
                        ...modalFormData,
                        customerAddress: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p>{modalFormData.customerAddress}</p>
                )}
              </div>

              {/* Landmark */}
              <div>
                <label className="font-medium">Landmark:</label>
                {isEditMode ? (
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={modalFormData.customerLandMark}
                    onChange={(e) =>
                      setModalFormData({
                        ...modalFormData,
                        customerLandMark: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p>{modalFormData.customerLandMark}</p>
                )}
              </div>

              {/* Pincode */}
              <div>
                <label className="font-medium">Pin Code:</label>
                {isEditMode ? (
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={modalFormData.customerPinCode}
                    onChange={(e) =>
                      setModalFormData({
                        ...modalFormData,
                        customerPinCode: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p>{modalFormData.customerPinCode}</p>
                )}
              </div>

              {/* Order Value */}
              <div>
                <label className="font-medium">Order Value:</label>
                {isEditMode ? (
                  <input
                    type="number"
                    className="w-full border p-2 rounded"
                    value={modalFormData.orderValue}
                    onChange={(e) =>
                      setModalFormData({
                        ...modalFormData,
                        orderValue: Number(e.target.value),
                      })
                    }
                  />
                ) : (
                  <p>{modalFormData.orderValue}</p>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <label className="font-medium">Payment Method:</label>
                {isEditMode ? (
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={modalFormData.paymentMethod}
                    onChange={(e) =>
                      setModalFormData({
                        ...modalFormData,
                        paymentMethod: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p>{modalFormData.paymentMethod}</p>
                )}
              </div>

              {/* Payment Status */}
              <div>
                <label className="font-medium">Payment Status:</label>
                <p>{modalFormData.paymentStatus}</p>
              </div>

              {/* Order Status */}
              <div>
                <label className="font-medium">Order Status:</label>
                {isEditMode ? (
                  <select
                    className="w-full border p-2 rounded"
                    value={modalFormData.status}
                    onChange={(e) =>
                      setModalFormData({
                        ...modalFormData,
                        status: e.target.value as OrderStatus,
                      })
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                ) : (
                  <p>{modalFormData.status}</p>
                )}
              </div>

              {/* Razorpay Info */}
              <div>
                <label className="font-medium">Razorpay Order ID:</label>
                <p>{modalFormData.razorPayOrderId || "—"}</p>
              </div>
              <div>
                <label className="font-medium">Razorpay Payment ID:</label>
                <p>{modalFormData.razorPayPaymentId || "—"}</p>
              </div>
              <div>
                <label className="font-medium">Razorpay Signature:</label>
                <p>{modalFormData.razorPaySignature || "—"}</p>
              </div>

              {/* Created / Updated */}
              {/* <div className="text-sm text-gray-600">
                <p>
                  Created At:{" "}
                  {}
                  {new Date(modalFormData.createdAt).toLocaleString()}
                </p>
                <p>
                  Updated At:{" "}
                  {new Date(modalFormData.updatedAt).toLocaleString()}
                </p>
              </div> */}
            </div>

            {/* Footer */}
            {isEditMode && (
              <div className="p-4 border-t flex justify-end">
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={async () => {
                    if (!modalFormData.orderId) return;
                    setTableLoading(true);
                    const res = await updateCustomerOrder(
                      modalFormData.orderId,
                      {
                        ...modalFormData,
                        paymentStatus:
                          modalFormData.paymentStatus as PaymentStatus,
                        status: modalFormData.status as OrderStatus,
                      }
                    );

                    if (res.success)
                      toast.success("Order updated successfully");
                    else toast.error("Failed to update order");

                    setTableLoading(false);
                    setViewModalId(null);
                    router.refresh();
                  }}
                >
                  {tableLoading ? <Spinner /> : "Save"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Infinite Scroll Loader */}
      {pagination.totalPages > page && (
        <div className="flex justify-center items-center gap-4 mt-6" ref={ref}>
          <span className="animate-pulse text-2xl font-bold">Loading...</span>
          <div
            className="size-9 inline-block rounded-full border-6 border-r-defined-purple border-solid animate-spin border-white"
            role="status"
            aria-label="Loading"
          ></div>
        </div>
      )}
    </>
  );
}
