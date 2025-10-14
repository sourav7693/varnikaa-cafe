import Image from "next/image";
import React from "react";

const SubBanner = ({ heading }: { heading: string }) => {
  return (
    <div className="relative">
      <div className="w-full h-[10rem] lg:h-[18vmax] xl:h-[20rem] overflow-hidden ">
        <Image
          src="/images/subbanner.jpg"
          alt="Sub Banner"
          width={1440}
          height={250}
          className="object-cover h-full w-full"
        />
      </div>

      <div className="absolute top-0 left-10 md:left-40 z-10 bg-defined-purple opacity-80 flex flex-col items-center justify-center h-full">
        <h1 className="text-lg  md:text-xl font-semibold lg:text-3xl text-defined-green opacity-100 text-center text-shadow">
          {heading}
        </h1>
      </div>
    </div>
  );
};

export default SubBanner;