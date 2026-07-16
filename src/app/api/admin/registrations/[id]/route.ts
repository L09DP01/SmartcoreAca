import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { statusSchema } from "@/lib/validations";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ message: "Non autorisé." }, { status: 401 });

  const parsed = statusSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ message: "Statut invalide." }, { status: 400 });

  const { id } = await params;
  const { data, error } = await getSupabaseAdmin()
    .from("registrations")
    .update({ status: parsed.data.status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({ registration: data });
}
