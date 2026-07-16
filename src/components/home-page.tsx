import {
  BadgeCheck,
  BookOpen,
  Check,
  Globe2,
  GraduationCap,
  Mail,
  MessageCircle,
  ShoppingBag,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";
import { brand, faqItems, modules } from "@/lib/config";

const learnItems = [
  "Création d’entreprise",
  "Fournisseurs fiables",
  "Adresse postale",
  "Cartes et PayPal",
  "Achats en ligne",
  "Recharge et gestion",
  "Comparaison des prix",
  "Protection des achats",
];

const benefits = [
  "formation gratuite",
  "contenu pratique",
  "accompagnement",
  "démonstrations en direct",
  "exercices",
  "accès aux supports pédagogiques",
];

export function HomePage() {
  return (
    <>
      <main id="accueil">
        <section className="relative overflow-hidden bg-[#001E3C] pt-24 text-white">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] [background-size:28px_28px]" />
          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.86fr]">
              <div className="text-center lg:text-left">
                <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FFB800]">
                  Formation gratuite
                </span>
                <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:mx-0 lg:text-6xl">
                  Créez votre entreprise et achetez en ligne{" "}
                  <span className="text-[#FFB800]">en toute sécurité</span>
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-blue-50 sm:text-lg lg:mx-0">
                  Une formation pratique et complète pour apprendre à trouver des fournisseurs fiables, utiliser les
                  moyens de paiement en ligne, acheter sur les grandes plateformes internationales et protéger ses
                  transactions.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                  <Link
                    href="/inscription"
                    className="inline-flex items-center justify-center rounded-full bg-[#FFB800] px-6 py-4 text-sm font-black text-[#152238] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#f0ac00]"
                  >
                    S’inscrire gratuitement
                  </Link>
                  <Link
                    href="#programme"
                    className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Voir le programme
                  </Link>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl shadow-black/20 backdrop-blur">
                  <div className="rounded-2xl bg-[#002B55] p-5">
                    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FFB800]">
                          Parcours pratique
                        </p>
                        <p className="mt-2 text-xl font-black">E-commerce & paiements</p>
                      </div>
                      <ShoppingBag className="text-[#FFB800]" size={34} />
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {learnItems.slice(0, 6).map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-3 text-sm font-semibold text-blue-50"
                        >
                          <Check className="shrink-0 text-[#16A765]" size={17} /> {item}
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 rounded-2xl border border-[#FFB800]/40 bg-[#FFB800]/10 p-4">
                      <p className="text-sm font-bold text-[#FFB800]">Participation 100 % gratuite</p>
                      <p className="mt-2 text-xs leading-6 text-blue-50">
                        Les 1 400 HTG concernent uniquement l’adresse postale personnelle utilisée pour certaines
                        activités pratiques.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <HeroPill icon={<Video />} title="Formation en ligne" text="Google Meet" />
              <HeroPill icon={<MessageCircle />} title="Groupe et support" text="WhatsApp" />
              <HeroPill icon={<Users />} title="Places limitées" text="Inscription obligatoire" />
            </div>
          </div>
        </section>

        <section id="apropos" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-[#16A765]">À propos de la formation</p>
                <h2 className="mt-3 text-3xl font-black text-[#002B55] sm:text-4xl">
                  Une base pratique pour entreprendre et acheter avec méthode.
                </h2>
              </div>
              <p className="text-base leading-8 text-slate-700">
                Smartcore Académique propose une formation pratique pour aider les participants à comprendre le commerce
                électronique, les fournisseurs, les paiements et la sécurité des achats. Le parcours met l’accent sur les
                démonstrations, les décisions concrètes et la protection des transactions.
              </p>
            </div>
          </div>
        </section>

        <section id="programme" className="bg-[#F5F7FA] py-20">
          <SectionTitle eyebrow="Programme" title="Neuf modules structurés pour passer de l’idée à la pratique." />
          <div className="mx-auto mt-10 grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
            {modules.map((module, index) => (
              <article key={module} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#002B55]">
                  <BookOpen size={22} />
                </div>
                <h3 className="text-lg font-bold text-[#002B55]">Module {index + 1}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{module}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white py-20">
          <SectionTitle eyebrow="Déroulement" title="Un parcours simple, accompagné et organisé." />
          <div className="mx-auto mt-10 grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {[
              ["Inscription en ligne", "Complétez le formulaire et validez vos informations."],
              ["Confirmation par e-mail", "Recevez votre numéro et les premières consignes."],
              ["Ajout au groupe WhatsApp", "Suivez les annonces et l’accompagnement."],
              ["Cours sur Google Meet", "Participez aux séances et aux exercices pratiques."],
            ].map(([title, text], index) => (
              <article key={title} className="rounded-2xl border border-slate-200 p-6">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#002B55] text-sm font-black text-white">
                  {index + 1}
                </div>
                <h3 className="font-bold text-[#002B55]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="avantages" className="bg-[#EAF4FF] py-20">
          <SectionTitle eyebrow="Pourquoi participer ?" title="Une formation accessible, concrète et orientée action." />
          <div className="mx-auto mt-10 grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 rounded-2xl bg-white p-5 font-semibold text-[#152238] shadow-sm"
              >
                <BadgeCheck className="text-[#16A765]" /> {benefit}
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="bg-white py-20">
          <SectionTitle eyebrow="FAQ" title="Réponses aux questions fréquentes." />
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 px-4 sm:px-6 lg:px-8">
            {faqItems.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-slate-200 p-5">
                <summary className="cursor-pointer list-none text-base font-bold text-[#002B55]">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="bg-[#001E3C] py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#FFB800]">Contact</p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">Besoin d’une précision ?</h2>
              <p className="mt-4 max-w-xl text-blue-100">{brand.supportHours}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <ContactLink icon={<MessageCircle />} href={brand.whatsappUrl} label="WhatsApp" />
              <ContactLink icon={<Mail />} href={`mailto:${brand.email}`} label={brand.email} />
              <ContactLink icon={<Globe2 />} href={brand.facebookUrl} label="Facebook" />
              <ContactLink icon={<GraduationCap />} href={brand.instagramUrl} label="Instagram" />
              <ContactLink icon={<ShoppingBag />} href={brand.tiktokUrl} label="TikTok" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function HeroPill({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <div className="mb-3 text-[#FFB800]">{icon}</div>
      <p className="text-sm font-bold">{title}</p>
      <p className="mt-1 text-xs text-blue-100">{text}</p>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-wide text-[#16A765]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black text-[#002B55] sm:text-4xl">{title}</h2>
    </div>
  );
}

function ContactLink({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-bold text-white transition hover:bg-white/15"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
