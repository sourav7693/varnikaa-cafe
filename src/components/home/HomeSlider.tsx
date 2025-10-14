import Image from "next/image";
import Link from "next/link";

const HomeSlider = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[500px]">
      {/* Background image */}
      <Image
        src="/images/slider.jpg"
        alt="slider"
        width={500}
        height={500}
        className="object-cover h-full w-full"
      />

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col justify-center  items-start sm:items-start px-4 sm:px-8 md:px-16 gap-3 sm:gap-4 text-wrap">
        <h1 className=" md:text-4xl lg:text-5xl font-bold  text-left leading-snug text-defined-darkbrown w-[50%] md:w-full">
          Have a Delicious <br className="hidden sm:block" /> Meal With{" "}
          <br className="hidden sm:block" /> Varnikaa Cafe
        </h1>

        <p className="max-w-sm text-sm sm:text-base text-left">
          A restaurant is a place where people go to eat, frequently with
          friends, family, or coworkers.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
          <Link
            href="/menu"
            className="hover:scale-105 transition-all duration-300 bg-defined-green text-white py-2 px-5 rounded-md"
          >
            View Our Menu
          </Link>
          <button className="text-defined-green border border-defined-green py-2 px-5 rounded-md">
            Enquiry Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
