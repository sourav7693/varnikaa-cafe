"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ItemCard from "@/components/ui/ItemCard";
import { useCart } from "@/context/CartContext";
import { createOrder, verifyPayment } from "@/actions/customerOrder";
import toast from "react-hot-toast";
import { validateCoupon } from "@/actions/coupon";

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
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const total = Math.max(subtotal - (subtotal * discount) / 100, 0);

  // 🧠 Handle Coupon Apply
  const handleApplyCoupon = async () => {
    setError("");

    if (subtotal === 0) {
      setError("Add some items to your cart first!");
      return;
    }

    if (!couponCode.trim()) {
      setError("Please enter a coupon code");
      return;
    }

    setLoading(true);
    try {
      const res = await validateCoupon(couponCode);
      if (!res.success) {
        setDiscount(0);
        setError(res.message);
        toast.error(res.message);
      } else {
        setDiscount(Number(res.discount));
        toast.success(`${res.discount}% discount applied!`);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    landmark: "",
    pincode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.mobile ||
      !formData.address ||
      !formData.landmark ||
      !formData.pincode
    ) {
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
          const formDataToSend = new FormData();
          formDataToSend.append("customerName", formData.name);
          formDataToSend.append("customerPhone", formData.mobile);
          formDataToSend.append("customerAddress", formData.address);
          formDataToSend.append("customerLandMark", formData.landmark);
          formDataToSend.append("customerPinCode", formData.pincode);
          formDataToSend.append("orderValue", String(total));
          formDataToSend.append("couponCode", couponCode);
          formDataToSend.append("couponDiscount", String(discount));
           const itemsToSend = cartItems.map((item) => ({
             id: item.id,
             name: item.name,
             price: item.price,
             discount: item.discount || 0,
             image: item.image,
             quantity: item.quantity,     
             category: item.category         
           }));
           formDataToSend.append("items", JSON.stringify(itemsToSend));                   

          const verifyRes = await verifyPayment({ formData: formDataToSend, params: response });

          if (verifyRes.success) {            
            toast.success("Payment successful & verified!");
            router.push(
              `/payment-success?payment_id=${
                response.razorpay_payment_id
              }&order_id=${verifyRes.orderId?.split("#")[1]}`
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
        {/* 🏷 Coupon Section */}
        <div className="p-4 flex flex-col gap-3 shadow-defined-light">
          <h1 className="text-defined-darkbrown text-2xl font-semibold">
            Coupon Code
          </h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full border border-[#ccc] p-2 rounded-lg outline-none placeholder:text-defined-brown"
            />
            <button
              onClick={handleApplyCoupon}
              disabled={loading}
              className="bg-defined-green text-white px-4 py-2 rounded-lg"
            >
              {loading ? "Checking..." : "Apply"}
            </button>
          </div>
          {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
          {discount > 0 && (
            <p className="text-green-600 text-sm font-semibold">
              {discount}% Discount Applied!
            </p>
          )}
        </div>
        <div className="p-4 flex flex-col gap-4 shadow-defined-light">
          <h1 className="text-defined-darkbrown text-2xl font-semibold">
            Order Summary
          </h1>
          <p className="text-defined-brown font-semibold">
            SubTotal:{" "}
            <span className="text-defined-darkbrown font-semibold">
              {" "}
              ₹{total}
            </span>
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
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="Your Landmark"
              className="w-full p-2 placeholder:text-defined-brown outline-none border border-[#ccc] rounded-lg"
            />
            <input
              type="number"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Your Pincode"
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
