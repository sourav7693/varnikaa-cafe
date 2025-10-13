import CartPageSection from "@/components/extras/CartPageSection";
import SubBanner from "@/components/global/SubBanner";
import MainTemplate from "@/templates/MainTemplate";

const page = () => {
   

  return (
    <MainTemplate>
      <SubBanner heading="Checkout" />
      <section className="self-padding">
        <h1 className="text-2xl font-bold text-defined-darkbrown">Item List</h1>

       <CartPageSection />
       
      </section>
    </MainTemplate>
  );
};

export default page;
