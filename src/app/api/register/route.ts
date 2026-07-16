import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { sendConfirmationEmail } from "@/lib/email";
import { getSupabaseAdmin } from "@/lib/supabase";
import { registrationSchema } from "@/lib/validations";

async function verifyTurnstile(token?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!secret || !siteKey) return true;
  if (!token) return false;

  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const result = (await response.json()) as { success?: boolean };
  return Boolean(result.success);
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = registrationSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Veuillez corriger les champs indiqués.", errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const captchaOk = await verifyTurnstile(parsed.data.captchaToken);
    if (!captchaOk) {
      return NextResponse.json({ message: "La vérification anti-spam a échoué." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const normalizedWhatsapp = parsed.data.whatsapp;

    const { data: duplicate, error: duplicateError } = await supabase
      .from("registrations")
      .select("registration_number")
      .or(`email.eq.${parsed.data.email.toLowerCase()},normalized_whatsapp.eq.${normalizedWhatsapp}`)
      .maybeSingle();

    if (duplicateError) throw duplicateError;
    if (duplicate) {
      return NextResponse.json(
        {
          message: "Une inscription existe déjà avec cet e-mail ou ce numéro WhatsApp.",
          registrationNumber: duplicate.registration_number,
        },
        { status: 409 },
      );
    }

    const { data: numberData, error: numberError } = await supabase.rpc("generate_registration_number");
    if (numberError) throw numberError;

    const confirmationToken = randomBytes(24).toString("hex");
    const { data: registration, error: insertError } = await supabase
      .from("registrations")
      .insert({
        registration_number: numberData,
        first_name: parsed.data.firstName,
        last_name: parsed.data.lastName,
        email: parsed.data.email.toLowerCase(),
        whatsapp: parsed.data.whatsapp,
        normalized_whatsapp: normalizedWhatsapp,
        gender: parsed.data.gender || null,
        age_range: parsed.data.ageRange,
        country: parsed.data.country,
        department: parsed.data.department,
        city: parsed.data.city,
        occupation: parsed.data.occupation,
        education_level: parsed.data.educationLevel,
        has_payment_card: parsed.data.hasPaymentCard,
        has_paypal: parsed.data.hasPaypal,
        has_us_address: parsed.data.hasUsAddress,
        online_purchase_experience: parsed.data.onlinePurchaseExperience,
        platforms: parsed.data.platforms,
        main_goal: parsed.data.mainGoal,
        motivation: parsed.data.motivation,
        referral_source: parsed.data.referralSource,
        terms_accepted: parsed.data.termsAccepted,
        communication_consent: parsed.data.communicationConsent,
        status: "En attente",
        confirmation_token: confirmationToken,
      })
      .select("*")
      .single();

    if (insertError) throw insertError;

    await sendConfirmationEmail(registration);

    return NextResponse.json({
      registrationNumber: registration.registration_number,
      token: registration.confirmation_token,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Une erreur est survenue.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
