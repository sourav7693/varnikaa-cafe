import { getDashboardStats } from "@/actions/dashboardStats";
import DashboardLiveStats from "@/components/admin/DashboardLiveStats";

const DashboardPage = async () => {
  const { data } = await getDashboardStats();

  return (
    <section className="admin-self-padding flex flex-col gap-8">
      <h1 className="text-3xl font-semibold text-defined-darkbrown mb-6">
        Dashboard Overview
      </h1>

      {/* Client-side Auto Refresh Wrapper */}
      <DashboardLiveStats initialData={data} />
    </section>
  );
};

export default DashboardPage;
