"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AppointmentModal from "../global/AppointmentModal";

const HomeSlider = () => {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const toggleAppointmentModal = () =>
    setIsAppointmentModalOpen(!isAppointmentModalOpen);
  return (
    <div className="relative w-full h-[300px] md:h-[500px]">
      {/* Background image */}
      <Image
        src="/images/slider.jpg"
        alt="slider"
        fill
        priority
        className="object-cover h-full w-full"
      />

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col justify-center  items-start sm:items-start px-4 sm:px-8 md:px-16 gap-3 sm:gap-4 text-wrap">
        <h1 className=" md:text-4xl lg:text-5xl font-bold  text-left leading-snug text-defined-darkbrown w-[50%] md:w-full">
          <span className="text-blue-600">Have a Delicious</span>{" "}
          <br className="hidden sm:block" />{" "}
          <span className="text-blue-600">Meal</span> With{" "}
          <br className="hidden sm:block" />{" "}
          <span className="text-defined-green">Varnikaa Cafe</span>
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
          <Link
            href="/menu"
            className="hover:scale-105 transition-all duration-300 bg-defined-green text-white py-2 px-5 rounded-md"
          >
            View Our Menu
          </Link>
          <button
            onClick={toggleAppointmentModal}
            className="text-defined-green border border-defined-green py-2 px-5 rounded-md"
          >
            Send Feedback
          </button>
        </div>
      </div>
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={toggleAppointmentModal}
      />
    </div>
  );
};

export default HomeSlider;
