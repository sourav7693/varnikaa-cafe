import Image from "next/image";
import Link from "next/link";
import { FaMobile, FaWhatsapp } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const links = [
        { name: "Home", link: "/" },
        { name: "Our Menu", link: "/menu" },
        { name: "Terms & Conditions", link: "/terms-and-conditions" },
        { name: "Shipping Policy", link: "/shipping-policy" },        
        { name: "Refund Policy", link: "/refund-policy" },
        { name: "Privacy Policy", link: "/privacy-policy" },
              ];
  return (
    <footer className="pt-8 gap-4 border-t-4 border-defined-green flex flex-col relative">
      <div className="absolute inset-0">
        <Image
          src="/images/footerbg.png"
          alt="footer"
          width={500}
          height={500}
          className="w-full h-full object-cover opacity-15"
        />
      </div>

      <div className="relative flex flex-col md:flex-row justify-between items-start w-full gap-8 mb-4 self-padding">
        {/* Left Text Content */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <p className="lg:text-sm text-lg xlg:text-lg font-semibold text-defined-darkbrown">
            Lorem ipsum dolor sit amet consectetur. Urna id porttitor tincidunt
            quam. Hendrerit diam amet in dolor. Hendrerit eleifend elementum
            massa in sagittis interdum viverra feugiat in. Eget arcu amet
          </p>

          <div className="flex flex-col gap-4 w-full">
            <h1 className="lg:text-xl text-2xl xlg:text-2xl font-semibold text-defined-darkbrown">
              Contact Information
            </h1>

            <div className="flex flex-col gap-2 lg:text-sm text-lg xlg:text-lg">
              <div className="flex gap-2 items-center">
                <FaWhatsapp size={20} className="text-defined-green" />
                <Link href="https://wa.me/919434320315">+91 94343 20315</Link>
              </div>

              <div className="flex gap-2 items-center">
                <FaMobile size={20} className="text-defined-green" />
                <Link href="tel:+919434320315" target="_blank">
                  +91 94343 20315
                </Link>
              </div>

              <Link
                href="mailto:Varnikaacafe@gmail.com"
                target="_blank"
                className="flex gap-2 items-center"
              >
                <MdEmail size={20} className="text-defined-green" />
                <span>Varnikaacafe@gmail.com</span>
              </Link>

              <Link
                href="/"
                className="flex gap-2 items-center w-full"
                target="_blank"
              >
                <IoLocationSharp
                  size={20}
                  className="text-defined-green shrink-0"
                />
                <span>
                  Ward No 9, Khalpara, Burdwan Road, Siliguri WB 734001
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative flex justify-center items-center w-full h-[280px]">
          {/* Left image (behind) */}
          <div className="absolute left-1/2 -translate-x-[130%] w-40 sm:w-56 md:w-64 h-40 sm:h-56 md:h-64 rounded-xl overflow-hidden z-0 shadow-md">
            <Image
              src="/images/f1.png"
              alt="left dish"
              fill
              className="object-cover"
            />
          </div>

          {/* Right image (behind) */}
          <div className="absolute left-1/2 translate-x-[50%] w-40 sm:w-56 md:w-64 h-40 sm:h-56 md:h-64 rounded-xl overflow-hidden z-0 shadow-md">
            <Image
              src="/images/f3.png"
              alt="right dish"
              fill
              className="object-cover"
            />
          </div>

          {/* Center image (front) */}
          <div className="relative z-10 size-60 md:size-80 rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/images/f2.png"
              alt="center dish"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="md:px-18 py-8 flex flex-col justify-between items-center  bg-defined-green/80 w-full px-4 z-10">
        <div className="flex md:items-center justify-center gap-4 flex-col w-full">
          <Link href={"/"} className="">
            <Image
              src={"/logo.svg"}
              alt="logo"
              width={1224}
              height={181}
              priority
              className="w-[12rem] md:w-[13rem]"
            />
          </Link>
          <div className="flex flex-col text-white font-medium text-sm md:text-base md:flex-row gap-6">
            {links.map((link, index) => (
              <Link
                href={link.link}
                key={index}
                className="hover:underline"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex md:flex-row flex-col justify-between items-center gap-4 mt-4 w-full border-t pt-4 border-white/30">
          <div className="text-center text-xs md:text-base">
            <h1 className=" text-white ">
              © <Link href={"/"}> Varnikaa Cafe - 2025 |</Link> {/* <br /> */}
              All Rights Reserved
            </h1>
          </div>
          <div className="flex text-sm md:text-base justify-center items-center gap-2 text-white">
            <h1>Developed By </h1>
            <Link href={"https://rebootai.in/"} target="_blank">
              <Image
                src="/reboots.svg"
                alt="reboot-logo"
                width={100}
                height={100}
                className="h-[0.8rem] md:h-[1rem] w-fit"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;