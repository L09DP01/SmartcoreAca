"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { platforms } from "@/lib/config";
import { registrationSchema, type RegistrationInput } from "@/lib/validations";
import { Field, inputClass } from "./field";

const stepFields: Array<Array<keyof RegistrationInput>> = [
  [
    "firstName",
    "lastName",
    "email",
    "whatsapp",
    "ageRange",
    "country",
    "department",
    "city",
    "occupation",
    "educationLevel",
  ],
  [
    "hasPaymentCard",
    "hasPaypal",
    "hasUsAddress",
    "onlinePurchaseExperience",
    "platforms",
    "mainGoal",
    "motivation",
    "referralSource",
    "termsAccepted",
  ],
  [],
];

const selectPlaceholder = "Sélectionner";

export function RegistrationForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      whatsapp: "",
      gender: "",
      ageRange: "",
      country: "Haïti",
      department: "",
      city: "",
      occupation: "",
      educationLevel: "",
      hasPaymentCard: "",
      hasPaypal: "",
      hasUsAddress: "",
      onlinePurchaseExperience: "",
      platforms: [],
      mainGoal: "",
      motivation: "",
      referralSource: "",
      termsAccepted: false,
      communicationConsent: true,
    },
  });

  const values = useWatch({ control });
  const progress = useMemo(() => `${((step + 1) / 3) * 100}%`, [step]);

  async function nextStep() {
    const valid = await trigger(stepFields[step], { shouldFocus: true });
    if (valid) setStep((current) => Math.min(current + 1, 2));
  }

  async function submit(data: RegistrationInput) {
    setSubmitting(true);
    setServerError("");
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as {
        message?: string;
        registrationNumber?: string;
        token?: string;
      };
      if (!response.ok) {
        setServerError(result.message ?? "Impossible d’enregistrer l’inscription.");
        return;
      }
      router.push(`/inscription/succes?numero=${encodeURIComponent(
        result.registrationNumber ?? "",
      )}&token=${encodeURIComponent(result.token ?? "")}`);
    } catch {
      setServerError("La connexion a échoué. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="inscription" className="rounded-2xl bg-white p-5 shadow-xl shadow-slate-900/10 sm:p-7">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-wide text-[#16A765]">Inscription gratuite</p>
        <h2 className="mt-2 text-2xl font-bold text-[#002B55]">Réservez votre place</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Remplissez le formulaire ci-dessous. Les champs obligatoires sont validés avant l’envoi.
        </p>
      </div>

      <div aria-label="Progression du formulaire" className="mb-6">
        <div className="mb-3 flex justify-between text-xs font-semibold text-slate-600">
          {["Informations", "Objectifs", "Confirmation"].map((label, index) => (
            <span key={label} className={index <= step ? "text-[#002B55]" : ""}>
              {index + 1}. {label}
            </span>
          ))}
        </div>
        <div className="h-2 rounded-full bg-slate-100">
          <div className="h-2 rounded-full bg-[#FFB800] transition-all" style={{ width: progress }} />
        </div>
      </div>

      <form onSubmit={handleSubmit(submit)} noValidate>
        <div className="max-h-[560px] overflow-y-auto pr-1 sm:max-h-[620px] lg:max-h-[68vh]">
        {step === 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nom" htmlFor="lastName" error={errors.lastName}>
              <input id="lastName" className={inputClass} {...register("lastName")} />
            </Field>
            <Field label="Prénom" htmlFor="firstName" error={errors.firstName}>
              <input id="firstName" className={inputClass} {...register("firstName")} />
            </Field>
            <Field label="Adresse e-mail" htmlFor="email" error={errors.email}>
              <input id="email" type="email" className={inputClass} {...register("email")} />
            </Field>
            <Field label="Numéro WhatsApp avec indicatif" htmlFor="whatsapp" error={errors.whatsapp}>
              <input id="whatsapp" placeholder="+509..." className={inputClass} {...register("whatsapp")} />
            </Field>
            <Field label="Sexe (facultatif)" htmlFor="gender" error={errors.gender}>
              <select id="gender" className={inputClass} {...register("gender")}>
                <option value="">Non précisé</option>
                <option value="Femme">Femme</option>
                <option value="Homme">Homme</option>
                <option value="Autre">Autre</option>
              </select>
            </Field>
            <Field label="Date de naissance ou tranche d’âge" htmlFor="ageRange" error={errors.ageRange}>
              <select id="ageRange" className={inputClass} {...register("ageRange")}>
                <option value="">{selectPlaceholder}</option>
                <option value="Moins de 18 ans">Moins de 18 ans</option>
                <option value="18-24 ans">18-24 ans</option>
                <option value="25-34 ans">25-34 ans</option>
                <option value="35-44 ans">35-44 ans</option>
                <option value="45 ans et plus">45 ans et plus</option>
              </select>
            </Field>
            <Field label="Pays" htmlFor="country" error={errors.country}>
              <input id="country" className={inputClass} {...register("country")} />
            </Field>
            <Field label="Département ou région" htmlFor="department" error={errors.department}>
              <input id="department" className={inputClass} {...register("department")} />
            </Field>
            <Field label="Commune ou ville" htmlFor="city" error={errors.city}>
              <input id="city" className={inputClass} {...register("city")} />
            </Field>
            <Field label="Profession ou occupation actuelle" htmlFor="occupation" error={errors.occupation}>
              <input id="occupation" className={inputClass} {...register("occupation")} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Niveau d’études" htmlFor="educationLevel" error={errors.educationLevel}>
                <select id="educationLevel" className={inputClass} {...register("educationLevel")}>
                  <option value="">{selectPlaceholder}</option>
                  <option value="Secondaire">Secondaire</option>
                  <option value="Technique ou professionnel">Technique ou professionnel</option>
                  <option value="Universitaire">Universitaire</option>
                  <option value="Autre">Autre</option>
                </select>
              </Field>
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="space-y-5">
            <RadioGroup label="Possédez-vous déjà une carte de paiement ?" name="hasPaymentCard" register={register} error={errors.hasPaymentCard?.message} options={["Oui", "Non", "En cours de création"]} />
            <RadioGroup label="Possédez-vous déjà un compte PayPal ?" name="hasPaypal" register={register} error={errors.hasPaypal?.message} options={["Oui", "Non", "Je souhaite apprendre à en créer un"]} />
            <RadioGroup label="Possédez-vous déjà une adresse postale ?" name="hasUsAddress" register={register} error={errors.hasUsAddress?.message} options={["Oui", "Non", "Je souhaite en obtenir une"]} />
            <RadioGroup label="Avez-vous déjà acheté en ligne ?" name="onlinePurchaseExperience" register={register} error={errors.onlinePurchaseExperience?.message} options={["Jamais", "Une ou deux fois", "Régulièrement"]} />

            <fieldset>
              <legend className="mb-3 text-sm font-semibold text-[#152238]">Quelles plateformes souhaitez-vous apprendre à utiliser ?</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {platforms.map((platform) => (
                  <label
                    key={platform}
                    className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-[#152238]"
                  >
                    <input type="checkbox" value={platform} className="h-4 w-4 accent-[#002B55]" {...register("platforms")} />
                    <span>{platform}</span>
                  </label>
                ))}
              </div>
              {errors.platforms ? <p className="mt-2 text-sm font-medium text-red-700">{errors.platforms.message}</p> : null}
            </fieldset>

            <RadioGroup label="Quel est votre objectif principal ?" name="mainGoal" register={register} error={errors.mainGoal?.message} options={["Créer une entreprise", "Acheter pour moi-même", "Acheter pour revendre", "Trouver des fournisseurs", "Apprendre les paiements en ligne", "Développer une activité existante"]} />
            <Field label="Pourquoi souhaitez-vous suivre cette formation ?" htmlFor="motivation" error={errors.motivation}>
              <textarea id="motivation" rows={5} maxLength={500} className={inputClass} {...register("motivation")} />
            </Field>
            <RadioGroup label="Comment avez-vous découvert Smartcore Académique ?" name="referralSource" register={register} error={errors.referralSource?.message} options={["WhatsApp", "Facebook", "Instagram", "TikTok", "Ami ou proche", "Smartcore Express", "Autre"]} />

            <label className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              <input type="checkbox" className="mt-1 h-4 w-4 accent-[#002B55]" {...register("termsAccepted")} />
              <span>J’accepte les conditions de participation et je confirme que les informations fournies sont exactes.</span>
            </label>
            {errors.termsAccepted ? <p className="text-sm font-medium text-red-700">{errors.termsAccepted.message}</p> : null}
            <label className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 text-sm text-slate-700">
              <input type="checkbox" className="mt-1 h-4 w-4 accent-[#002B55]" {...register("communicationConsent")} />
              <span>J’autorise Smartcore Académique à m’envoyer des informations relatives à la formation par WhatsApp et par e-mail.</span>
            </label>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-5">
            <div className="rounded-xl border border-[#EAF4FF] bg-[#F5F7FA] p-4">
              <h3 className="flex items-center gap-2 text-lg font-bold text-[#002B55]">
                <CheckCircle2 className="text-[#16A765]" size={22} /> Récapitulatif
              </h3>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <Summary label="Nom complet" value={`${values.firstName ?? ""} ${values.lastName ?? ""}`} />
                <Summary label="E-mail" value={values.email} />
                <Summary label="WhatsApp" value={values.whatsapp} />
                <Summary label="Ville" value={values.city} />
                <Summary label="Niveau d’expérience" value={values.onlinePurchaseExperience} />
                <Summary label="Objectif principal" value={values.mainGoal} />
                <div className="sm:col-span-2">
                  <Summary label="Plateformes sélectionnées" value={(values.platforms ?? []).join(", ")} />
                </div>
              </dl>
            </div>
            <div className="rounded-xl border border-[#16A765]/30 bg-[#16A765]/10 p-4 text-sm leading-6 text-[#152238]">
              <strong>Notice :</strong> La formation est gratuite. Le montant de 1 400 HTG concerne uniquement
              l’acquisition de l’adresse postale personnelle utilisée dans le cadre de la création de la carte et des
              exercices pratiques.
            </div>
            {serverError ? (
              <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700" role="alert">
                {serverError}
              </p>
            ) : null}
          </div>
        ) : null}
        </div>

        <div className="sticky bottom-0 -mx-5 mt-5 flex flex-col gap-3 border-t border-slate-100 bg-white px-5 pt-4 sm:-mx-7 sm:flex-row sm:justify-between sm:px-7">
          {step > 0 ? (
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-[#002B55] transition hover:bg-slate-50"
              onClick={() => setStep((current) => Math.max(current - 1, 0))}
            >
              <ArrowLeft size={18} /> Précédent
            </button>
          ) : <span />}
          {step < 2 ? (
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFB800] px-6 py-3 text-sm font-bold text-[#152238] transition hover:bg-[#f0ac00]"
              onClick={nextStep}
            >
              {step === 0 ? "Suivant" : "Suivant : Confirmation"} <ArrowRight size={18} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#002B55] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#001E3C] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
              {submitting ? "Envoi en cours..." : "Confirmer mon inscription"}
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

function RadioGroup({
  label,
  name,
  options,
  register,
  error,
}: {
  label: string;
  name: keyof RegistrationInput;
  options: string[];
  register: ReturnType<typeof useForm<RegistrationInput>>["register"];
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-[#152238]">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-[#152238]"
          >
            <input type="radio" value={option} className="h-4 w-4 accent-[#002B55]" {...register(name)} />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {error ? <p className="mt-2 text-sm font-medium text-red-700">{error}</p> : null}
    </fieldset>
  );
}

function Summary({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 font-semibold text-[#152238]">{value || "Non renseigné"}</dd>
    </div>
  );
}
