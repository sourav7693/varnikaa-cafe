import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import TopHeader from "@/components/global/TopHeader";
import OnlyMobile from "./OnlyMobile";
export default function MainTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-full flex-col overflow-x-hidden">
      <div className="z-[1000] w-full">
        <TopHeader />
        <Header />
      </div>

      {/* Main Content */}
      <div className=" lg:mt-[5rem] md:mt-[5rem] mt-[2rem]">{children}</div>
      <OnlyMobile />
      <Footer />
    </div>
  );
}