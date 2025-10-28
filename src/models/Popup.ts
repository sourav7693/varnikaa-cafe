import mongoose, { Model, Schema, models } from "mongoose";

export interface PopupDocument extends mongoose.Document {
  popupId: string;
  name: string;
  image: {
    public_id: string;
    secure_url: string;
  };
}

const PopupSchema = new Schema<PopupDocument>(
  {
    popupId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: Object, required: true },
  },
  { timestamps: true }
);

const Popup : Model<PopupDocument> = models?.Popup || mongoose.model<PopupDocument>("Popup", PopupSchema);

export default Popup;

export type PopupResponse = {
  success: boolean;
  data: PopupDocument[];
  pagination: {
    totalCount: number;
    currentPage: number;
    limit: number;
    totalPages: number;
  };
};