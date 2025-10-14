import Image from "next/image"

const DefinedHeader = ({title} : {title : string}) => {
  return (
    <div className="w-full flex  flex-col items-center justify-center gap-2">
            <Image
              src="/images/leaf.png"
              alt="leaf"
              width={500}
              height={500}
              className="object-cover size-10"
            />
            <h1 className="text-defined-green  font-medium text-center">
                {title}
            </h1>
          </div>
  )
}

export default DefinedHeader