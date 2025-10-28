"use client";
import { useRef, useState } from "react";
import { useActionState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { createCoupon } from "@/actions/coupon";

const CouponForm = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);

  // 🧠 Server Action
  async function addCoupon(prevState: unknown, formData: FormData) {
    const name = (formData.get("name") as string)?.trim();
    const code = (formData.get("code") as string)?.trim();
    const discount = Number(formData.get("discount"));
    const start = startDate?.toISOString();
    const expiry = expiryDate?.toISOString();

    if (!name || !code || !discount || !expiry) {
      toast.error("Please fill all fields");
      return null;
    }

    formData.append("startDate", start);
    formData.append("expiryDate", expiry);

    if (expiryDate && startDate >= expiryDate) {
      toast.error("Expirydate can't be lesser than Startdate");
      return null;
    }

    try {
      const result = await createCoupon(formData);
      if (!result) return null;
      if (!result.success) toast.error(result.message);
      if (result.success) {
        toast.success(result.message || "Coupon created successfully");
        formRef.current?.reset();
        setExpiryDate(null);
      }
      return result;
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
      return null;
    }
  }

  const [, formAction, isPending] = useActionState(addCoupon, null);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl text-center font-bold text-defined-green mb-4">
        Add New Coupon
      </h2>

      <form ref={formRef} action={formAction} className="space-y-3">
        {/* Coupon Name */}
        <input
          type="text"
          name="name"
          placeholder="Coupon Name"
          className="w-full border border-[#ccc] outline-none p-2 rounded"
        />

        {/* Coupon Code */}
        <input
          type="text"
          name="code"
          placeholder="Coupon Code"
          className="w-full border border-[#ccc] outline-none p-2 rounded"
        />

        {/* Discount % */}
        <input
          type="number"
          name="discount"
          placeholder="Discount %"
          min={1}
          className="w-full border border-[#ccc] outline-none p-2 rounded"
        />

        {/* Start Date */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-defined-darkbrown">
            Start Date & Time
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => date && setStartDate(date)}
            showTimeSelect
            dateFormat="Pp"
            className="w-full border border-[#ccc] outline-none p-2 rounded"
          />
        </div>

        {/* Expiry Date */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-defined-darkbrown">
            Expiry Date & Time
          </label>
          <DatePicker
            selected={expiryDate}
            onChange={(date) => date && setExpiryDate(date)}
            showTimeSelect
            dateFormat="Pp"
            className="w-full border border-[#ccc] outline-none p-2 rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className={`w-full text-white py-2 rounded transition-all ${
            isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-defined-green hover:bg-green-700"
          }`}
        >
          {isPending ? "Creating..." : "Create Coupon"}
        </button>
      </form>
    </div>
  );
};

export default CouponForm;
