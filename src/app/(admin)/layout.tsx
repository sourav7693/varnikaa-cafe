import { redirect } from "next/navigation";
import { getUser, logout } from "@/actions/auth";
import AdminHeader from "@/components/admin/AdminHeader";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

  if (!user) {
    redirect("/reboots");
  }

  return (
    <main className="flex h-screen overflow-hidden">      
      <div className="flex flex-col w-full h-full">
        <AdminHeader username={user.name as string} logout={logout} />

        <section className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </section>
      </div>
    </main>
  );
};

export default AdminLayout;
