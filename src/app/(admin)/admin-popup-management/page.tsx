import { getAllPopups } from "@/actions/popup";
import PopupSection from "@/components/admin/PopupSection";
import {  PopupResponse } from "@/models/Popup";

export default async function PopupManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page } = await searchParams;
  const pageData = await getPopupData(page);

  return (
    <section className="admin-self-padding flex flex-col md:flex-row gap-6">
      <PopupSection initialPopups={pageData.data} />
    </section>
  );
}

async function getPopupData(page: number | string = 1): Promise<PopupResponse> {
  try {
    const popups = await getAllPopups(parseInt((page as string) ?? "1"));
    return popups;
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
