"use client";

import { createMenuItem } from "@/actions/menuItem";
import { useActionState, useRef, useState } from "react";
import toast from "react-hot-toast";

const AddMenuItems = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handlePriceUpdate = () => {
    const form = formRef.current;
    if (!form) return;

    const mrp =
      Number(
        (form.querySelector("[name='itemMRP']") as HTMLInputElement)?.value
      ) || 0;
    const discount =
      Number(
        (form.querySelector("[name='itemDiscount']") as HTMLInputElement)?.value
      ) || 0;

    const priceInput = form.querySelector(
      "[name='itemPrice']"
    ) as HTMLInputElement;

    priceInput.value =
      discount > 0 ? (mrp - (mrp * discount) / 100).toFixed(0) : mrp.toFixed(0);
  };

  async function addItem(prevState: unknown, formData: FormData) {
    const categoryType = formData.get("categoryType") as string;
    const categoryName = (formData.get("categoryName") as string)?.trim();
    const itemName = (formData.get("itemName") as string)?.trim();
    const itemMRP = Number(formData.get("itemMRP"));
    Number(formData.get("itemDiscount"));
    const itemPrice = Number(formData.get("itemPrice"));
    const itemImage = formData.get("itemImage") as File;
    const itemDescription = (formData.get("itemDescription") as string)?.trim();

    if (
      !categoryType ||
      !categoryName ||
      !itemPrice ||
      !itemName ||
      !itemMRP ||
      !itemDescription
    ) {
      toast.error("All fields are required");
      return null;
    }

    if (!itemImage || itemImage.size === 0) {
      toast.error("Item Image is required");
      return null;
    }
    try {
      const uploadResult = await createMenuItem(formData);
      if (!uploadResult) return null;
      if (!uploadResult.success) toast.error(uploadResult.message);
      if (uploadResult.success) toast.success(uploadResult.message);
      return uploadResult;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      return null;
    }
  }

  const [, formActions, isPending] = useActionState(addItem, null);

  return (
    <form
      ref={formRef}
      action={formActions}
      className="flex flex-col gap-4"
      onChange={handlePriceUpdate}
    >
      <select
        name="categoryType"
        className="w-full p-2 border border-[#ccc] rounded-md outline-none text-defined-brown"
      >
        <option value="">Select Category Type</option>
        <option value="Cloud Kitchen Menu">Cloud Kitchen Menu</option>
        <option value="Cafe Menu">Cafe Menu</option>
      </select>

      <input
        type="text"
        name="categoryName"
        placeholder="Category Name"
        className="w-full p-2 border border-[#ccc] rounded-md outline-none"
      />
      <input
        type="text"
        name="itemName"
        placeholder="Item Name"
        className="w-full p-2 border border-[#ccc] rounded-md outline-none"
      />
      <input
        type="number"
        name="itemMRP"
        min={1}
        placeholder="Item MRP"
        className="w-full p-2 border border-[#ccc] rounded-md outline-none"
      />
      <input
        type="number"
        name="itemDiscount"
        min={0}
        placeholder="Item Discount (%)"
        className="w-full p-2 border border-[#ccc] rounded-md outline-none"
      />
      <input
        type="number"
        name="itemPrice"
        readOnly
        placeholder="Item Price (Auto-calculated)"
        className="w-full p-2 border border-[#ccc] rounded-md outline-none bg-gray-100"
      />
      <textarea
        name="itemDescription"
        placeholder="Description"
        rows={3}
        className="w-full placeholder:text-defined-brown p-2 border border-[#ccc] rounded-md outline-none"
      ></textarea>

      {/* File Upload */}
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
          name="itemImage"
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
        {isPending ? "Adding..." : "Add Item"}
      </button>
    </form>
  );
};

export default AddMenuItems;
