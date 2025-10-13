"use client";

import { motion } from "framer-motion";

export default function ToggleInput({
  status,
  changeStatus,
}: {
  status: boolean;
  changeStatus: () => void;
}) {
  return (
    <button
      className="w-7 h-3.5 rounded-4xl flex p-0.5"
      style={{
        justifyContent: "flex-" + (status ? "end" : "start"),
        background: status ? "#28156F" : "#F15A24",
      }}
      onClick={changeStatus}
    >
      <motion.div
        className="size-2.5 rounded-full bg-white"
        layout
        transition={{
          type: "spring",
          visualDuration: 0.2,
          bounce: 0.2,
        }}
      />
    </button>
  );
}
