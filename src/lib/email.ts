import { Resend } from "resend";
import { brand } from "./config";
import type { RegistrationRecord } from "./validations";

let resend: Resend | null = null;

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Confirmation email not sent: RESEND_API_KEY is missing.");
    return null;
  }
  if (!resend) resend = new Resend(apiKey);
  return resend;
}

function optionalLink(label: string, url?: string) {
  if (!url || url === "#") {
    return `<li><strong>${label} :</strong> sera communique prochainement.</li>`;
  }

  return `<li><strong>${label} :</strong> <a href="${url}" style="color:#002B55;font-weight:700">${url}</a></li>`;
}

export async function sendConfirmationEmail(registration: RegistrationRecord) {
  const client = getResend();
  if (!client) return false;

  const from = process.env.EMAIL_FROM ?? `Smartcore Academique <${brand.email}>`;
  const whatsappGroupUrl = process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL;
  const googleMeetUrl = process.env.NEXT_PUBLIC_GOOGLE_MEET_URL;
  const googleCalendarUrl = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_URL;

  const result = await client.emails.send({
    from,
    to: registration.email,
    subject: `Confirmation d'inscription - ${registration.registration_number}`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;color:#152238;line-height:1.6;background:#f5f7fa;padding:24px">
        <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:18px;padding:28px;border:1px solid #e5edf7">
          <p style="margin:0 0 8px;color:#16A765;font-weight:800;text-transform:uppercase;font-size:12px">Inscription confirmee</p>
          <h1 style="margin:0 0 18px;color:#002B55;font-size:28px">Smartcore Academique</h1>
          <p>Bonjour ${registration.first_name},</p>
          <p>
            Votre inscription a la formation <strong>Smartcore Academique</strong> a ete enregistree avec succes.
          </p>
          <div style="margin:22px 0;padding:18px;border-radius:14px;background:#eaf4ff;border:1px solid #cfe5ff">
            <p style="margin:0;color:#002B55;font-weight:800">Votre numero d'inscription</p>
            <p style="margin:6px 0 0;font-size:24px;font-weight:900;color:#002B55">${registration.registration_number}</p>
          </div>
          <p><strong>Nom :</strong> ${registration.first_name} ${registration.last_name}</p>
          <p><strong>Statut :</strong> ${registration.status}</p>
          <p><strong>Formation :</strong> Smartcore Academique</p>
          <h2 style="margin-top:24px;color:#002B55;font-size:18px">Liens importants</h2>
          <ul style="padding-left:18px">
            ${optionalLink("Groupe WhatsApp", whatsappGroupUrl)}
            ${optionalLink("Google Meet", googleMeetUrl)}
            ${optionalLink("Ajouter au calendrier Google", googleCalendarUrl)}
          </ul>
          <p>
            La formation est gratuite. Le montant de 1 400 HTG concerne uniquement l'acquisition de l'adresse postale
            personnelle utilisee dans le cadre de la creation de la carte et des exercices pratiques.
          </p>
          <p style="margin-top:22px;color:#475569">
            Verifiez aussi votre dossier de courriers indesirables si vous ne retrouvez pas cet e-mail.
          </p>
        </div>
      </div>
    `,
  });

  if (result.error) {
    console.error("Confirmation email failed:", result.error);
    throw new Error(result.error.message);
  }

  return true;
}
