import { NextResponse } from "next/server";
import { PAYMENT_AMOUNT } from "@/lib/payment";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const eventType = payload.event_type;
    const paymentData = payload.data;

    if (!eventType || !paymentData) {
      return NextResponse.json({ error: "Payload invalide." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    await supabase.from("kobara_webhook_events").insert({
      event_type: eventType,
      kobara_payment_id: paymentData.payment_id,
      amount: paymentData.amount,
      payload,
    });

    if (eventType !== "payment.succeeded") {
      return NextResponse.json({ received: true });
    }

    const registrationId = paymentData.metadata?.registration_id;
    if (!registrationId) {
      return NextResponse.json({ error: "Identifiant d’inscription absent." }, { status: 400 });
    }
    if (Number(paymentData.amount) !== PAYMENT_AMOUNT) {
      return NextResponse.json({ error: "Montant incorrect." }, { status: 400 });
    }

    const { data: registration } = await supabase
      .from("registrations")
      .select("id, payment_status")
      .eq("id", registrationId)
      .single();

    if (!registration) {
      return NextResponse.json({ error: "Inscription introuvable." }, { status: 404 });
    }
    if (registration.payment_status === "paid") {
      return NextResponse.json({ received: true, alreadyProcessed: true });
    }

    await supabase
      .from("registrations")
      .update({
        payment_status: "paid",
        amount_paid: PAYMENT_AMOUNT,
        kobara_payment_id: paymentData.payment_id,
        paid_at: new Date().toISOString(),
      })
      .eq("id", registrationId);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Kobara webhook error:", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  }
}
