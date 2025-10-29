"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { CartItem, useCart } from "@/context/CartContext";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { ItemStatus, MenuItemDocument } from "@/models/MenuItem";

export default function MenuItems({
  allCategories,
  activeCategory,
}: {
  allCategories: { name: string; items: MenuItemDocument[] }[];
  activeCategory: string;
}) {
  const { cartItems, addItem, removeItem } = useCart();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  const filteredItems = useMemo(() => {
    if (!searchTerm) return null;
    return allCategories.flatMap((cat) =>
      cat.items.filter((item) =>
        item.itemName.toLowerCase().includes(searchTerm)
      )
    );
  }, [searchTerm, allCategories]);

  const displayedItems =
    searchTerm && filteredItems?.length
      ? filteredItems
      : allCategories.find((c) => c.name === activeCategory)?.items || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
      {displayedItems.length > 0 ? (
        displayedItems.map((item: MenuItemDocument) => {
          const cartItem = cartItems.find(
            (c: CartItem) => c.id === item.itemId
          );
          const quantity = cartItem ? cartItem.quantity : "ADD";

          if (item.status !== ItemStatus.ACTIVE) return null;

          return (
            <div
              key={item.itemId}
              className="w-full p-4 flex flex-col justify-between gap-4 shadow-defined-light rounded-xl hover:scale-105 transition-all duration-300"
            >
              <Image
                src={item.itemImage?.secure_url || "/placeholder.jpg"}
                alt={item.itemName}
                width={200}
                height={200}
                className="rounded-xl w-full h-full object-cover"
              />

              <h1 className="font-bold text-defined-darkbrown text-xl">
                {item.itemName}
              </h1>

              <div className="flex justify-between items-center">
                <span>
                  <span className="font-bold text-defined-green">
                    ₹{item.itemMRP}
                  </span>{" "}
                  | {item.itemDiscount}% Off
                </span>

                <div className="rounded-xl border border-[#ccc] flex justify-between items-center gap-4 px-4">
                  {quantity !== "ADD" && (
                    <FaMinusCircle
                      size={13}
                      onClick={() => removeItem(item.itemId)}
                      className="text-defined-green cursor-pointer"
                    />
                  )}
                  <span>{quantity}</span>
                  <FaPlusCircle
                    size={13}
                    onClick={() =>
                      addItem({
                        id: item.itemId,
                        name: item.itemName,
                        mrp: item.itemMRP,
                        price: item.itemPrice,
                        discount: item.itemDiscount,
                        image: item.itemImage?.secure_url,
                        quantity: 1,
                        category: item.categoryName,
                      })
                    }
                    className="text-defined-green cursor-pointer"
                  />
                </div>
              </div>

              <Link
                href={`${quantity !== "ADD" ? "/checkout" : "/"}`}
                className="flex items-center justify-center rounded-2xl px-4 py-2 bg-[#D9FFD3] hover:bg-defined-green text-defined-darkbrown hover:text-white transition-colors duration-200"
              >
                Order Now!
              </Link>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 text-center w-full col-span-full py-8">
          No items found.
        </p>
      )}
    </div>
  );
}
