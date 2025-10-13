"use client";
import ItemCard from "@/components/ui/ItemCard";
import { useCart } from "@/context/CartContext";

const CartPageSection = () => {
  const { cartItems } = useCart();
  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return (
    <div className="flex md:flex-row flex-col justify-between items-center gap-8">
      {/* Item Lists */}
      <div className="flex flex-col gap-4 w-full md:w-[60%] self-start">
        {cartItems.length === 0 ? (
          <p className="text-defined-brown">No items in your cart yet.</p>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            {cartItems.map((item) => (
              <ItemCard key={item.id} {...item} />
            ))}
          </div>
        )}
        
      </div>
      <div className="flex flex-col gap-4 w-full md:w-[40%] self-start">
        <div className="p-4 flex flex-col gap-4 shadow-defined-light">
          <h1 className="text-defined-darkbrown text-2xl font-semibold">
            Order Summary
          </h1>
          <p className="text-defined-brown font-semibold">
            Delivery Charge:{" "}
            <span className="text-defined-darkbrown font-semibold">₹200</span>{" "}
          </p>
          <p className="text-defined-brown font-semibold">Tax: </p>
          <p className="text-defined-brown font-semibold">
            Gross Total:{" "}
            <span className="text-defined-darkbrown font-semibold">₹{total}</span>{" "}
          </p>
        </div>
        <div className="p-4 flex flex-col gap-4 shadow-defined-light">
          <h1 className="text-defined-darkbrown text-2xl font-semibold">
            Place Your Order
          </h1>
          <form action="" className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-2 placeholder:text-defined-brown outline-none border  border-[#ccc] rounded-lg"
            />
            <input
              type="number"
              name="mobile"
              placeholder="Your Phone Number"
              className="w-full p-2 placeholder:text-defined-brown outline-none border  border-[#ccc] rounded-lg"
            />
            <input
              type="text"
              name="address"
              placeholder="Your Address"
              className="w-full p-2 placeholder:text-defined-brown outline-none border  border-[#ccc] rounded-lg"
            />
            <button
              type="submit"
              className="bg-defined-green text-white px-6 py-2 rounded-lg"
            >
              Payment & Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartPageSection;
