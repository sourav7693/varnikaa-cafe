import SubBanner from "@/components/global/SubBanner"
import AboutSection1 from "@/components/home/AboutSection1"
import AboutSection2 from "@/components/home/AboutSection2"
import MainTemplate from "@/templates/MainTemplate"


const page = () => {
  return (
    <MainTemplate>
      <SubBanner heading="About Us" />
      <section className="self-padding">
        <AboutSection1 />
      </section>
      <section className="pb-8">
        <AboutSection2 />
      </section>
    </MainTemplate>
  );
}

export default page