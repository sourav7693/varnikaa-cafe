import AboutSection1 from "@/components/home/AboutSection1";
import AboutSection2 from "@/components/home/AboutSection2";
import CafeSection from "@/components/home/CafeSection";
import GallerySection from "@/components/home/GallerySection";
import HomeSlider from "@/components/home/HomeSlider";
import MenuSection from "@/components/home/MenuSection";
import SpecialMenu from "@/components/home/SpecialMenu";
import TestimonialSection from "@/components/home/Testimonial";
import MainTemplate from "@/templates/MainTemplate";

const page = () => {
  return (
    <MainTemplate>
      <HomeSlider />
      <section className="self-padding">
        <AboutSection1 />
        <SpecialMenu />
      </section>
      <AboutSection2 />
      <section className="self-padding">
        <MenuSection />
      </section>
      <GallerySection />
      <TestimonialSection />
      <section className="self-padding">
        <CafeSection />
      </section>
    </MainTemplate>
  );
};

export default page;
