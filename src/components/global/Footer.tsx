import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const links = [
        { name: "Home", link: "/" },
        { name: "Our Menu", link: "/menu" },
        { name: "Terms & Conditions", link: "/terms-and-conditions" },
        { name: "Shipping & Delivery", link: "/shipping-and-delivery" },        
        { name: "Refund Policy", link: "/refund-policy" },
        { name: "Privacy Policy", link: "/privacy-policy" },
              ];
  return (
    <footer className="pt-8 gap-4 border-t-4 border-defined-green flex flex-col relative">
      <div className="absolute inset-0">
        <Image
          src="/images/footerbg1.jpg"
          alt="footer"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative flex flex-col md:flex-row justify-between items-start w-full gap-8 mb-4 self-padding">
        {/* Left Text Content */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <div className="w-full flex justify-center flex-col items-start gap-2">
            <Image
              src="/images/leaf.png"
              alt="leaf"
              width={500}
              height={500}
              className="object-cover size-10"
            />
            <p className="text-defined-green font-medium text-center">
              Our Location
            </p>
          </div>
          <h1 className="text-3xl text-defined-darkbrown">
            Visit Our Restaurant
          </h1>
          Varnikaa Cafe: Fresh flavors, cozy ambiance, and delightful meals.
          Visit us for a memorable dining experience every day.
          <div className="flex flex-col gap-4 w-full">
            <h1 className="lg:text-xl text-2xl xlg:text-2xl font-semibold text-defined-darkbrown">
              Contact Information
            </h1>

            <div className="flex flex-col gap-2 lg:text-sm text-lg xlg:text-lg">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2 hover:underline"
              >
                Address: Premendra Mitra Street, Ward No 27, Siliguri WB 734005
              </Link>
              <Link
                href="tel:+919434320315"
                className="flex items-center gap-2 hover:underline"
              >
                Phone/ WhatsApp: +91 94343 20315
              </Link>
              <Link
                href="mailto:Varnikaacafe@gmail.com"
                className="flex items-center gap-2 hover:underline"
              >
                <p>Email: Varnikaacafe@gmail.com</p>
              </Link>
            </div>

            <div className="flex gap-4 flex-row items-center">
              <Link
                href="/"
                className="hover:scale-105 transition-all duration-300 bg-defined-green text-white py-2 px-5 rounded-md"
              >
                Get Directions
              </Link>              
              <Link
                href="https://www.instagram.com/varnikaacafe/"
                target="_blank"
              >
                <Image
                  src="/images/instagram.png"
                  alt="instagram"
                  width={40}
                  height={40}
                  className="size-8"
                />
              </Link>                      
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative flex justify-center items-center w-full md:w-1/2 h-[280px]">
          {/* Left image (behind) */}
          <div className="absolute md:left-1/2 md:-translate-x-[100%] -translate-x-[40%] md:translate-y-[30%] translate-y-[30%] w-40 sm:w-56 md:w-64 h-40 sm:h-56 md:h-74 rounded-xl overflow-hidden z-10 shadow-md">
            <Image
              src="/images/footerimg1.jpg"
              alt="left dish"
              fill
              className="object-cover"
            />
          </div>

          {/* Right image (behind) */}
          <div className="absolute left-1/2 md:translate-y-[5%] -translate-x-[30%]  w-50 sm:w-56 md:w-84 h-64 sm:h-56 md:h-94 rounded-xl overflow-hidden z-0 shadow-md">
            <Image
              src="/images/footerimg2.jpg"
              alt="right dish"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="relative md:px-18 py-8 flex flex-col justify-between items-center  bg-defined-green/80 w-full px-4 z-10">
        <div className="absolute inset-0">
          <Image
            src="/images/footerbg2.jpg"
            alt="footer"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative flex md:items-center justify-center gap-4 flex-col w-full">
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
              <Link href={link.link} key={index} className="hover:underline">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="relative flex md:flex-row flex-col justify-between items-center gap-4 mt-4 w-full border-t pt-4 border-white/30">
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