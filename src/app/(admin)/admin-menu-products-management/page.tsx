import { getAllItems } from '@/actions/menuItem';
import AddMenuItems from '@/components/admin/AddMenuItems';
import MenuItemList from '@/components/admin/MenuItemList';
import { MenuItemResponse } from '@/models/MenuItem';

const page =async({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
    const { page } = await searchParams;
    const pageData = await getMenuItemData(page);    
  return (
    <section className=" flex flex-col md:flex-row justify-between items-center gap-4 py-8 md:px-10 px-4">
      <div className="w-full h-full md:w-[30%] flex flex-col rounded-t-2xl gap-6 bg-[#F9FAFB] border border-[#ccc] p-4">
        <h1 className="text-2xl text-center text-defined-darkbrown font-bold">
          Add Category With Item
        </h1>
        <AddMenuItems />
      </div>
      <MenuItemList MenuItems={pageData.data} pagination={pageData.pagination} />
    </section>
  );
}

export default page

async function getMenuItemData(
  page: number | string = 1
): Promise<MenuItemResponse> {
  try {
    const menuItem = await getAllItems(parseInt((page as string) ?? "1"));
    return menuItem;
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