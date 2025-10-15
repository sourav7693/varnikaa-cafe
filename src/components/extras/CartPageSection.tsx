"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ItemCard from "@/components/ui/ItemCard";
import { useCart } from "@/context/CartContext";
import { createOrder, verifyPayment } from "@/actions/razorpay";
import toast from "react-hot-toast";

// --- Razorpay Type Definitions ---

interface RazorpayWindow extends Window {
  Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, callback: () => void) => void;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    contact?: string;
    email?: string;
  };
  notes?: Record<string, string>;
  theme?: { color?: string };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// --- Utility: Load Razorpay SDK ---
async function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as unknown as RazorpayWindow).Razorpay) return resolve();
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
    document.body.appendChild(script);
  });
}

// --- Component ---
const CartPageSection = () => {
  const { cartItems } = useCart();
  const router = useRouter();
  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.mobile || !formData.address) {
      toast.error("Please fill all details");
      return;
    }

    try {
      await loadRazorpayScript();

      const res = await createOrder(total, "INR");
      if (!res.success || !res.order || !res.key) {
        toast.error(res.message || "Failed to create Razorpay order");
        return;
      }

      const { order, key } = res;

      const options: RazorpayOptions = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Varnikaa Cafe",
        description: "Order Payment",
        order_id: order.id,
        handler: async (response: RazorpayResponse) => {
          const verifyRes = await verifyPayment(response);

          if (verifyRes.success) {
            toast.success("Payment successful & verified!");
            router.push(
              `/payment-success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}`
            );
          } else {
            toast.error(verifyRes.message || "Payment verification failed!");
          }
        },
        prefill: {
          name: formData.name,
          contact: formData.mobile,
        },
        notes: {
          address: formData.address,
        },
        theme: { color: "#0D9488" },
      };

      const razorpay = new (window as unknown as RazorpayWindow).Razorpay(
        options
      );
      razorpay.open();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again!");
    }
  };

  return (
    <div className="flex md:flex-row flex-col justify-between items-center gap-8">
      {/* Cart Items */}
      <div className="flex flex-col gap-4 w-full md:w-[60%] self-start">
        {cartItems.length === 0 ? (
          <p className="text-defined-brown">No items in your cart yet.</p>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            {cartItems.map((item) => (
              <ItemCard key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="flex flex-col gap-4 w-full md:w-[40%] self-start">
        <div className="p-4 flex flex-col gap-4 shadow-defined-light">
          <h1 className="text-defined-darkbrown text-2xl font-semibold">
            Order Summary
          </h1>
          <p className="text-defined-brown font-semibold">
            SubTotal:{" "}
            <span className="text-defined-darkbrown font-semibold">₹200</span>
          </p>
          <p className="text-defined-brown font-semibold">
            Gross Total:{" "}
            <span className="text-defined-darkbrown font-semibold">
              ₹{total}
            </span>
          </p>
        </div>

        <div className="p-4 flex flex-col gap-4 shadow-defined-light">
          <h1 className="text-defined-darkbrown text-2xl font-semibold">
            Place Your Order
          </h1>

          <form onSubmit={handlePayment} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-2 placeholder:text-defined-brown outline-none border border-[#ccc] rounded-lg"
            />
            <input
              type="number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Your Phone Number"
              className="w-full p-2 placeholder:text-defined-brown outline-none border border-[#ccc] rounded-lg"
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Your Address"
              className="w-full p-2 placeholder:text-defined-brown outline-none border border-[#ccc] rounded-lg"
            />

            <button
              type="submit"
              className="bg-defined-green text-white px-6 py-2 rounded-lg"
            >
              Payment & Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartPageSection;
