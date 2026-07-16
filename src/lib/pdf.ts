import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { brand } from "./config";
import { formatDateTime } from "./utils";
import type { RegistrationRecord } from "./validations";

export async function createConfirmationPdf(registration: RegistrationRecord) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);

  const navy = rgb(0, 0.17, 0.33);
  const gold = rgb(1, 0.72, 0);
  const text = rgb(0.08, 0.13, 0.22);
  const green = rgb(0.09, 0.65, 0.4);

  page.drawRectangle({ x: 0, y: 760, width: 595.28, height: 82, color: navy });
  page.drawText(brand.name, { x: 48, y: 800, size: 24, font: bold, color: rgb(1, 1, 1) });
  page.drawText(brand.slogan, { x: 48, y: 779, size: 11, font: regular, color: gold });

  page.drawText("Confirmation d’inscription", { x: 48, y: 710, size: 26, font: bold, color: navy });
  page.drawText("Formation gratuite Smartcore Académique", { x: 48, y: 684, size: 13, font: regular, color: text });

  const rows = [
    ["Participant", `${registration.first_name} ${registration.last_name}`],
    ["Numéro d’inscription", registration.registration_number],
    ["Date d’inscription", formatDateTime(registration.created_at)],
    ["Formation", brand.courseName],
    ["Statut", registration.status],
    ["E-mail", registration.email],
    ["WhatsApp", registration.whatsapp],
  ];

  let y = 622;
  rows.forEach(([label, value]) => {
    page.drawText(label, { x: 62, y, size: 11, font: bold, color: navy });
    page.drawText(value, { x: 230, y, size: 11, font: regular, color: text });
    y -= 34;
  });

  page.drawRectangle({ x: 48, y: 225, width: 499, height: 74, borderColor: green, borderWidth: 1.2 });
  page.drawText("Note importante", { x: 66, y: 270, size: 12, font: bold, color: green });
  page.drawText("La formation est gratuite. Les 1 400 HTG concernent uniquement l’adresse", {
    x: 66,
    y: 250,
    size: 10,
    font: regular,
    color: text,
  });
  page.drawText("postale personnelle utilisée pour la carte et les activités pratiques.", {
    x: 66,
    y: 235,
    size: 10,
    font: regular,
    color: text,
  });

  page.drawText("Coordonnées", { x: 48, y: 160, size: 13, font: bold, color: navy });
  page.drawText(`${brand.email} | ${brand.supportHours}`, { x: 48, y: 140, size: 10, font: regular, color: text });
  page.drawText("© 2026 Smartcore Académique. Tous droits réservés.", {
    x: 48,
    y: 64,
    size: 9,
    font: regular,
    color: rgb(0.36, 0.4, 0.48),
  });

  return pdf.save();
}
