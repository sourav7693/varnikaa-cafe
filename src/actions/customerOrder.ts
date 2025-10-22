"use server";
import Razorpay from "razorpay";
import crypto from "crypto";
import CustomerOrder, { CustomerOrderDocument, OrderStatus, PaymentStatus } from "@/models/CustomerOrder";
import { generateCustomId } from "@/helper/generateCustomId"; 
import { revalidatePath } from "next/cache";
import { connectDb } from "@/lib/connection";

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

interface RazorpayPayment {
  method: string;
  [key: string]: unknown; // allow any extra fields Razorpay returns
}

export interface CreateOrderResponse {
  success: boolean;
  order?: RazorpayOrder;
  key?: string;
  message?: string;
}

export interface VerifyPaymentParams {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  orderId: string | null;
  message?: string;
}

// ----------- RAZORPAY ORDER CREATION -----------
export async function createOrder(amount: number, currency = "INR") : Promise<CreateOrderResponse>{
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

// ----------- PAYMENT VERIFICATION -----------
export async function verifyPayment({
  formData,
  params,
}: {
  formData: FormData;
  params: VerifyPaymentParams;
}): Promise<VerifyPaymentResponse> {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = params;

  try {
    //  Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return {
        success: false,
        orderId: null,
        message: "Invalid payment signature",
      };
    }

    // Fetch payment info from Razorpay
    const payment = (await razor.payments.fetch(
      razorpay_payment_id
    )) as unknown as RazorpayPayment;

    const paymentMethod = payment.method || "unknown"; // fallback if missing

    // Extract customer data
    const customerData = {
      customerName: formData.get("customerName") as string,
      customerPhone: formData.get("customerPhone") as string,
      customerAddress: formData.get("customerAddress") as string,
      customerLandMark: formData.get("customerLandMark") as string,
      customerPinCode: formData.get("customerPinCode") as string,
      orderValue: Number(formData.get("orderValue")),
    };

    // ✅ Parse items array (stringified JSON in formData)
    let items = [];
    const rawItems = formData.get("items");
    if (rawItems) {
      try {
        items = JSON.parse(rawItems as string);
      } catch {
        console.warn("Failed to parse items JSON, skipping items field");
      }
    }

    await connectDb();

    const orderId = await generateCustomId(CustomerOrder, "orderId", "#VC-");

    await CustomerOrder.create({
      orderId,
      ...customerData,
      items,
      razorPayOrderId: razorpay_order_id,
      razorPayPaymentId: razorpay_payment_id,
      razorPaySignature: razorpay_signature,
      paymentMethod,
      paymentStatus: PaymentStatus.PAID,
      status: OrderStatus.PENDING,
    });

    revalidatePath("/admin-customer-order-management");

    return {
      success: true,
      orderId,
      message: "Payment verified and order saved",
    };
  } catch (err: unknown) {
    console.error("verifyPayment error:", err);
    return {
      success: false,
      orderId: null,
      message:
        err instanceof Error
          ? err.message
          : "Unexpected error during payment verification",
    };
  }
}


export async function getAllCustomerOrder(
  page: number | string = 1,
  limit: number | string = 10,
  sort: string = "createdAt",
  order: "asc" | "desc" = "desc",
  status?: boolean,
  search?: string
) {
  try {
    const filter : Record<string, unknown> = {};

    if (status !== undefined) filter.status = status;

    if (search) {
      filter.$or = [
        { customerName: { $regex: search, $options: "i" } },
        { customerPhone: { $regex: search, $options: "i" } },
      ];
    }

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * pageSize;

    const sortOrder = order === "asc" ? 1 : -1;
    const sortQuery: Record<string, 1 | -1> = { [sort]: sortOrder };

    await connectDb();

    const allCustomerOrder = await CustomerOrder.find(filter)
      .sort(sortQuery)
      .skip(skip)
      .limit(pageSize)
      .lean<CustomerOrderDocument[]>();

    const totalCustomerOrder = await CustomerOrder.countDocuments(filter);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(allCustomerOrder)),
      pagination: {
        totalCount: totalCustomerOrder,
        currentPage: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(totalCustomerOrder / pageSize),
      },
    };
  } catch (error) {
    console.error("getAllCustomerOrder error:", error);
    return {
      success: false,
      data: [],
      pagination: { totalCount: 0, currentPage: 1, limit: 10, totalPages: 0 },
    };
  }
}

export async function updateCustomerOrder(
  orderId: string,
  updateData: Partial<
    Omit<CustomerOrderDocument, "_id" | "createdAt" | "updatedAt"> & {      
      status?: OrderStatus;
    }
  >
) {
  try {
    await connectDb();

    const order = await CustomerOrder.findOneAndUpdate(
      { orderId },
      { $set: updateData },
      { new: true }
    );

    if (!order) return { success: false, message: "Order not found" };

    revalidatePath("/admin-customer-order-management");

    return { success: true, order: JSON.parse(JSON.stringify(order)) };
  } catch (err: unknown) {
    console.error("updateCustomerOrder error:", err instanceof Error ? err.message : err);
    return { success: false, message: "Failed to update order" };
  }
}

export async function deleteExistingCustomerOrder(orderId: string) {
  try {
    await connectDb();
    const deleted = await CustomerOrder.findOneAndDelete({ orderId });

    if (!deleted) return { success: false, message: "Order not found" };

    revalidatePath("/admin-customer-order-management");

    return { success: true, message: "Order deleted successfully" };
  } catch (err: unknown) {
    console.error("deleteExistingCustomerOrder error:", err instanceof Error ? err.message : err);
    return { success: false, message: "Failed to delete order" };
  }
}