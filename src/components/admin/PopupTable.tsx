"use client";

import { useState, useEffect } from "react";
import { deletePopup } from "@/actions/popup";
import toast from "react-hot-toast";
import Image from "next/image";
import { IoEye, IoTrash, IoClose } from "react-icons/io5";
import { PopupDocument } from "@/models/Popup";

export default function PopupTable({
  Popups,
  refreshPopups,
}: {
  Popups: PopupDocument[];
  refreshPopups: () => void;
}) {
  const [popups, setPopups] = useState<PopupDocument[]>(Popups);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setPopups(Popups ?? []);
  }, [Popups]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this popup?")) return;
    const res = await deletePopup(id);
    if (res.success) {
      toast.success(res.message);
      await refreshPopups();
    } else toast.error(res.message);
  };

  return (
    <div className="w-full md:w-[70%] bg-white p-6 rounded-xl shadow relative">
      <h2 className="text-xl font-semibold text-defined-green mb-4">
        Popup List
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-defined-green text-white">
            <tr>
              <th className="p-3 ">Popup ID</th>
              <th className="p-3 ">Name</th>
              <th className="p-3 ">Image</th>
              <th className="p-3 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {popups.length > 0 ? (
              popups.map((popup) => (
                <tr key={popup.popupId} className="hover:bg-gray-50">
                  <td className="p-3 ">{popup.popupId}</td>
                  <td className="p-3 ">{popup.name}</td>
                  <td className="p-3  text-center">
                    <Image
                      src={popup.image.secure_url}
                      alt={popup.name}
                      width={60}
                      height={60}
                      className="rounded cursor-pointer"
                      onClick={() => setSelectedImage(popup.image.secure_url)}
                    />
                  </td>
                  <td className="p-3  text-center">
                    <button
                      onClick={() => setSelectedImage(popup.image.secure_url)}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      <IoEye size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(popup.popupId)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <IoTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No popups found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🖼️ Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-white p-4 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
              onClick={() => setSelectedImage(null)}
            >
              <IoClose size={22} />
            </button>
            <Image
              src={selectedImage}
              alt="Popup Preview"
              width={500}
              height={400}
              className="rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
