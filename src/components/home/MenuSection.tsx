import { getAllItems } from "@/actions/menuItem";
import MenuCategories from "../ui/MenuCategories";
import { CategoryType, MenuItemDocument } from "@/models/MenuItem";

export const dynamic = "force-dynamic";

export default async function MenuSection() {
  const res = await getAllItems(1, 0, "createdAt", "desc");
  const allItems: MenuItemDocument[] = res?.data || [];

  const filteredItems = allItems.filter(
    (item: MenuItemDocument) =>
      item.categoryType === CategoryType.CLOUD_KITCHEN_MENU
  );

  const categoryNames = Array.from(
    new Set(filteredItems.map((item: MenuItemDocument) => item.categoryName))
  ) as string[];

  const categories: { name: string; items: MenuItemDocument[] }[] =
    categoryNames.map((name: string) => ({
      name,
      items: allItems.filter((i: MenuItemDocument) => i.categoryName === name),
    }));

  return (
    <section className="flex flex-col items-center justify-center gap-4 md:px-8 xl:px-16 w-full">
      <h1 className="text-defined-green text-center text-xl md:text-4xl font-bold">
        Cloud Kitchen (Home Delivery)
      </h1>

      <MenuCategories categories={categories} />
    </section>
  );
}
