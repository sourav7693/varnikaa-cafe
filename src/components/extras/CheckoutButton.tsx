"use client";

import { createOrder, verifyPayment } from "@/actions/razorpay";

async function loadRazorpayScript() {
  return new Promise<void>((resolve, reject) => {
    if ((window as any).Razorpay) return resolve();
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
    document.body.appendChild(script);
  });
}

export default function CheckoutButton({ amount }: { amount: number }) {
  async function handlePay() {
    try {
      await loadRazorpayScript();

      const orderRes = await createOrder(amount, "INR");
      if (!orderRes.success) throw new Error(orderRes.message);

      const { order } = orderRes;

      const options = {
        key: process.env.RAZORPAY_SECRET_ID, // this is fine client-side (public key)
        amount: order.amount,
        currency: order.currency,
        name: "Your Company",
        description: "Test Payment",
        order_id: order.id,
        handler: async function (response: any) {
          const verifyRes = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyRes.success) alert("✅ Payment Verified!");
          else alert("❌ Payment Failed!");
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  }

  return (
    <button
      onClick={handlePay}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
      Pay ₹{amount}
    </button>
  );
}
