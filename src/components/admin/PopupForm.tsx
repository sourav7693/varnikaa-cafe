"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { createPopup } from "@/actions/popup";

export default function PopupForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setLoading(true);
    const res = await createPopup(formData);
    setLoading(false);

    if (res.success) {
      toast.success(res.message);
      e.currentTarget.reset();
      onSuccess(); // 🔄 Live refresh
    } else toast.error(res.message);
  }

  return (
    <div className="w-full md:w-[30%] bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-defined-green mb-4">
        Create New Popup
      </h2>

      <form
        id="popupForm"
        onSubmit={handleCreate}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="name"
          placeholder="Popup Name"
          required
          className="w-full border border-gray-300 p-2 rounded outline-none"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          required
          className="w-full border border-gray-300 p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-defined-green text-white rounded hover:bg-green-700 transition"
        >
          {loading ? "Uploading..." : "Upload Popup"}
        </button>
      </form>
    </div>
  );
}
