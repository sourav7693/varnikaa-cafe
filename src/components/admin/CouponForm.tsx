"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { createCoupon } from "@/actions/coupon";

export default function CouponForm() {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    discount: "",
  });
  const [startDate, setStartDate] = useState(new Date());
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.code || !formData.discount || !expiryDate) {
      toast.error("Please fill all fields");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("code", formData.code);
    formDataToSend.append("discount", formData.discount);
    formDataToSend.append("startDate", startDate.toISOString());
    formDataToSend.append("expiryDate", expiryDate.toISOString());

    const res = await createCoupon(formDataToSend);
    if (res.success) {
      toast.success("Coupon created successfully");
      setFormData({ name: "", code: "", discount: "" });
      setExpiryDate(null);
    } else toast.error(res.message);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold text-defined-green mb-4">
        Add New Coupon
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Coupon Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border border-[#ccc] outline-none p-2 rounded"
        />

        <input
          type="text"
          placeholder="Coupon Code"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          className="w-full border border-[#ccc] outline-none p-2 rounded"
        />

        <input
          type="number"
          placeholder="Discount %"
          value={formData.discount}
          onChange={(e) =>
            setFormData({ ...formData, discount: e.target.value })
          }
          className="w-full border border-[#ccc] outline-none p-2 rounded"
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-defined-darkbrown">Start Date & Time</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => date && setStartDate(date)}
            showTimeSelect
            dateFormat="Pp"
            className="w-full border border-[#ccc] outline-none p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-defined-darkbrown">Expiry Date & Time</label>
          <DatePicker
            selected={expiryDate}
            onChange={(date) => date && setExpiryDate(date)}
            showTimeSelect
            dateFormat="Pp"
            className="w-full border border-[#ccc] outline-none p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-defined-green text-white py-2 rounded hover:bg-green-700 transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
