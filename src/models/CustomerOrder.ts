import mongoose, { Schema, Document, Model } from "mongoose";

export enum PaymentStatus {
  PAID = "Paid",
  UNPAID = "Unpaid",
}

export enum OrderStatus {
  PENDING = "Pending",
  DELIVERED = "Delivered",
  CONFIRMED = "Confirmed",
}

// Define the structure of individual items in the order
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  discount?: number;
  image?: string;
  quantity?: number;
  category?: string;
}

export interface CustomerOrderDocument extends Document {
  orderId: string;
  customerName: string;
  customerPhone: string;
  orderValue: number;
  customerAddress: string;
  customerLandMark: string;
  customerPinCode: string;
  razorPayPaymentId: string;
  razorPayOrderId: string;
  razorPaySignature: string;
  paymentMethod: string;
  createdAt: Date;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  items: OrderItem[];
}

// Schema for items inside the order
const orderItemSchema = new Schema<OrderItem>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    image: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    category: { type: String, required: true },
  },
  { _id: false } // no separate _id for subdocs
);

// Main CustomerOrder schema
const customerOrderSchema = new Schema<CustomerOrderDocument>(
  {
    orderId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    orderValue: { type: Number, required: true },
    customerAddress: { type: String, required: true },
    customerLandMark: { type: String, required: true },
    customerPinCode: { type: String, required: true },
    razorPayPaymentId: { type: String, required: true },
    razorPayOrderId: { type: String, required: true },
    razorPaySignature: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    paymentStatus: {
      type: String,
      required: true,
      enum: {
        values: Object.values(PaymentStatus),
        message: "Invalid payment status value",
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: Object.values(OrderStatus),
        message: "Invalid order status value",
      },
    },
    items: {
      type: [orderItemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const CustomerOrder: Model<CustomerOrderDocument> =
  mongoose.models?.CustomerOrder ||
  mongoose.model<CustomerOrderDocument>("CustomerOrder", customerOrderSchema);

export default CustomerOrder;

export type CustomerOrderResponse = {
  success: boolean;
  data: CustomerOrderDocument[];
  pagination: {
    totalCount: number;
    currentPage: number;
    limit: number;
    totalPages: number;
  };
};
