import { redirect } from "next/navigation";
import { verifyAdminAuth } from "@/lib/admin-auth";
import AdminDashboard from "./dashboard";

export default async function AdminPage() {
  const isAuthed = await verifyAdminAuth();

  if (!isAuthed) {
    redirect("/admin/login");
  }

  return <AdminDashboard />;
}
