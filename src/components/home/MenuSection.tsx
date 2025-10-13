"use client";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

const MenuSection = () => {
  const categories = [
    {
      name: "Breakfast",
      items: [
        {
          id: 1,
          name: "Poha Recipe",
          price: 50,
          discount: 20,
          image: "/images/m1.png",
        },
        {
          id: 2,
          name: "Aloo Paratha",
          price: 60,
          discount: 15,
          image: "/images/m2.png",
        },
        {
          id: 3,
          name: "2 Paratha with Sabji Combo",
          price: 70,
          discount: 10,
          image: "/images/m3.png",
        },
        {
          id: 4,
          name: "Veg Grill Sandwich",
          price: 50,
          discount: 5,
          image: "/images/m4.png",
        },
      ],
    },
    {
      name: "Starters",
      items: [
        {
          id: 5,
          name: "Cheese Balls",
          price: 100,
          discount: 20,
          image: "/images/m1.png",
        },
        {
          id: 6,
          name: "Crispy Chaat",
          price: 40,
          discount: 15,
          image: "/images/m2.png",
        },
        {
          id: 7,
          name: "Momo",
          price: 50,
          discount: 10,
          image: "/images/m3.png",
        },
        {
          id: 8,
          name: "Pav Bhaji",
          price: 60,
          discount: 5,
          image: "/images/m4.png",
        },
      ],
    },
    {
      name: "Rice",
      items: [
        {
          id: 9,
          name: "Steam Rice",
          price: 75,
          discount: 20,
          image: "/images/m1.png",
        },
        {
          id: 10,
          name: "Veg Pulao",
          price: 100,
          discount: 15,
          image: "/images/m2.png",
        },
        {
          id: 11,
          name: "Curd Fried Rice",
          price: 90,
          discount: 10,
          image: "/images/m3.png",
        },
        {
          id: 12,
          name: "Lemon Rice",
          price: 80,
          discount: 5,
          image: "/images/m4.png",
        },
      ],
    },
    {
      name: "Dal",
      items: [
        {
          id: 13,
          name: "Plain Dal",
          price: 70,
          discount: 20,
          image: "/images/m1.png",
        },
        {
          id: 14,
          name: "Dal Tadka",
          price: 100,
          discount: 15,
          image: "/images/m2.png",
        },
        {
          id: 15,
          name: "Dal Fry",
          price: 100,
          discount: 10,
          image: "/images/m3.png",
        },
        {
          id: 16,
          name: "Dal Makhani",
          price: 180,
          discount: 5,
          image: "/images/m4.png",
        },
      ],
    },    
  ];

   const [activeCategory, setActiveCategory] = useState("Breakfast");

   const { cartItems, addItem, removeItem } = useCart();

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <span>Our Menus</span>
      <h1 className="text-defined-darkbrown text-xl md:text-4xl font-bold">
        Our Most Popular{" "}
        <span className="text-defined-green">Delicious Foods</span>
      </h1>
      <div
  className="flex overflow-x-auto whitespace-nowrap gap-3 mt-6 px-4 py-2 scrollbar-hide sm:justify-center"
>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
       {categories.find((c) => c.name === activeCategory)?.items.map((item) => {
      const cartItem = cartItems.find((c) => c.id === item.id);
      const quantity = cartItem ? cartItem.quantity : 0;

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
              {item.price} | {item.discount}%Off
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
          <Link href="/checkout" className="flex items-center justify-center rounded-2xl px-4 py-2 bg-[#D9FFD3] hover:bg-defined-green text-defined-darkbrown hover:text-white transition-colors duration-200">
            Order Now!
          </Link>
        </div>
      );
    })}     
      </div>
    </section>
  );
};

export default MenuSection;
