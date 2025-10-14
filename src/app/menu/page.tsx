import SubBanner from "@/components/global/SubBanner"
import GallerySection from "@/components/home/GallerySection";
import MenuSection from "@/components/home/MenuSection";
import MainTemplate from "@/templates/MainTemplate"


const page = () => {
  return (
    <MainTemplate>
      <SubBanner heading="Our Menu" />
      <section className="self-padding">
        <MenuSection />
      </section>      
      <GallerySection />
    </MainTemplate>
  );
}

export default page