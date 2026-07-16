import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await getSupabaseAdmin()
    .from("registrations")
    .select("payment_status, amount_paid")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Inscription introuvable." }, { status: 404 });
  }

  return NextResponse.json({
    paymentStatus: data.payment_status,
    amountPaid: data.amount_paid,
  });
}
