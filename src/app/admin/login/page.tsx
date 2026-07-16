import { redirect } from "next/navigation";
import { getSupabaseAuthClient } from "@/lib/auth";

async function login(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const supabase = await getSupabaseAuthClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect("/admin/login?error=1");
  redirect("/admin");
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F7FA] px-4 py-10">
      <form action={login} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-slate-900/10">
        <p className="text-sm font-bold uppercase tracking-wide text-[#16A765]">Accès sécurisé</p>
        <h1 className="mt-2 text-3xl font-black text-[#002B55]">Administration</h1>
        <p className="mt-2 text-sm text-slate-600">Connectez-vous avec un compte autorisé Supabase Auth.</p>
        {params.error ? <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">Identifiants invalides.</p> : null}
        <label className="mt-6 block text-sm font-semibold text-[#152238]" htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" required className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-[#002B55]" />
        <label className="mt-4 block text-sm font-semibold text-[#152238]" htmlFor="password">Mot de passe</label>
        <input id="password" name="password" type="password" required className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-[#002B55]" />
        <button className="mt-6 w-full rounded-full bg-[#002B55] px-5 py-3 text-sm font-bold text-white">Se connecter</button>
      </form>
    </main>
  );
}
