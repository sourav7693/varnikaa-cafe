import Image from "next/image";
import React from "react";
import { BsArrowUpRightCircleFill } from "react-icons/bs";

const whatsappLink = "tel:+919800107777";

const ServiceCard = ({
  imgsrc,
  heading,
  description,
}: {
  imgsrc: string;
  heading: string;
  description: string;
}) => {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col rounded-md group transition-transform duration-500 ease-in-out hover:scale-[102%] hover:inset-shadow-defined-light flex-grow h-full cursor-pointer"
    >
      <div>
        <Image
          src={imgsrc}
          alt={heading}
          width={1280}
          height={720}
          className="object-cover rounded-t-md"
        />
      </div>

      <div className="xl:p-6 xlg:p-5 xxl:p-8 p-4 rounded-b-md flex flex-col gap-3 xxl:gap-5 text-white bg-gradient-to-r from-defined-purple to-defined-purple bg-[length:200%_100%] bg-left hover:bg-gradient-to-r hover:from-defined-blue hover:to-defined-purple transition-all duration-700 hover:bg-[70%] w-full h-full justify-between flex-grow">
        <h1 className="text-2xl font-medium">{heading}</h1>
        <div>{description}</div>

        <div className="flex items-center justify-between font-medium group-hover:scale-105 transition-transform duration-300">
          <span className="xlg:text-xl text-lg xxl:text-2xl transition-transform duration-300 group-hover:translate-x-2">
            Get more details
          </span>
          <BsArrowUpRightCircleFill className="xlg:text-lg text-base transition-transform duration-300 group-hover:rotate-45" />
        </div>
      </div>
    </a>
  );
};

export default ServiceCard;