import Image from "next/image";
import EnquiryForm from "./EnquiryForm";

const EnquiryBoxSection = () => {
  return (
    <div className="relative rounded-2xl">
      <div className="absolute inset-0">
        <Image
          src="/images/homepageimage.jpg"
          alt="footer"
          width={500}
          height={500}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="relative xlg:p-8 md:p-6 p-4 flex flex-col rounded-xl gap-6">
        <div className=" flex flex-col gap-2">
          <h1 className=" text-lg md:text-lg xlg:text-xl font-bold text-defined-purple text-center md:text-left">
            Get Your Free Moving Quote Today!
          </h1>
        </div>
        <EnquiryForm />
      </div>
    </div>
  );
};

export default EnquiryBoxSection;
