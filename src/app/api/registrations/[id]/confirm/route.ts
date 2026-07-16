import { NextResponse } from "next/server";
import { sendConfirmationEmail } from "@/lib/email";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();

  const { data: existing, error: fetchError } = await supabase
    .from("registrations")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !existing) {
    return NextResponse.json({ error: "Inscription introuvable." }, { status: 404 });
  }

  const updates =
    existing.payment_status === "paid"
      ? {
          registration_status: "confirmed",
          confirmed_at: new Date().toISOString(),
          status: "Confirmée",
        }
      : {
          payment_status: "not_paid",
          amount_paid: 0,
          registration_status: "confirmed",
          confirmed_at: new Date().toISOString(),
          status: "Confirmée",
        };

  const { data, error } = await supabase
    .from("registrations")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Impossible de confirmer l’inscription." }, { status: 500 });
  }

  await sendConfirmationEmail(data);
  return NextResponse.json({
    registrationNumber: data.registration_number,
    token: data.confirmation_token,
  });
}
