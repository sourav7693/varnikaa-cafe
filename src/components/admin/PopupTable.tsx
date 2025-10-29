"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { deletePopup, getAllPopups } from "@/actions/popup";
import { PopupDocument } from "@/models/Popup";
import { IoMdEye, IoMdClose } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import Spinner from "../ui/Spinner";

export default function PopupTable({
  initialPopups,
}: {
  initialPopups: PopupDocument[];
}) {
  const [popups, setPopups] = useState(initialPopups);
  const [loading, setLoading] = useState(false);
  const [viewModal, setViewModal] = useState<PopupDocument | null>(null);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  // Function to re-fetch after add or delete
  const refreshPopups = async () => {
    const res = await getAllPopups();
    if (res.success) setPopups(res.data);
  };

  // Listen to custom event from form (dispatched after successful creation)
  useEffect(() => {
    const handleRefresh = () => refreshPopups();
    window.addEventListener("popup-updated", handleRefresh);
    return () => window.removeEventListener("popup-updated", handleRefresh);
  }, []);

  const handleDelete = async (id: string) => {
    setLoading(true);
    const res = await deletePopup(id);
    if (res.success) {
      toast.success(res.message);
      await refreshPopups();
    } else toast.error(res.message);
    setLoading(false);
    setDeleteModalId(null);
  };

  return (
    <div className="w-full md:w-[70%] flex flex-col self-start gap-4">
      <h1 className="text-3xl p-4 text-defined-darkbrown font-bold">
        Popup Management
      </h1>

      <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow">
        <table className="w-full text-left border-collapse">
          <thead className="bg-defined-darkbrown text-white">
            <tr>
              <th className="px-6 py-3">Popup ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {popups.length > 0 ? (
              popups.map((popup) => (
                <tr
                  key={popup.popupId}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3">{popup.popupId}</td>
                  <td className="px-6 py-3">{popup.name}</td>
                  <td className="px-6 py-3">
                    <Image
                      src={popup.image.secure_url}
                      alt={popup.name}
                      width={60}
                      height={60}
                      className="rounded-md"
                    />
                  </td>
                  <td className="px-6 py-3 flex justify-center gap-3">
                    <button
                      onClick={() => setViewModal(popup)}
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                    >
                      <IoMdEye size={18} />
                    </button>
                    <button
                      onClick={() => setDeleteModalId(popup.popupId)}
                      className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 py-6">
                  No popups found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {deleteModalId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[90%] max-w-sm text-center space-y-4">
            <h2 className="text-lg font-semibold text-defined-darkbrown">
              Delete this popup?
            </h2>
            <p className="text-sm text-gray-500">
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setDeleteModalId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => handleDelete(deleteModalId)}
              >
                {loading ? <Spinner /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-md max-w-md w-[90%]">
            <button
              onClick={() => setViewModal(null)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <IoMdClose size={20} />
            </button>
            <h2 className="text-xl font-semibold text-center text-defined-darkbrown mb-4">
              {viewModal.name}
            </h2>
            <Image
              src={viewModal.image.secure_url}
              alt={viewModal.name}
              width={400}
              height={400}
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
}
