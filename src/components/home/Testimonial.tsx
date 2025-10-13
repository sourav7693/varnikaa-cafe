// testimonialimg;

"use client";
import React, { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

const TestimonialSection = () => {

  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 350) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 460) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 860) {
        setSlidesToShow(2);
      } else if (window.innerWidth <= 1224) {
        setSlidesToShow(3);
      } else if (window.innerWidth <= 1380) {
        setSlidesToShow(4);
      } else if (window.innerWidth <= 1780) {
        setSlidesToShow(4);
      } else {
        setSlidesToShow(5);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="xl:p-16 lg:p-8 p-4 flex flex-col gap-6 justify-center items-center">
      <div className=" flex flex-col items-center gap-2 w-full text-center ">
        {/* <HeadingComponent heading1={"Our Testimonial"} heading2={""} /> */}
        <div className=" flex flex-col gap-1 text-center items-center">                    
        </div>
      </div>
      <div className="w-full">
        <Swiper
          spaceBetween={20}
          slidesPerView={slidesToShow}
          autoplay={{ disableOnInteraction: false }}
          loop={true}
          modules={[Autoplay]}
        >
          {/* {googleReviews?.map((item, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard
                author_name={item.author_name}
                text={item.text}
                rating={item.rating}
                relative_time_description={item.relative_time_description}
              />
            </SwiperSlide>
          ))} */}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialSection;
