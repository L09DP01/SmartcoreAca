import { Resend } from "resend";
import { brand } from "./config";
import type { RegistrationRecord } from "./validations";

let resend: Resend | null = null;

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!resend) resend = new Resend(apiKey);
  return resend;
}

export async function sendConfirmationEmail(registration: RegistrationRecord) {
  const client = getResend();
  if (!client) return;

  const from = process.env.EMAIL_FROM ?? `Smartcore Académique <${brand.email}>`;
  await client.emails.send({
    from,
    to: registration.email,
    subject: `Votre inscription ${registration.registration_number}`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;color:#152238;line-height:1.6">
        <h1 style="color:#002B55">Inscription réussie !</h1>
        <p>Bonjour ${registration.first_name},</p>
        <p>Votre inscription à la formation <strong>Smartcore Académique</strong> a été enregistrée avec succès.</p>
        <p><strong>Numéro d’inscription :</strong> ${registration.registration_number}</p>
        <p>La formation est gratuite. Le montant de 1 400 HTG concerne uniquement l’acquisition de l’adresse postale personnelle utilisée dans le cadre de la création de la carte et des exercices pratiques.</p>
        <p>Vous recevrez prochainement le lien du groupe WhatsApp, le calendrier des séances et les consignes importantes.</p>
      </div>
    `,
  });
}
