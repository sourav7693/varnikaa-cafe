import { getAllCustomerOrder } from "@/actions/customerOrder";
import CustomerOrderList from "@/components/admin/CustomerOrderList";
import { CustomerOrderResponse } from "@/models/CustomerOrder";
import { FaSearch } from "react-icons/fa";

const page = async({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page } = await searchParams;
  const pageData = await getCustomerOrderData(page);
  return (
    <section className="admin-self-padding">
      <div className="flex justify-between items-center md:flex-row flex-col">
        <h1 className="text-3xl font-bold text-defined-darkbrown">
          Customer & Order Management
        </h1>
        <div className="flex items-center gap-4">
          <button className="text-white bg-defined-green font-semibold px-4 py-2">
            By Number
          </button>
          <button className="text-white bg-defined-darkbrown font-semibold px-4 py-2">
            By Status
          </button>
        </div>
      </div>
      <div className="relative">
        <FaSearch className="absolute left-5 top-3 text-lg text-defined-brown" />
        <input
          type="text"
          placeholder="Search by vendor name or mobile number"
          className="w-full text-lg text-defined-brown placeholder:text-defined-brown p-2 pl-12 border border-[#ccc]  rounded-md outline-none"
        />
      </div>
      <CustomerOrderList CustomerOrders={pageData.data} pagination={pageData.pagination}/>
    </section>
  );
};

export default page;

async function getCustomerOrderData(
  page: number | string = 1
): Promise<CustomerOrderResponse> {
  try {
    const customerOrder = await getAllCustomerOrder(parseInt((page as string) ?? "1"));
    return customerOrder;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
        limit: 10,
        totalPages: 0,
      },
    };
  }
}
