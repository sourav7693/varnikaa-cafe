"use client";
import { useState } from "react";
import Image from "next/image";
import MenuRequestModal from "../global/MenuRequestModal";

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
      <div className="absolute inset-0 xlg:left-40 flex flex-col justify-center items-center sm:items-start px-4 sm:px-8 md:px-16 gap-3 sm:gap-4">
        <h1 className=" md:text-4xl lg:text-5xl text-xl font-bold w-full text-left leading-snug text-defined-darkbrown md:w-full">
          <span className="text-[#E5B338]">Delicious</span>{" "}
          <br className="hidden sm:block" />{" "}
          <span className="text-defined-green">Meal</span> With{" "}
          <br className="hidden sm:block" />{" "}
          <span className="text-defined-green">Varnikaa Cafe</span>
        </h1>

        <p className=" text-base md:text-lg text-left md:w-1/2 w-full">
          Have a delicious meal with Varnikaa Cafe, where{" "}
          <br className="md:hidden block" /> every bite is filled with freshness
          and flavor. From <br className="md:hidden block" /> mouthwatering
          pizzas and crispy burgers to <br className="md:hidden block" />{" "}
          refreshing fruit juices and creamy milkshakes, we{" "}
          <br className="md:hidden block" /> offer a delightful culinary
          experience, perfect for <br className="md:hidden block" />
          friends, family, and food lovers in Siliguri.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
          <button
            onClick={toggleAppointmentModal}
            className="text-defined-green border border-defined-green py-2 px-5 rounded-md"
          >
            Menu Request
          </button>
        </div>
      </div>
      <MenuRequestModal
        isOpen={isAppointmentModalOpen}
        onClose={toggleAppointmentModal}
      />
    </div>
  );
};

export default AboutSection2;
