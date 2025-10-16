import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const TopHeader = () => {
  return (
    <section className="md:px-18 px-4 z-[60] w-full flex ">
      <div className="w-full h-[3rem] hidden text-defined-darkbrown bg-white md:flex justify-between sm:gap-2 md:gap-0 items-center">
        <div className=" flex items-center gap-2 font-medium">
          <Link
            className="hover:scale-105 transition-all duration-300"
            href={"https://www.instagram.com/varnikaacafe/"}
            target="_blank"
          >
            Instagram
          </Link>
          {" | "}
          <Link
            className="hover:scale-105 transition-all duration-300"
            href={"/"}
            target="_blank"
          >
            Facebook
          </Link>
        </div>
        <div className="xlg:text-base text-sm flex items-center gap-2 font-medium">
          <span>Order On</span>
          <FaWhatsapp className="text-defined-green size-5" />{" "}
          <Link href={"tel:+919434320315"}>+91 94343 20315</Link>
        </div>
      </div>
    </section>
  );
};

export default TopHeader;