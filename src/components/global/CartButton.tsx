"use client"
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";

export default function WhatsAppButton() {
  const { getTotalItems } = useCart();
    const itemCount = getTotalItems();

  return (
    <Link className="fixed bottom-14 right-8 z-[1100]" href="/checkout">
      <div className="relative flex items-center justify-center bg-defined-green text-white w-[3rem] h-[3rem] rounded-full shadow-lg">
        <FaCartArrowDown size={25} />

        <span className="absolute -top-1 -right-1 bg-white text-defined-green font-bold text-[12px] rounded-full w-5 h-5 flex items-center justify-center shadow-md">
          {itemCount}
        </span>
      </div>
    </Link>
  );
}
