import { CouponResponse } from "@/models/Coupon";
import { getAllCoupons } from "@/actions/coupon";
import CouponForm from "@/components/admin/CouponForm";
import CouponTable from "@/components/admin/CouponTable";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
 const { page } = await searchParams;
 const pageData = await getCouponData(page); 

  return (
    <section className="admin-self-padding flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-[30%]">
        <CouponForm />
      </div>

      <div className="w-full md:w-[70%]">
        <CouponTable initialCoupons={pageData.data} />
      </div>
    </section>
  );
};

export default page;
async function getCouponData(
  page: number | string = 1
): Promise<CouponResponse> {
  try {
    const coupons = await getAllCoupons(
      parseInt((page as string) ?? "1")
    );
    return coupons;
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
