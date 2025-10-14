import SubBanner from "@/components/global/SubBanner"
import CafeSection from "@/components/home/CafeSection";
import MenuSection from "@/components/home/MenuSection";
import MainTemplate from "@/templates/MainTemplate"


const page = () => {
  return (
    <MainTemplate>
      <SubBanner heading="Our Menu" />
      <section className="self-padding">
        <MenuSection />
        <CafeSection />
      </section>      
      
    </MainTemplate>
  );
}

export default page