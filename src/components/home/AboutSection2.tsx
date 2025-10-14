import Image from "next/image";
import Link from "next/link";

const AboutSection2 = () => {
  return (
    <div className="relative w-full h-[350px] md:h-[500px]">
      {/* Background image */}
      <Image
        src="/images/offerbg.jpg"
        alt="offerbg"
        width={500}
        height={500}
        className="object-cover h-full w-full"
      />

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center sm:items-start px-4 sm:px-8 md:px-16 gap-3 sm:gap-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center sm:text-left leading-snug">
          Have a Delicious <br className="hidden sm:block" /> Meal With{" "}
          <br className="hidden sm:block" /> Varnikaa Cafe
        </h1>

        <p className="max-w-sm text-sm sm:text-base text-center sm:text-left">
          Have a delicious meal with Varnikaa Cafe, where every bite is filled
          with freshness and flavor. From mouthwatering pizzas and crispy
          burgers to refreshing fruit juices and creamy milkshakes, we offer a
          delightful culinary experience, perfect for friends, family, and food
          lovers in Siliguri.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
          <Link href="/menu" className="hover:scale-105 transition-all duration-300 bg-defined-green text-white py-2 px-5 rounded-md">
            View Our Menu
          </Link>
          <button className="text-defined-green border border-defined-green py-2 px-5 rounded-md">
            Get Offer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutSection2;
