import { z } from "zod";
import { platforms, statuses } from "./config";
import { normalizeWhatsapp } from "./utils";

const required = "Ce champ est obligatoire.";

export const registrationSchema = z.object({
  firstName: z.string().trim().min(2, required),
  lastName: z.string().trim().min(2, required),
  email: z.string().trim().email("Adresse e-mail invalide."),
  whatsapp: z
    .string()
    .trim()
    .min(8, "Le numéro WhatsApp est trop court.")
    .transform(normalizeWhatsapp)
    .refine((value) => value.replace(/\D/g, "").length >= 8, {
      message: "Ajoutez un numéro WhatsApp valide avec indicatif.",
    }),
  gender: z.string().optional(),
  ageRange: z.string().trim().min(1, required),
  country: z.string().trim().min(2, required),
  department: z.string().trim().min(2, required),
  city: z.string().trim().min(2, required),
  occupation: z.string().trim().min(2, required),
  educationLevel: z.string().trim().min(1, required),
  hasPaymentCard: z.string().trim().min(1, required),
  hasPaypal: z.string().trim().min(1, required),
  hasUsAddress: z.string().trim().min(1, required),
  onlinePurchaseExperience: z.string().trim().min(1, required),
  platforms: z.array(z.enum(platforms)).min(1, "Sélectionnez au moins une plateforme."),
  mainGoal: z.string().trim().min(1, required),
  motivation: z
    .string()
    .trim()
    .min(10, "Expliquez brièvement votre motivation.")
    .max(500, "Maximum 500 caractères."),
  referralSource: z.string().trim().min(1, required),
  termsAccepted: z
    .boolean()
    .refine((value) => value, "Vous devez accepter les conditions de participation."),
  communicationConsent: z.boolean(),
  captchaToken: z.string().optional(),
});

export const statusSchema = z.object({
  status: z.enum(statuses),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
export type RegistrationStatus = z.infer<typeof statusSchema>["status"];

export type RegistrationRecord = {
  id: string;
  registration_number: string;
  first_name: string;
  last_name: string;
  email: string;
  whatsapp: string;
  normalized_whatsapp: string;
  gender: string | null;
  age_range: string;
  country: string;
  department: string;
  city: string;
  occupation: string;
  education_level: string;
  has_payment_card: string;
  has_paypal: string;
  has_us_address: string;
  online_purchase_experience: string;
  platforms: string[];
  main_goal: string;
  motivation: string;
  referral_source: string;
  terms_accepted: boolean;
  communication_consent: boolean;
  status: RegistrationStatus;
  confirmation_token: string;
  created_at: string;
  updated_at: string;
};
