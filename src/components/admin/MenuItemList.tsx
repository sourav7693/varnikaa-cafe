"use client";
import {
  deleteMenuItem,
  getAllItems,
  updateMenuItem,
} from "@/actions/menuItem";
import { MenuItemDocument, ItemStatus } from "@/models/MenuItem";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import Loader from "../ui/Loader";
import { MdEditDocument } from "react-icons/md";
import { IoMdEye, IoMdClose } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import Spinner from "../ui/Spinner";
import Image from "next/image";

const MenuItemList = ({
  MenuItems,
  pagination,
}: {
  MenuItems: MenuItemDocument[];
  pagination: {
    totalCount: number;
    currentPage: number;
    limit: number;
    totalPages: number;
  };
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [paginationDisabled, setPaginationDisabled] = useState(false);

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [menuItems, setMenuItems] = useState<MenuItemDocument[]>([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [confirmModalId, setConfirmModalId] = useState<string | null>(null);
  const [viewModalId, setViewModalId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalFormData, setModalFormData] = useState<
    Partial<MenuItemDocument> & { newImageFile?: File | null }
  >({});

  const router = useRouter();

  // 🔍 Search or Filter by Category
  const handleSearch = async (value: string) => {
    setSearchQuery(value);
    if (searchTimeout) clearTimeout(searchTimeout);

    const timeout = setTimeout(async () => {
      setTableLoading(true);

      // ✅ If category type is chosen, fetch all items of that type (stop pagination)
      if (value === "Cloud Kitchen Menu" || value === "Cafe Menu") {
        const res = await getAllItems(
          1,
          0,
          "createdAt",
          "desc",
          undefined,
          value
        );
        if (res.success) {
          setMenuItems(res.data);
          setPage(1); // reset page
          setPaginationDisabled(true); // stop infinite scroll
        } else toast.error("Failed to fetch filtered items");
        setTableLoading(false);
        return;
      }

      // ✅ Otherwise normal search
      const res = await getAllItems(
        1,
        10,
        "createdAt",
        "desc",
        undefined,
        value
      );
      if (res.success) {
        setMenuItems(res.data);
        setPaginationDisabled(false); // allow infinite scroll
      } else toast.error("Search failed");

      setTableLoading(false);
    }, 600);

    setSearchTimeout(timeout);
  };

  // 🗑 Delete
  const handleDelete = async (itemId: string) => {
    setTableLoading(true);
    const res = await deleteMenuItem(itemId);
    if (res.success) toast.success("Item deleted successfully");
    else toast.error("Failed to delete item");
    setConfirmModalId(null);
    setTableLoading(false);
    router.refresh();
  };

  useEffect(() => {
    setMenuItems(MenuItems);
  }, [MenuItems]);

  // 📄 Pagination - infinite scroll
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({ threshold: 0.1 });

  const loadMore = async () => {
    if (pagination.totalPages <= page) return;
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const nextPage = page + 1;
      const newItems = await getAllItems(nextPage);
      if (newItems?.success) {
        setMenuItems((prev) => [...prev, ...newItems.data]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Failed to load more items", error);
    }
  };

 useEffect(() => {
   if (paginationDisabled) return;
   if (inView) loadMore();
 }, [inView, paginationDisabled]);


  const handleView = (item: MenuItemDocument, edit = false) => {
    setViewModalId(item.itemId);
    setIsEditMode(edit);
    setModalFormData(item);
  };

  const handleSave = async () => {
    if (!modalFormData?.itemId) return;
    try {
      setTableLoading(true);

      const data = new FormData();
      data.append("itemId", modalFormData.itemId);
      data.append("categoryName", modalFormData.categoryName || "");
      data.append("categoryType", modalFormData.categoryType || "");
      data.append("itemName", modalFormData.itemName || "");
      data.append("itemMRP", String(modalFormData.itemMRP || 0));
      data.append("itemDiscount", String(modalFormData.itemDiscount || 0));
      data.append("itemPrice", String(modalFormData.itemPrice || 0));
      data.append("itemDescription", modalFormData.itemDescription || "");
      data.append("status", modalFormData.status || ItemStatus.ACTIVE);

      if (modalFormData.newImageFile instanceof File) {
        data.append("newImage", modalFormData.newImageFile);
      }

      // Call your updated server action
      const res = await updateMenuItem(data);

      if (res.success) {
        toast.success("Item updated successfully");
        router.refresh();
      } else toast.error(res.message || "Failed to update item");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setTableLoading(false);
      setViewModalId(null);
    }
  };

  // Auto-calc Price when MRP or Discount changes
  useEffect(() => {
    if (
      isEditMode &&
      modalFormData.itemMRP &&
      modalFormData.itemDiscount !== undefined
    ) {
      const price =
        modalFormData.itemMRP -
        (modalFormData.itemMRP * (modalFormData.itemDiscount ?? 0)) / 100;
      setModalFormData((prev) => ({ ...prev, itemPrice: Math.round(price) }));
    }
  }, [modalFormData.itemMRP, modalFormData.itemDiscount]);

  const thead = [
    "ItemID",
    "Category",
    "Item Name",
    "MRP",
    "Price",
    "Discount",
    "Status",
    "Actions",
  ];

  if (tableLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px] md:w-[70%]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full md:w-[70%] flex flex-col self-start gap-4">
      <h1 className="text-3xl p-4 text-defined-darkbrown font-bold">
        Product Management
      </h1>

      {/* Search Bar */}
      <div className="flex justify-between items-center gap-6">
        {/* 🔍 Search Input */}
        <div className="relative w-full">
          <FaSearch className="absolute left-5 top-3 text-lg text-defined-brown" />
          <input
            type="text"
            placeholder="Search by Item name or Category"
            className="w-full text-lg text-defined-brown placeholder:text-defined-brown p-2 pl-12 border border-[#ccc] rounded-md outline-none"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </div>

        {/* 🧭 Category Type Dropdown */}
        <select
          name="categoryType"
          className="w-[30%] p-2 border border-[#ccc] rounded-md outline-none text-defined-brown"
          value={categoryType}
          onChange={(e) => {
            const selectedType = e.target.value;
            setCategoryType(selectedType);
            handleSearch(selectedType);
          }}
        >
          <option value="">Choose Category Type</option>
          <option value="Cloud Kitchen Menu">Cloud Kitchen Menu</option>
          <option value="Cafe Menu">Cafe Menu</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <div className="max-h-[60vh] overflow-y-auto w-full">
          <table className="w-full text-left bitem-collapse">
            <thead className="font-bold text-white bg-defined-darkbrown">
              <tr>
                {thead.map((item, index) => (
                  <th key={index} scope="col" className="px-6 py-3 text-nowrap">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr
                  key={item.itemId}
                  className="bg-white bitem-b bitem-gray-200 last:bitem-transparent"
                >
                  <td className="px-6 py-4 font-semibold text-sm text-nowrap">
                    {item.itemId}
                  </td>
                  <td className="px-6 py-4">{item.categoryName}</td>
                  <td className="px-6 py-4 text-nowrap">{item.itemName}</td>
                  <td className="px-6 py-4">₹{item.itemMRP}</td>
                  <td className="px-6 py-4">₹{item.itemPrice}</td>
                  <td className="px-6 py-4">{item.itemDiscount}%</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.status === ItemStatus.ACTIVE
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {String(item.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleView(item, false)}
                      className="flex items-center justify-center p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <IoMdEye />
                    </button>
                    <button
                      onClick={() => handleView(item, true)}
                      className="flex items-center justify-center p-1 bg-purple-500 text-white rounded hover:bg-purple-600"
                    >
                      <MdEditDocument />
                    </button>
                    <button
                      onClick={() => setConfirmModalId(item.itemId)}
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

      {/* Delete Confirmation */}
      {confirmModalId && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-md p-6 w-[90%] max-w-md text-center space-y-4">
            <p className="text-lg font-semibold">
              Are you sure you want to delete this item?
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
                {tableLoading ? <Spinner /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View/Edit Modal */}
      {viewModalId && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-white rounded-md p-6 w-[90%] max-w-lg space-y-4 overflow-y-auto max-h-[80vh]">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-defined-darkbrown">
                {isEditMode ? "Edit Item Details" : "View Item Details"}
              </h2>
              <button
                className="size-8 flex items-center justify-center rounded-full bg-red-500"
                onClick={() => setViewModalId(null)}
              >
                <IoMdClose className="text-white" />
              </button>
            </div>

            {/* Item Name */}
            <div>
              <label className="font-medium">Item Name:</label>
              {isEditMode ? (
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={modalFormData.itemName || ""}
                  onChange={(e) =>
                    setModalFormData({
                      ...modalFormData,
                      itemName: e.target.value,
                    })
                  }
                />
              ) : (
                <p>{modalFormData.itemName}</p>
              )}
            </div>

            {/* Item Image */}
            <div>
              <label className="font-medium">Item Image:</label>
              {isEditMode ? (
                <div className="flex flex-col gap-3">
                  {modalFormData.itemImage?.secure_url && (
                    <Image
                      width={100}
                      height={100}
                      src={modalFormData.itemImage.secure_url}
                      alt="Current"
                      className="size-44 object-cover rounded-md"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setModalFormData((prev) => ({
                        ...prev,
                        newImageFile: e.target.files?.[0] || null, // 🔥 temporarily hold new file
                      }))
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
              ) : (
                <Image
                  src={modalFormData.itemImage?.secure_url || ""}
                  width={100}
                  height={100}
                  alt="Item"
                  className="w-40 h-40 object-cover rounded-md border"
                />
              )}
            </div>

            {/* Description */}
            <div>
              <label className="font-medium">Description:</label>
              {isEditMode ? (
                <textarea
                  className="w-full border p-2 rounded"
                  value={modalFormData.itemDescription || ""}
                  onChange={(e) =>
                    setModalFormData({
                      ...modalFormData,
                      itemDescription: e.target.value,
                    })
                  }
                />
              ) : (
                <p>{modalFormData.itemDescription}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="font-medium">Status:</label>
              {isEditMode ? (
                <select
                  className="w-full border p-2 rounded"
                  value={modalFormData.status || ItemStatus.ACTIVE}
                  onChange={(e) =>
                    setModalFormData({
                      ...modalFormData,
                      status: e.target.value as ItemStatus,
                    })
                  }
                >
                  <option value={ItemStatus.ACTIVE}>Active</option>
                  <option value={ItemStatus.INACTIVE}>Inactive</option>
                </select>
              ) : (
                <p>{modalFormData.status}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="font-medium">Category:</label>
              {isEditMode ? (
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={modalFormData.categoryName || ""}
                  onChange={(e) =>
                    setModalFormData({
                      ...modalFormData,
                      categoryName: e.target.value,
                    })
                  }
                />
              ) : (
                <p>{modalFormData.categoryName}</p>
              )}
            </div>

            {/* Category Type */}
            <div>
              <label className="font-medium">Category Type:</label>
              {isEditMode ? (
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={modalFormData.categoryType || ""}
                  onChange={(e) =>
                    setModalFormData({
                      ...modalFormData,
                      categoryType: e.target.value,
                    })
                  }
                />
              ) : (
                <p>{modalFormData.categoryType}</p>
              )}
            </div>

            {/* MRP */}
            <div>
              <label className="font-medium">MRP:</label>
              {isEditMode ? (
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  min={1}
                  value={modalFormData.itemMRP || 0}
                  onChange={(e) =>
                    setModalFormData({
                      ...modalFormData,
                      itemMRP: Number(e.target.value),
                    })
                  }
                />
              ) : (
                <p>₹{modalFormData.itemMRP}</p>
              )}
            </div>

            {/* Discount */}
            <div>
              <label className="font-medium">Discount (%):</label>
              {isEditMode ? (
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  min={0}
                  value={modalFormData.itemDiscount || 0}
                  onChange={(e) =>
                    setModalFormData({
                      ...modalFormData,
                      itemDiscount: Number(e.target.value),
                    })
                  }
                />
              ) : (
                <p>{modalFormData.itemDiscount}%</p>
              )}
            </div>

            {/* Auto Price */}
            <div>
              <label className="font-medium">Price (Auto-calculated):</label>
              <p className="font-semibold text-defined-darkbrown">
                ₹{modalFormData.itemPrice || 0}
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-4">
              {isEditMode && (
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded"
                  onClick={handleSave}
                  disabled={tableLoading}
                >
                  {tableLoading ? <Spinner /> : "Save"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {pagination.totalPages > page && !paginationDisabled && (
        <div className="flex justify-center items-center gap-4 mt-6" ref={ref}>
          <span className="animate-pulse text-2xl font-bold">Loading...</span>
          <div
            className="size-9 inline-block rounded-full border-6 border-r-defined-purple border-solid animate-spin border-white"
            role="status"
            aria-label="Loading"
          ></div>
        </div>
      )}
    </div>
  );
};

export default MenuItemList;
