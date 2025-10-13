"use client";
import useElementHeight from "@/hooks/useElementHeight";
import Image from "next/image";
import { useState, useEffect } from "react";

const BookingSection = () => {
  const [rightSideHeight, leftSideRef] = useElementHeight<HTMLDivElement>();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="md:px-16 px-0 flex flex-col md:flex-row justify-between items-center gap-6">
      <div
        className="w-full flex flex-col gap-6 bg-gray-200 px-4 py-8 md:p-12 shadow-defined-light rounded-xl"
        ref={leftSideRef}
      >
        <div className="w-full flex justify-center flex-col items-center gap-2">
          <Image
            src="/images/leaf.png"
            alt="leaf"
            width={500}
            height={500}
            className="object-cover size-10"
          />
          <p className="text-defined-green font-medium text-center">
            Table Booking
          </p>
        </div>
        <h1 className="text-2xl md:text-4xl font-semibold text-defined-darkbrown text-center">
          Book Your Table Now!
        </h1>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4 items-center justify-center"
        >
          <div className="flex flex-col gap-4 md:flex-row w-full">
            <input
              type="text"
              name="person"
              placeholder="Person"
              className="w-full bg-white p-2 placeholder:text-defined-brown outline-none border  border-[#ccc] rounded-lg"
            />
            <input
              type="number"
              name="mobile"
              placeholder="Mobile"
              className="w-full bg-white p-2 placeholder:text-defined-brown outline-none border  border-[#ccc] rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-4 md:flex-row w-full">
            <input
              type="text"
              name="person"
              placeholder="Date"
              className="w-full bg-white p-2 placeholder:text-defined-brown outline-none border  border-[#ccc] rounded-lg"
            />
            <input
              type="number"
              name="mobile"
              placeholder="Time"
              className="w-full bg-white p-2 placeholder:text-defined-brown outline-none border  border-[#ccc] rounded-lg"
            />
          </div>
          <textarea
            name="message"
            id=""
            cols={30}
            rows={5}
            placeholder="Message"
            className="p-4 w-full bg-white placeholder:text-defined-brown outline-none border  border-[#ccc] rounded-lg"
          ></textarea>
          <button
            type="submit"
            className="bg-defined-green text-white px-6 py-2 rounded-lg"
          >
            Confirm Table
          </button>
        </form>
      </div>
      <div
        className="w-full flex flex-col gap-6 bg-gray-200 px-4 py-8 md:p-12 shadow-defined-light rounded-xl"
        style={{ height: isSmallScreen ? "auto" : `${rightSideHeight}px` }}
      >
        <div className="w-full flex justify-center flex-col items-center gap-2">
          <Image
            src="/images/leaf.png"
            alt="leaf"
            width={500}
            height={500}
            className="object-cover size-10"
          />
          <p className="text-defined-green font-medium text-center">
            Opening Time
          </p>
        </div>
        <h1 className="text-2xl md:text-4xl font-semibold text-defined-darkbrown text-center">
          Opening Time
        </h1>
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="flex flex-col md:flex-row gap-4 justify-between w-full">
            <div className="flex flex-col gap-2 bg-white justify-center items-center w-full border border-[#ccc] rounded-lg p-5">
              <h2 className="font-bold text-defined-green text-lg">
                Breakfast
              </h2>
              <p className="text-defined-brown text-center">
                7 Days 7.30am to 11.30pm
              </p>
            </div>
            <div className="flex flex-col gap-2 bg-white justify-center items-center w-full border border-[#ccc] rounded-lg p-5">
              <h2 className="font-bold text-defined-green text-lg">Lunch</h2>
              <p className="text-defined-brown text-center">
                7 Days 7.30am to 11.30pm
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-white justify-center items-center w-full border border-[#ccc] rounded-lg py-8">
            <h2 className="font-bold text-defined-green text-lg">Dinner</h2>
            <p className="text-defined-brown">7 Days 7.30am to 11.30pm</p>
          </div>
          <button className="bg-defined-green text-white px-6 py-2 rounded-lg">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSection;
