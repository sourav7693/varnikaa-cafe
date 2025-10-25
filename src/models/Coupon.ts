import mongoose, { Schema, Document, Model } from "mongoose";

export interface CouponDocument extends Document {
  couponId: string;
  name: string;
  code: string;
  startDate: Date;
  expiryDate: Date;
  discount: number;
  active: boolean;
}

const CouponSchema = new Schema<CouponDocument>(
  {
    couponId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    code: { type: String, required: true },
    startDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    discount: { type: Number, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Coupon : Model<CouponDocument> = mongoose.models?.Coupon ||
  mongoose.model<CouponDocument>("Coupon", CouponSchema);

export default Coupon

  export type CouponResponse = {
    success: boolean;
    data: CouponDocument[];
    pagination: {
      totalCount: number;
      currentPage: number;
      limit: number;
      totalPages: number;
    };
  };