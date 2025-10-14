import Image from "next/image";

const BookingSection = () => {
  const menu = [
    {
      name: "Tea/Coffee/Toast",
      items: [
        { name: "Ginger Tea", price: "20" },
        { name: "Masala Tea", price: "30" },
        { name: "Black Coffee", price: "40" },
        { name: "Milk Coffee", price: "40" },
      ]
    },
    {
      name: "Sandwiches",
      items: [
        { name: "Veg Grill Sandwich", price: "50" },
        { name: "Veg Grill Cheese Sandwich", price: "60" },
        { name: "Grill Paneer Sandwich", price: "80" },
        { name: "Grill Paneer Cheese Sandwich", price: "90" },        
      ]
    },
    {
      name: "Chinese",
      items: [
        { name: "Veg Momo", price: "50" },
        { name: "Chowmin", price: "50" },        
      ]
    },
    {
      name: "Noodles",
      items: [
        { name: "Plain Maggie", price: "45" },
        { name: "Vegetable Masala Maggie", price: "70" },
        { name: "Vegetable Cheese Maggie", price: "80" },        
      ]
    },
    {
      name: "Rolled Rolls",
      items: [
        { name: "Veg Roll", price: "50" },
        { name: "Veg Cheese Roll", price: "60" },
        { name: "Veg Paneer Roll", price: "80" },
        { name: "Veg Paneer Cheese Roll", price: "90" },        
      ]
    },
    {
      name: "Must Try",
      items: [
        { name: "Pav Bhaji", price: "60" },
        { name: "Aloo Crispy Chaat", price: "60" },
        { name: "Chips Small", price: "60" },
        { name: "Chips Medium", price: "70" },
        { name: "Chips Large", price: "90" },        
      ]
    },
    {
      name: "Refreshmeners",
      items: [
        { name: "Nimbu Paani", price: "30" },
        { name: "Aam Panna", price: "30" },
        { name: "Masala Coke", price: "50" },        
      ]
    },
    {
      name: "Burgers",
      items: [
        { name: "Veg Burger", price: "60" },
        { name: "Cheese Burger", price: "80" },       
      ]
    },
  ]
  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <div className="w-full flex  flex-col items-center justify-center gap-2">
        <Image
          src="/images/leaf.png"
          alt="leaf"
          width={500}
          height={500}
          className="object-cover size-10"
        />
        <h1 className="text-defined-green text-3xl font-medium text-center">
          Varnikaa Cafe Menu
        </h1>
      </div>

      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-4">
          {menu.slice(0, 4).map((section, index) => (
            <div key={index} className="w-full md:px-8 px-4">
              <h2 className="text-xl font-semibold text-defined-darkbrown mb-4 text-center">
                {section.name}
              </h2>
              <ul className="flex flex-col gap-2">
                {section.items.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="font-semibold text-defined-green">
                      ₹{item.price}/-
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {menu.slice(4, 8).map((section, index) => (
            <div key={index} className="w-full md:px-8 px-4">
              <h2 className="text-xl font-semibold text-defined-darkbrown mb-4 text-center">
                {section.name}
              </h2>
              <ul className="flex flex-col gap-2">
                {section.items.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="font-semibold text-defined-green">
                      ₹{item.price}/-
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingSection;
