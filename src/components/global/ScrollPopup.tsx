"use client";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { getAllPopups } from "@/actions/popup"; 
import { PopupDocument } from "@/models/Popup";

const ScrollPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [popupData, setPopupData] = useState<PopupDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPopup() {
      try {
        const res = await getAllPopups();
        if (res.success && res.data) setPopupData(res.data[0]);
      } catch (err) {
        console.error("Failed to load popup", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPopup();
  }, []);

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

  const handleClose = () => setIsVisible(false);

  if (loading || !popupData || !isVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[1000]"
      onClick={handleClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 scale-100 w-[90%] max-w-[1440px] h-[500px] flex justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition"
        >
          <IoClose size={24} />
        </button>

        {/* Image */}
        <Image
          src={popupData.image?.secure_url || "/fallback.jpg"}
          alt={popupData.name || "Popup Image"}
          width={1440}
          height={720}
          className="object-cover w-full h-full rounded-2xl"
          priority
        />
      </div>
    </div>
  );
};

export default ScrollPopup;
