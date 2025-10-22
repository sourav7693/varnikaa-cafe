"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect, startTransition } from "react";
import { Berkshire_Swash } from "next/font/google";
const bekhireSwash = Berkshire_Swash({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

type User = {
  username: string;
  logout: () => Promise<void>;
};

const AdminHeader = ({ username, logout }: User) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { label: "Dashboard", href: "/admin-dashboard" },
    {
      label: "Customer & Order Management",
      href: "/admin-customer-order-management",
    },
    {
      label: "Menu & Product Management",
      href: "/admin-menu-products-management",
    },
  ];

  const isActive = (path: string | undefined) => {
    return pathname === path;
  };

  const handleLogout = () => {
    startTransition(() => {
      logout().then(() => {
        router.replace("/reboots");
      });
    });
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [dropdownOpen]);

  return (
    <header className="w-full flex justify-between items-center md:px-10 px-4 border-b border-[#ccc] h-20 shadow">
      <Link href={"/admin-dashboard"} className="flex gap-2 items-center">
        <Image
          src={"/logo2.svg"}
          alt="logo"
          width={100}
          height={181}
          priority
          className="w-[10rem] md:w-[3.5rem]"
        />
        <h1
          className={`${bekhireSwash.className} text-3xl font-bold text-defined-green`}
        >
          Varnikaa Cafe
        </h1>
      </Link>
      <div className="flex justify-center items-center gap-16">
        {navLinks.map((links, index) => (
          <Link
          key={index}
            href={links.href}
            className={`${isActive(links.href) ? "text-defined-green" : "text-defined-darkbrown"} font-semibold`}
          >
            {links.label}
          </Link>
        ))}        
      </div>
      <div className="relative" ref={dropdownRef}>
        <Image
          src={"/svgs/user.svg"}
          alt="logo"
          width={100}
          height={181}
          priority
          className="w-[10rem] md:w-[3rem] cursor-pointer text-gray-700 hover:scale-110 transition-all duration-300"
          onClick={() => setDropdownOpen((prev) => !prev)}
        />
        {/* <FaUserCircle
          className="text-3xl cursor-pointer text-gray-700 hover:text-black transition"
          onClick={() => setDropdownOpen((prev) => !prev)}
        /> */}

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
            <div className="px-4 py-2 text-gray-800 font-semibold border-b">
              {username}
            </div>
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
