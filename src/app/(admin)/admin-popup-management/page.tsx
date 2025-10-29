import { getAllPopups } from "@/actions/popup";
import PopupForm from "@/components/admin/PopupForm";
import PopupTable from "@/components/admin/PopupTable";
import { PopupResponse } from "@/models/Popup";

export default async function PopupManagementPage() {
  const pageData: PopupResponse = await getAllPopups();

  return (
    <section className="flex flex-col md:flex-row justify-between items-start gap-6 py-8 md:px-10 px-4">
      <div className="w-full md:w-[30%] bg-[#F9FAFB] border border-[#ccc] p-4 rounded-xl">
        <h1 className="text-2xl text-center text-defined-darkbrown font-bold mb-4">
          Create New Popup
        </h1>
        {/* ✅ Client form triggers refresh in the table */}
        <PopupForm />
      </div>

      {/* ✅ Client table manages its own refresh state */}
      <PopupTable initialPopups={pageData.data} />
    </section>
  );
}
