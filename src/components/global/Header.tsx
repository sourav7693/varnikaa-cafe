"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { AiOutlineMenuFold } from "react-icons/ai";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchTerm) params.set("search", searchTerm);
      else params.delete("search");

      router.replace(`${pathname}?${params.toString()}`);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchTerm, pathname, router, searchParams]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const NavLinksData = [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "About Us",
      href: "/about",
    },
    {
      text: "Our Menu",
      href: "/menu",
    },
    {
      text: "Contact Us",
      href: "/contact",
    },
  ];

  const isActive = (path: string | undefined) => {
    return pathname === path;
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`flex justify-between items-center md:px-18 px-4 fixed h-[3.5rem] md:h-[5rem] w-full z-[60] bg-defined-green shadow-defined-light ${
          scrolled ? "top-0 " : "md:top-[3rem] top-0"
        }`}
      >
        {/* Logo */}

        <Link href={"/"} className="">
          <Image
            src={"/logo.svg"}
            alt="logo"
            width={1224}
            height={181}
            priority
            className="w-[10rem] md:w-[13rem]"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center justify-center gap-6">
          {NavLinksData.map((item, index) => (
            <li
              key={index}
              className="font-medium text-lg hover:scale-110 transition-all duration-500"
            >
              {item.href ? (
                <div className="relative group">
                  <Link
                    href={item.href}
                    className={`${
                      item.href === pathname && " text-white"
                    } text-white transition-all duration-300 px-3 py-1 rounded-3xl `}
                  >
                    {item.text}
                  </Link>
                </div>
              ) : (
                <div className="relative">
                  <span
                    className={`${
                      isActive(item.href) ? "" : "text-defined-blue"
                    } font-semibold capitalize cursor-pointer`}
                  >
                    {item.text}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
        {/* Desktop button */}
        <div className="hidden lg:flex items-center gap-4">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="rounded-full px-4 py-2 text-sm text-white placeholder:text-white outline-none border border-gray-300 w-40 focus:ring-2 focus:ring-defined-green"
          />
          <Link
            href="/checkout"
            className="hover:scale-105 transition-all duration-500 flex items-center justify-center gap-2 bg-white border rounded-4xl text-defined-green h-[2.5rem] px-4 font-semibold"
          >
            Checkout{" "}
            <span className="font-bold bg-defined-green rounded-full size-6 text-white flex items-center justify-center">
              {itemCount}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
         <div className="lg:hidden flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="rounded-full px-4 py-2 text-sm text-white placeholder:text-white outline-none border border-gray-300 w-20 focus:ring-2 focus:ring-defined-green"
        />

        <button
          type="button"
          className="inline-flex lg:hidden text-3xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          title="menu-open"
        >
          <svg width="0" height="0">
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="100%" stopColor="#fff" />
            </linearGradient>
          </svg>
          <span
            className={`transform transition-transform duration-500 ${
              isMenuOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            {isMenuOpen ? (
              <IoCloseSharp
                style={{
                  fill: "url(#gradient1)",
                }}
              />
            ) : (
              <AiOutlineMenuFold
                style={{
                  fill: "url(#gradient1)",
                }}
              />
            )}
          </span>
        </button>
         </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className=" absolute bg-defined-green/70 top-full w-full left-0 text-white font-bold /70 backdrop-blur-2xl lg:hidden p-6 pb-12 h-fit overflow-y-scroll">
            <ul className="flex flex-col gap-4 capitalize">
              {NavLinksData.map((item, index) => (
                <li key={index} className="relative">
                  {item.href ? (
                    <div>
                      <Link
                        href={item.href}
                        className="flex justify-between items-center cursor-pointer lg:text-base text-base md:text-xl xl:text-lg"
                      >
                        {item.text}
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <div
                        className="flex justify-between items-center cursor-pointer lg:text-base text-base md:text-xl xl:text-lg"
                        onClick={() =>
                          setOpenDropdown(openDropdown === index ? null : index)
                        }
                      >
                        <span className="capitalize">{item.text}</span>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
