"use client";
import { useState } from "react";
import MenuItems from "./MenuItems";
import { MenuItemDocument } from "@/models/MenuItem";

export default function MenuCategories({
  categories,
}: {
  categories: { name: string; items: MenuItemDocument[] }[];
}) {
  const [activeCategory, setActiveCategory] = useState(
    categories?.[0]?.name || ""
  );

  return (
    <>
      {/* Category Buttons */}
      <div className="w-full md:flex md:flex-wrap md:justify-center md:items-center overflow-x-auto md:overflow-x-visible scrollbar-hide scroll-smooth">
        <div className="flex gap-3 px-4 py-2 md:flex-wrap min-w-max md:min-w-0">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-200 flex-shrink-0 ${
                activeCategory === category.name
                  ? "bg-defined-green text-white shadow-md"
                  : "bg-green-100 text-defined-green hover:bg-green-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <MenuItems allCategories={categories} activeCategory={activeCategory} />
    </>
  );
}
