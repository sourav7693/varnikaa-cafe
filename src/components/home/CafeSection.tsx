"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DefinedHeader from "../ui/DefinedHeader";

const CafeSection = () => {
  const categories = [
    {
      name: "Tea/Coffee/Toast",
      items: [
        { name: "Ginger Tea", image : "/images/m1.png", id: 1,  price: 20 },
        { name: "Masala Tea",  image : "/images/m1.png", id: 2, price: 30 },
        { name: "Black Coffee", image : "/images/m1.png", id: 3,  price: 40 },
        { name: "Milk Coffee", image : "/images/m1.png", id: 4,  price: 40 },
      ],
    },
    {
      name: "Sandwiches",
      items: [
        { name: "Veg Grill Sandwich", image : "/images/m1.png", id: 5,  price: 50 },
        { name: "Veg Grill Cheese Sandwich", image : "/images/m1.png", id: 6,  price: 60 },
        { name: "Grill Paneer Sandwich", image : "/images/m1.png", id: 7,  price: 80 },
        { name: "Grill Paneer Cheese Sandwich", image : "/images/m1.png", id: 8,  price: 90 },
      ],
    },
    {
      name: "Chinese",
      items: [
        { name: "Veg Momo", image : "/images/m1.png", id: 9,  price: 50 },
        { name: "Chowmin", image : "/images/m1.png", id: 10,  price: 50 },
      ],
    },
    {
      name: "Noodles",
      items: [
        { name: "Plain Maggie", image : "/images/m1.png", id: 11,  price: 45 },
        { name: "Vegetable Masala Maggie", image : "/images/m1.png", id: 12,  price: 70 },
        { name: "Vegetable Cheese Maggie", image : "/images/m1.png", id: 13,  price: 80 },
      ],
    },
    {
      name: "Rolled Rolls",
      items: [
        { name: "Veg Roll", image : "/images/m1.png", id: 14,  price: 50 },
        { name: "Veg Cheese Roll", image : "/images/m1.png", id: 15,  price: 60},
        { name: "Veg Paneer Roll", image : "/images/m1.png", id: 16,  price: 80 },
        { name: "Veg Paneer Cheese Roll", image : "/images/m1.png", id: 17,  price: 90 },
      ],
    },
    {
      name: "Must Try",
      items: [
        { name: "Pav Bhaji", image : "/images/m1.png", id: 18,  price: 60 },
        { name: "Aloo Crispy Chaat", image : "/images/m1.png", id: 19,  price: 60 },
        { name: "Chips Small", image : "/images/m1.png", id: 20,  price: 60 },
        { name: "Chips Medium",  image : "/images/m1.png", id: 21, price: 70 },
        { name: "Chips Large", image : "/images/m1.png", id: 22,  price: 90 },
      ],
    },
    {
      name: "Refreshmeners",
      items: [
        { name: "Nimbu Paani", image : "/images/m1.png", id: 23,  price: 30 },
        { name: "Aam Panna", image : "/images/m1.png", id: 24,  price: 30 },
        { name: "Masala Coke", image : "/images/m1.png", id: 25,  price: 50 },
      ],
    },
    {
      name: "Burgers",
      items: [
        { name: "Veg Burger", image : "/images/m1.png", id: 26,  price: 60 },
        { name: "Cheese Burger", image : "/images/m1.png", id: 27,  price: 80 },
      ],
    },
  ];
   const [activeCategory, setActiveCategory] = useState("Tea/Coffee/Toast");
  
     const { cartItems, addItem, removeItem } = useCart();
  return (
    <section className="flex flex-col items-center justify-center gap-4 md:px-8 xl:px-16 w-full">
     <DefinedHeader title="Cafe Menu" />
      <h1 className="text-defined-darkbrown text-xl md:text-4xl font-bold">
        Varnikaa <span className="text-defined-green">Cafe Menu</span>
      </h1>
      <p className="text-center w-full md:w-[50%]">
        Introducing our tantalizing food menu, filled with exquisite flavors and
        culinary delights to satisfy every plate.
      </p>
      <div className="flex overflow-x-auto whitespace-nowrap gap-3 px-4 py-2 scrollbar-hide sm:justify-center">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-200 flex-shrink-0
          ${
            activeCategory === category.name
              ? "bg-defined-green text-white shadow-md"
              : "bg-green-100 text-defined-green hover:bg-green-200"
          }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Menu Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {categories
          .find((c) => c.name === activeCategory)
          ?.items.map((item) => {
            const cartItem = cartItems.find((c) => c.id === item.id);
            const quantity = cartItem ? cartItem.quantity : 1;

            return (
              <div
                key={item.id}
                className="w-full p-4 flex flex-col justify-between gap-4 shadow-defined-light rounded-xl hover:scale-105 transition-all duration-300"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="rounded-xl w-full h-40 object-cover"
                />
                <h1 className="font-bold text-defined-darkbrown text-xl">
                  {item.name}
                </h1>

                <div className="flex justify-between items-center">
                  <span>
                    <span className="font-bold text-defined-green">
                      {" "}
                      ₹{item.price}
                    </span>{" "}
                    {/* | {item.discount}% Off */}
                  </span>

                  <div className="rounded-xl border border-[#ccc] flex justify-between items-center gap-4 px-4">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="font-bold text-lg"
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() =>
                        addItem({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                          quantity: 1,
                        })
                      }
                      className="font-bold text-defined-green text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="flex items-center justify-center rounded-2xl px-4 py-2 bg-[#D9FFD3] hover:bg-defined-green text-defined-darkbrown hover:text-white transition-colors duration-200"
                >
                  Order Now!
                </Link>
              </div>
            );
          })}
      </div>
    </section>    
  );
};

export default CafeSection;
