"use client";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Image from "next/image";

const ScrollPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500 && !sessionStorage.getItem("popupShown")) {
        setIsVisible(true);
        sessionStorage.setItem("popupShown", "true");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[1000]"
      onClick={handleClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl p-4 max-w-md w-[90%] transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition"
        >
          <IoClose size={22} />
        </button>
        <p>popup content</p>

        <Image
          src="/images/testimonialbg.jpg"
          alt="Promotional Popup"
          width={400}
          height={400}
          className="rounded-xl object-cover w-full h-auto"
          priority
        />
      </div>
    </div>
  );
};

export default ScrollPopup;
