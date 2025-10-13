import AboutSection1 from "@/components/home/AboutSection1";
import AboutSection2 from "@/components/home/AboutSection2";
import BookingSection from "@/components/home/BookingSection";
import GallerySection from "@/components/home/GallerySection";
import HomeSlider from "@/components/home/HomeSlider";
import MenuSection from "@/components/home/MenuSection";
import SpecialMenu from "@/components/home/SpecialMenu";
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
          <GallerySection />
        </section>
        <section className="self-padding">
          <BookingSection />
        </section>
    </MainTemplate>
  );
};

export default page;
