"use client";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { useCart } from "@/context/CartContext";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";

interface ItemCardProps {
  id: string;
  name: string;
  price: number;
  mrp: number;
  quantity: number;
  image: string;
  discount: number;
  category: string;
}

const ItemCard = ({ id, name, price, quantity, image, discount, mrp }: ItemCardProps) => {
  const { deleteItem, removeItem, addItem } = useCart();

  const handleDelete = () => {
    deleteItem(id);
  };

  return (
    <div className="w-full flex p-4 gap-4 shadow-defined-light rounded-xl bg-white hover:shadow-md transition-all duration-200">
      <Image
        src={image}
        alt={name}
        width={500}
        height={500}
        className="rounded-xl size-20 object-cover"
      />

      <div className="flex flex-col gap-2 md:gap-4 justify-center w-full">
        <div className="flex justify-between items-center">
          <span className="text-defined-darkbrown font-bold text-lg md:text-xl">
            {name}{" "}
            <span className="text-defined-green">
              (+{discount ? `${discount}% Discount` : ""})
            </span>
          </span>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600 transition-all duration-200"
          >
            <MdDelete className="text-xl md:text-2xl" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between md:items-center text-sm md:text-base gap-1">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-defined-brown font-semibold">
              Price: <span className={`${discount !==0 ? "line-through" : ""}`}>₹{mrp}</span> ₹{price}
            </span>
            <span className="text-defined-brown font-semibold">
              Quantity: {quantity}
            </span>
            <FaPlusCircle
              className="text-defined-green"
              onClick={() =>
                addItem({
                  id,
                  name,
                  price,
                  mrp,
                  discount: 0,
                  image,
                  quantity: 1,
                  category: "",
                })
              }
            />
            <FaMinusCircle
              onClick={() => removeItem(id)}
              className="text-defined-green"
            />
          </div>
          <span className="text-defined-brown font-semibold">
            Total: ₹{price} × {quantity} = ₹{price * quantity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
