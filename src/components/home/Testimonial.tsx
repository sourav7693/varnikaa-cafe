// testimonialimg;

"use client";
import React, { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

const TestimonialSection = () => {

  const data = [
    {
      name: "Ankit Sharma",
      detail:
        "Varnikaa Cafe has quickly become my favorite spot in Siliguri. The fruit juices are incredibly fresh, and the snacks are always delicious. The staff is friendly and welcoming, making every visit a truly enjoyable experience. Highly recommended!",
    },
    {
      name: "Priya Das",
      detail:
        "I visited Varnikaa Cafe with friends, and we loved every moment. The milkshakes were rich and creamy, and the burgers were perfectly cooked. Affordable prices, clean environment, and warm service make it a must-visit for anyone in Siliguri.",
    },
    {
      name: "Rajeev Roy",
      detail:
        "This cafe is a hidden gem in Siliguri! The pizzas are flavorful, the falooda is delightful, and the ambience is cozy. Staff always greets you with a smile. Perfect place for casual hangouts or family outings.",
    },
    {
      name: "Sneha Ghosh",
      detail:
        "I keep coming back to Varnikaa Cafe for their amazing noodles and fried rice. The food is always fresh, portions generous, and service attentive. A comfortable and hygienic place that makes every meal a pleasure.",
    },
    {
      name: "Subham Dutta",
      detail:
        "Varnikaa Cafe offers a wonderful blend of taste and comfort. From juices to desserts, everything is top quality. The staff is courteous, and the atmosphere is inviting. A perfect spot to relax, enjoy great food, and unwind.",
    },
  ];
  const [slidesToShow, setSlidesToShow] = useState(1);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 350) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 460) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 860) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 1224) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 1380) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 1780) {
        setSlidesToShow(1);
      } else {
        setSlidesToShow(1);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="relative xl:p-16 lg:p-8 p-4 flex flex-col gap-6 justify-center items-center h-[300px] md:h-[400px]">
      <div className="absolute inset-0 h-[300px] md:h-[400px]">
        <Image
          src="/images/testimonialbg.jpg"
          alt="testimonialbg"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative flex flex-col items-center gap-2 w-full text-center ">
        {/* <div className=" flex flex-col gap-1 text-center items-center"></div> */}
      </div>
      <div className="w-full md:w-1/4 absolute top-0 left-1/2 -translate-x-1/2">
        <Swiper
          spaceBetween={20}
          slidesPerView={slidesToShow}
          autoplay={{ disableOnInteraction: false }}
          loop={true}
          modules={[Autoplay]}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className=" p-4 md:p-8 flex flex-col items-center justify-center gap-4">
                <p className="text-sm text-center md:text-base text-defined-darkbrown font-medium">
                  &quot;{item.detail}&quot;
                </p>     
                  <div className="ml-4">
                <hr />           
                    <p className="text-sm md:text-base font-semibold text-defined-darkbrown flex flex-col gap-2 items-center justify-center">
                      {item.name}
                      <Image
                        src="/svgs/hat.svg"
                        alt="hat"
                        width={50}
                        height={50}
                        className="size-5 object-cover"         
                      />   
                    </p>
                  </div>                
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialSection;
