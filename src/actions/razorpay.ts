"use server";

import Razorpay from "razorpay";
import crypto from "crypto";

const razor = new Razorpay({
  key_id: process.env.RAZORPAY_SECRET_ID!,
  key_secret: process.env.RAZORPAY_SECRET_KEY!,
});

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

export interface CreateOrderResponse {
  success: boolean;
  order?: RazorpayOrder;
  key?: string;
  message?: string;
}

export async function createOrder(
  amount: number,
  currency = "INR"
): Promise<CreateOrderResponse> {
  try {
    const order = (await razor.orders.create({
      amount: Math.round(amount * 100),
      currency,
      receipt: `rcpt_${Date.now()}`,
      payment_capture: true,
    })) as unknown as RazorpayOrder;

    
    return {
      success: true,
      order,
      key: process.env.RAZORPAY_SECRET_ID!,
    };
  } catch (err: unknown) {
    console.error("createOrder error:", err);
    return {
      success: false,
      message:
        err instanceof Error ? err.message : "Failed to create Razorpay order",
    };
  }
}

export interface VerifyPaymentParams {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message?: string;
}

export async function verifyPayment(
  params: VerifyPaymentParams
): Promise<VerifyPaymentResponse> {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = params;
  try {
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return { success: true };
    } else {
      return { success: false, message: "Invalid payment signature" };
    }
  } catch (err: unknown) {
    console.error("verifyPayment error:", err);
    return {
      success: false,
      message:
        err instanceof Error
          ? err.message
          : "Unexpected error during payment verification",
    };
  }
}


// res.status(200).json({
//       message: "Payment successful",
//       data: {
//         razorpayPaymentId: razorpay_payment_id,
//         razorpayOrderId: razorpay_order_id,
//         paymentStatus: "completed",
//         signature: razorpay_signature,
//         method: paymentMethod,
//         captured: true,
//       },
//     });