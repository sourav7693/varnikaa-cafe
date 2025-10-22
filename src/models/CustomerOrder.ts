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
  paymentStatus: PaymentStatus; // razorpay_payment_status
  status: OrderStatus;
}

const customerOrderSchema = new Schema<CustomerOrderDocument>({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  customerName: {
    type: String,
    required: true,
  },  
  customerPhone: {
    type: String,
    required: true,
  },
  orderValue: {
    type: Number,
    required: true,
  },
  customerAddress: {
    type: String,
    required: true,
  },
  customerLandMark: {
    type: String,
    required: true,
  },
  customerPinCode: {
    type: String,
    required: true,
  },
  razorPayPaymentId: {
    type: String,
    required: true,
  },
  razorPayOrderId: {
    type: String,
    required: true,
  },
  razorPaySignature: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: {
      values: ["Paid", "Unpaid"],
      message: "Invalid payment status value",
    },
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["Pending", "Delivered", "Confirmed"],
      message: "Invalid order status value",
    },
  },
}, {
  timestamps: true
});

const CustomerOrder: Model<CustomerOrderDocument> =
  mongoose.models.CustomerOrder ||
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