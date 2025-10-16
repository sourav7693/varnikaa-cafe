"use client";
import useElementHeight from "@/hooks/useElementHeight";
import Image from "next/image";
import { useState, useEffect } from "react";

const SpecialMenu = () => {
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
    <section className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-defined-green text-center">
        Gallery
      </h1>
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
        <div
          className="w-full md:w-1/2"
          style={{ height: isSmallScreen ? "450px" : `${rightSideHeight}px` }}
        >
          <Image
            src="/images/g1.jpg"
            alt="m1"
            width={400}
            height={400}
            className="rounded-lg w-full h-115 object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-4" ref={leftSideRef}>
          <Image
            src="/images/g2.jpg"
            alt="m2"
            width={400}
            height={400}
            className="rounded-lg w-full h-60 object-cover"
          />
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/2">
              <Image
                src="/images/g3.jpg"
                alt="m3"
                width={400}
                height={400}
                className="rounded-lg w-full h-50 object-cover"
              />
            </div>
            <div className="w-full md:w-1/2">
              <Image
                src="/images/g4.jpg"
                alt="m4"
                width={400}
                height={400}
                className="rounded-lg w-full h-50 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialMenu;
