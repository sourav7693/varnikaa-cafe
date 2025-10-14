"use client";
import Image from "next/image";

const GallerySection = () => {
  const images = [
    "/images/m1.png",
    "/images/m2.png",
    "/images/m3.png",
    "/images/m4.png",
    "/images/m2.png",
    "/images/m3.png",
  ];

  return (
    <section className="pb-12 flex flex-col gap-6 items-center justify-center w-full">
      <span className="text-defined-brown">Food Gallery</span>
      <h1 className="text-3xl md:text-4xl font-bold text-defined-darkbrown text-center">
        Our <span className="text-defined-green">Food Gallery</span>
      </h1>
      <p className="text-center max-w-2xl text-defined-brown">
        Indulge your senses with a stunning display of mouthwatering culinary
        creations in our captivating food gallery. Feed your eyes and awaken
        your cravings!
      </p>

      {/* ✅ Compact grid layout */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full mx-auto">
        {/* Row 1 */}
        <div className="col-span-1 h-[180px] sm:h-[220px] lg:h-[240px]">
          <Image
            src={images[0]}
            alt="gallery-1"
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-1 lg:col-span-2 h-[180px] sm:h-[220px] lg:h-[240px]">
          <Image
            src={images[1]}
            alt="gallery-2"
            width={800}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Row 2 */}
        <div className="col-span-1 h-[180px] sm:h-[220px] lg:h-[240px]">
          <Image
            src={images[2]}
            alt="gallery-3"
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-1 h-[180px] sm:h-[220px] lg:h-[240px]">
          <Image
            src={images[3]}
            alt="gallery-4"
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-2 lg:col-span-1 h-[180px] sm:h-[220px] lg:h-[240px]">
          <Image
            src={images[4]}
            alt="gallery-5"
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
