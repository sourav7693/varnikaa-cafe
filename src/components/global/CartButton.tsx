import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";
export default function WhatsAppButton() {
  return (
    <Link className="md:hidden fixed bottom-14 right-8 z-[1100]" href="/checkout">
      <div className="flex items-center bg-defined-green text-white w-[3rem] h-[3rem] rounded-full justify-center">        
          <FaCartArrowDown size={25} />                  
      </div>
    </Link>
  );
}
