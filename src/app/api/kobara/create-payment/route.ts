import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getAppUrl, getKobaraApiUrl, PAYMENT_AMOUNT, PAYMENT_CURRENCY } from "@/lib/payment";
import { getSupabaseAdmin } from "@/lib/supabase";

type KobaraPaymentResponse = {
  status?: string;
  data?: {
    id?: string;
    payment_id?: string;
    checkout_url?: string;
    checkoutUrl?: string;
  };
  id?: string;
  payment_id?: string;
  checkout_url?: string;
  checkoutUrl?: string;
  error?: unknown;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const { registrationId } = (await request.json()) as { registrationId?: string };
    if (!registrationId) {
      return NextResponse.json({ error: "Identifiant d’inscription manquant." }, { status: 400 });
    }

    const secret = process.env.KOBARA_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ error: "Kobara n’est pas configuré." }, { status: 500 });
    }

    const supabase = getSupabaseAdmin();
    const { data: registration, error } = await supabase
      .from("registrations")
      .select("*")
      .eq("id", registrationId)
      .single();

    if (error || !registration) {
      return NextResponse.json({ error: "Inscription introuvable." }, { status: 404 });
    }
    if (registration.payment_status === "paid") {
      return NextResponse.json({ error: "Cette inscription est déjà payée." }, { status: 409 });
    }
    if (registration.kobara_checkout_url && registration.payment_status === "pending") {
      return NextResponse.json({ checkoutUrl: registration.kobara_checkout_url });
    }

    const appUrl = getAppUrl();
    const response = await fetch(getKobaraApiUrl(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
        "Idempotency-Key": randomUUID(),
      },
      body: JSON.stringify({
        amount: PAYMENT_AMOUNT,
        currency: PAYMENT_CURRENCY,
        provider: "kobara",
        description: `Adresse postale Smartcore ${registration.registration_number}`,
        customer: {
          name: `${registration.first_name} ${registration.last_name}`,
          phone: registration.whatsapp,
        },
        metadata: {
          registration_id: registration.id,
          registration_number: registration.registration_number,
          purpose: "smartcore_postal_address",
        },
        success_url: `${appUrl}/inscription/retour-paiement?registration_id=${registration.id}`,
        cancel_url: `${appUrl}/inscription?step=confirmation&payment=cancelled&registration_id=${registration.id}`,
      }),
    });

    const kobaraData = (await response.json()) as KobaraPaymentResponse;
    const payment = kobaraData.data ?? kobaraData;
    const checkoutUrl = payment.checkout_url ?? payment.checkoutUrl;
    const paymentId = payment.id ?? payment.payment_id;

    if (!response.ok || !checkoutUrl) {
      console.error("Kobara error:", kobaraData);
      return NextResponse.json({ error: "Impossible de créer le paiement Kobara." }, { status: 502 });
    }

    await supabase
      .from("registrations")
      .update({
        kobara_payment_id: paymentId ?? null,
        kobara_checkout_url: checkoutUrl,
        payment_status: "pending",
        payment_attempted_at: new Date().toISOString(),
      })
      .eq("id", registration.id);

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error("Create Kobara payment error:", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  }
}
