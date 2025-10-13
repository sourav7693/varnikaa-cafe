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
      <div className="w-full md:w-[40%] h-full rounded-xl">
        <Image
          src="/images/about.png"
          alt="about-1"
          width={500}
          height={500}
          className=" w-full h-full object-cover rounded-xl"
          priority
          style={{ height: isSmallScreen ? "auto" : `${rightSideHeight}px` }}
        />
      </div>

      <div
        className="w-full md:w-[60%] h-full flex flex-col gap-4"
        ref={leftSideRef}
      >
        <span>About Us</span>
        <h1 className="text-2xl font-bold text-defined-purple">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. In, quos.
        </h1>

        <p className="text-defined-brown text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
          laborum dolorem aut veritatis voluptatum numquam quam, voluptates
          vitae? Ut iusto beatae nulla esse magnam amet hic eius, cumque at
          voluptatibus provident ipsum minima similique, consectetur quia
          quisquam magni distinctio, sit illum vitae assumenda? Fuga vitae natus
          nostrum, necessitatibus similique delectus nam, dolores soluta in
          tenetur voluptatum eligendi qui optio, ipsa quis a quo quod eos labore
          unde iusto eveniet accusantium asperiores. Quo odio porro, quos
          nesciunt, animi rem a velit architecto consectetur praesentium autem.
          Quibusdam nihil facere nemo placeat nam iure magni, animi iste
          suscipit assumenda et maiores illo eum.
        </p>
        <button onClick={toggleAppointmentModal} className="w-full md:w-[25%] text-defined-green border border-defined-green py-2 px-5 rounded-3xl">
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