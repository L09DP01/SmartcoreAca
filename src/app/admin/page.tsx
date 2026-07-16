import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin-dashboard";
import { requireAdmin } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import type { RegistrationRecord } from "@/lib/validations";

export default async function AdminPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");

  const { data, error } = await getSupabaseAdmin()
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-[#F5F7FA] p-8">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 text-red-700 shadow-sm">
          {error.message}
        </div>
      </main>
    );
  }

  return <AdminDashboard initialRegistrations={(data ?? []) as RegistrationRecord[]} />;
}
