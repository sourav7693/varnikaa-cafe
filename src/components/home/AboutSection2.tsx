import Image from "next/image";

const AboutSection2 = () => {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
      {/* Background image */}
      <Image
        src="/images/about2.png"
        alt="about2"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center sm:items-start px-4 sm:px-8 md:px-16 gap-3 sm:gap-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center sm:text-left leading-snug">
          Have a Delicious <br className="hidden sm:block" /> Meal With{" "}
          <br className="hidden sm:block" /> Varnikaa Cafe
        </h1>

        <p className="max-w-sm text-sm sm:text-base text-center sm:text-left">
          Lorem ipsum dolor sit amet consectetur. Urna id porttitor tincidunt
          quam. Hendrerit diam amet in dolor. Hendrerit eleifend elementum massa
          in sagittis interdum viverra feugiat in. Eget arcu amet pellentesque
          imperdiet ultricies lectus dui sapien velit. In sed penatibus pulvinar
          consequat tempus auctor
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
          <button className="bg-defined-green text-white py-2 px-5 rounded-md">
            View Our Menu
          </button>
          <button className="text-defined-green border border-defined-green py-2 px-5 rounded-md">
            Get Offer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutSection2;
