export const PAYMENT_AMOUNT = 1400;
export const PAYMENT_CURRENCY = "HTG";

export function getKobaraApiUrl() {
  const url = process.env.KOBARA_API_URL;
  if (!url) {
    throw new Error("KOBARA_API_URL n’est pas configurée.");
  }
  return url;
}

export function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}
