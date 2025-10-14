"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AppointmentModal from "../global/AppointmentModal";

const AboutSection2 = () => {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const toggleAppointmentModal = () =>
    setIsAppointmentModalOpen(!isAppointmentModalOpen);
  return (
    <div className="relative w-full h-[350px] md:h-[500px] xlg:h-[600px]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/offerbg.jpg"
          alt="offerbg"
          fill
          priority
          className="object-cover h-full w-full"
        />
      </div>

      {/* Overlay content */}
      <div className="absolute inset-0 md:left-5 xlg:left-40 flex flex-col justify-center items-center sm:items-start px-4 sm:px-8 md:px-16 gap-3 sm:gap-4">
        <h1 className=" md:text-4xl lg:text-5xl font-bold  text-left leading-snug text-defined-darkbrown w-[50%] md:w-full">
          Have a <span className="text-[#E5B338]">Delicious</span>{" "}
          <br className="hidden sm:block" />{" "}
          <span className="text-[#DD1919]">Meal</span> With{" "}
          <br className="hidden sm:block" />{" "}
          <span className="text-defined-green">Varnikaa Cafe</span>
        </h1>

        <p className="max-w-sm text-sm sm:text-base text-center sm:text-left">
          Have a delicious meal with Varnikaa Cafe, where every bite is filled
          with freshness and flavor. From mouthwatering pizzas and crispy
          burgers to refreshing fruit juices and creamy milkshakes, we offer a
          delightful culinary experience, perfect for friends, family, and food
          lovers in Siliguri.
        </p>

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

export default AboutSection2;
