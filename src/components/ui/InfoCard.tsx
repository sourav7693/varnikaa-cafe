import Image from "next/image"

const InfoCard = (
    {
        icon,
        title,
        detail,
        index
    }: {
        icon: string,
        title: string,
        detail: string,
        index: number
    }
) => {
  return (
    <div className="relative p-px rounded-2xl bg-gradient-to-b from-[#f5f5f5] to-[#ccc] hover:from-[#f5f5f5] hover:to-defined-purple transition-all duration-300 ease-in-out">
      <div className="w-full h-auto flex flex-col justify-center items-center gap-2 p-6 rounded-2xl  bg-white shadow-md">
        <div
          className={`size-22 rounded-full ${
            index % 2 === 0 ? "bg-defined-purple" : "bg-defined-yellow"
          } flex justify-center items-center p-4`}
        >
          <Image
            src={icon}
            alt="svg"
            width={50}
            height={50}
            className="size-[2rem] md:size-[3rem] object-contain"
          />
        </div>
        <p className="md:text-lg text-center text-defined-purple">{title}</p>
        <p className="text-sm text-center text-defined-brown">{detail}</p>
      </div>
    </div>
  );
}

export default InfoCard