"use client";
import useElementHeight from "@/hooks/useElementHeight";
import Image from "next/image";
import { useState, useEffect } from "react";

const GallerySection = () => {
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
      <h1 className="text-3xl font-bold text-defined-darkbrown text-center">
        Our <span className="text-defined-green">Food Gallery</span>
      </h1>
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
        <div
          className="w-full md:w-1/2 flex flex-col gap-4"
          style={{ height: isSmallScreen ? "300px" : `${rightSideHeight}px` }}
        >
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="w-full md:w-1/2">
              <Image
                src="/images/m3.png"
                alt="m3"
                width={400}
                height={400}
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2">
              <Image
                src="/images/m4.png"
                alt="m4"
                width={400}
                height={400}
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>
          <Image
            src="/images/m2.png"
            alt="m2"
            width={400}
            height={400}
            className="rounded-lg w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-4" ref={leftSideRef}>
          <Image
            src="/images/m2.png"
            alt="m2"
            width={400}
            height={400}
            className="rounded-lg w-full h-full object-cover"
          />
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="w-full md:w-1/2">
              <Image
                src="/images/m3.png"
                alt="m3"
                width={400}
                height={400}
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2">
              <Image
                src="/images/m4.png"
                alt="m4"
                width={400}
                height={400}
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
