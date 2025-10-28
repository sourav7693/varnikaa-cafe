"use client";
import { getAllPopups } from "@/actions/popup";
import { PopupDocument } from "@/models/Popup";
import { useState } from "react";
import toast from "react-hot-toast";
import PopupForm from "./PopupForm";
import PopupTable from "./PopupTable";

export default function PopupSection({ initialPopups }: { initialPopups: PopupDocument[] }) {
  const [popups, setPopups] = useState(initialPopups);

  const refreshPopups = async () => {
    const res = await getAllPopups();
    if (res.success) setPopups(res.data);
    else toast.error("Failed to refresh popups");
  };

  return (
    <>
      <PopupForm onSuccess={refreshPopups} />
      <PopupTable Popups={popups} refreshPopups={refreshPopups} />
    </>
  );
}
