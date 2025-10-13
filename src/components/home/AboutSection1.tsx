"use client"
import useElementHeight from "@/hooks/useElementHeight";
import { useState, useEffect } from "react";
import Image from "next/image";
import AppointmentModal from "../global/AppointmentModal";
const AboutSection1 = () => {  
const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

const toggleAppointmentModal = () =>
  setIsAppointmentModalOpen(!isAppointmentModalOpen);
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
    <section className="flex flex-col md:flex-row w-full h-auto justify-between gap-8">
      <div className="w-full md:w-[35%]" ref={leftSideRef}>
        <Image
          src="/images/about.png"
          alt="about-1"
          width={500}
          height={500}
          className=" w-full h-full object-cover"
        />
      </div>

      <div
        className="w-full md:w-[60%] h-full flex flex-col gap-4"
        style={{ height: isSmallScreen ? "auto" : `${rightSideHeight}px` }}
      >
        <span className="text-defined-darkbrown text-center md:text-left">
          About Us
        </span>
        <h1 className="text-2xl font-bold text-center md:text-left text-defined-darkbrown">
          Fresh Flavors,{" "}
          <span className="text-defined-green">Friendly Moments</span>, Every
          Day
        </h1>

        <p className="text-defined-brown text-justify">
          At Varnikaa Cafe, we believe that every meal is more than just
          food—it&apos;s an experience to savor, share, and remember. Located in
          the heart of Siliguri, we bring together the perfect blend of taste,
          freshness, and warmth in every dish we serve. From refreshing fruit
          juices and creamy milkshakes to crispy burgers, flavorful noodles, and
          indulgent pizzas, our menu caters to every craving and age. <br />
          <br /> Our commitment to quality ensures that every ingredient is
          fresh, hygienically prepared, and served with care, creating flavors
          that delight the senses. Beyond food, Varnikaa Cafe is a space where
          friends gather, families bond, and memories are made. Our cozy
          ambiance, friendly service, and affordable offerings make every visit
          a special one. Whether you&apos;re stopping by for a quick snack or a
          leisurely meal, we promise a delightful culinary journey that keeps
          you coming back for more.
        </p>
        <button
          onClick={toggleAppointmentModal}
          className="w-full md:w-[25%] text-defined-green border border-defined-green py-2 px-5 rounded-3xl"
        >
          Enquiry Now
        </button>
      </div>
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={toggleAppointmentModal}
      />
    </section>
  );
}

export default AboutSection1