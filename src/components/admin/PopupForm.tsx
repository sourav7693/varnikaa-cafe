"use client";
import { createPopup } from "@/actions/popup";
import { useActionState, useState } from "react";
import toast from "react-hot-toast";

export default function PopupForm() {
  const [file, setFile] = useState<File | null>(null);

  async function addItem(prevState: unknown, formData: FormData) {
    const name = (formData.get("name") as string)?.trim();
    const image = formData.get("image") as File;

    if (!name || !image) {
      toast.error("All fields are required");
      return null;
    }

    try {
      const res = await createPopup(formData);
      if (res.success) {
        toast.success(res.message);
        setFile(null);
        // tell PopupTable to refresh instantly
        window.dispatchEvent(new Event("popup-updated"));
      } else toast.error(res.message);
      return res;
    } catch (err) {
      toast.error("Something went wrong");
      return null;
    }
  }

  const [, formActions, isPending] = useActionState(addItem, null);

  return (
    <form action={formActions} className="flex flex-col gap-4">
      <input
        type="text"
        name="name"
        placeholder="Popup Name"
        className="w-full p-2 border border-[#ccc] rounded-md outline-none"
      />
      <div className="relative w-full p-6 border border-[#ccc] rounded-md truncate">
        <label
          htmlFor="file-input"
          className="absolute capitalize top-1/2 left-2 transform -translate-y-1/2 text-defined-brown cursor-pointer truncate"
        >
          {file ? file.name : "Choose Picture"}
        </label>
        <input
          id="file-input"
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setFile(e.target?.files?.[0] ?? null)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer truncate"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-defined-darkbrown text-white p-2 rounded-md"
      >
        {isPending ? "Adding..." : "Add Popup"}
      </button>
    </form>
  );
}
