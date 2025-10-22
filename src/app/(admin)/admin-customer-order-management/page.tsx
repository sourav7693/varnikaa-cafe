import { getAllCustomerOrder } from "@/actions/customerOrder";
import CustomerOrderList from "@/components/admin/CustomerOrderList";
import { CustomerOrderResponse } from "@/models/CustomerOrder";

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
