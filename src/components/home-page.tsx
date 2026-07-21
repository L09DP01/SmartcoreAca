import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  CreditCard,
  Globe2,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  PackageSearch,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { brand, faqItems, modules } from "@/lib/config";

const learnItems = [
  "Creation d'entreprise",
  "Fournisseurs fiables",
  "Adresse postale",
  "Cartes et PayPal",
  "Achats en ligne",
  "Recharge et gestion",
  "Comparaison des prix",
  "Protection des achats",
];

const benefits = [
  ["Formation gratuite", "Un parcours ouvert aux jeunes entrepreneurs, sans frais de formation."],
  ["Contenu pratique", "Des demonstrations, des choix concrets et des exercices applicables."],
  ["Accompagnement", "Un suivi via WhatsApp pour rester informe et bien prepare."],
  ["Securite des achats", "Des reflexes pour comparer, verifier et proteger vos transactions."],
  ["Supports pedagogiques", "Des reperes clairs pour reviser les notions importantes."],
  ["Approche entrepreneuriale", "Une base utile pour acheter, revendre ou structurer une activite."],
];

const flow = [
  ["Inscription en ligne", "Remplissez le formulaire et validez vos informations."],
  ["Confirmation par e-mail", "Recevez votre numero d'inscription et les liens importants."],
  ["Groupe WhatsApp", "Suivez les annonces, les rappels et les consignes pratiques."],
  ["Sessions Google Meet", "Participez aux cours en ligne et aux exercices guides."],
];

const featureCards = [
  {
    icon: PackageSearch,
    title: "Sourcing",
    text: "Identifier des fournisseurs fiables et comparer les opportunites.",
  },
  {
    icon: CreditCard,
    title: "Paiements",
    text: "Comprendre les cartes, PayPal, les recharges et les precautions.",
  },
  {
    icon: ShieldCheck,
    title: "Protection",
    text: "Verifier les vendeurs, les prix, les delais et les garanties.",
  },
];

export function HomePage() {
  return (
    <main id="accueil" className="bg-white">
      <section className="relative isolate overflow-hidden bg-[#001E3C] pt-24 text-white">
        <div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] [background-size:26px_26px]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#FFB800]/35 bg-[#FFB800]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#FFB800]">
              <Sparkles size={15} /> Formation gratuite
            </span>

            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
              Creez votre entreprise et achetez en ligne{" "}
              <span className="text-[#FFB800]">en toute securite</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-blue-50 sm:text-lg">
              Une formation pratique pour apprendre a trouver des fournisseurs fiables, utiliser les moyens de paiement
              en ligne, acheter sur les grandes plateformes internationales et proteger vos transactions.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/inscription"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFB800] px-6 py-4 text-sm font-black text-[#152238] shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#f0ac00]"
              >
                S&apos;inscrire gratuitement <ArrowRight size={18} />
              </Link>
              <Link
                href="#programme"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Explorer le programme <ChevronRight size={18} />
              </Link>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              <HeroPill icon={<Video />} title="Formation en ligne" text="Google Meet" />
              <HeroPill icon={<MessageCircle />} title="Support" text="WhatsApp" />
              <HeroPill icon={<Users />} title="Acces" text="Inscription obligatoire" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-12 top-8 hidden h-56 w-56 rounded-full border border-[#FFB800]/20 lg:block" />
            <div className="relative rounded-[2rem] border border-white/15 bg-white/[0.08] p-4 shadow-2xl shadow-black/25 backdrop-blur">
              <div className="rounded-[1.5rem] bg-white p-4 text-[#152238] shadow-xl">
                <div className="overflow-hidden rounded-2xl bg-[#F5F7FA]">
                  <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#16A765]">Smartcore Lab</p>
                      <p className="mt-1 text-lg font-black text-[#002B55]">Commerce en ligne</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#002B55]">
                      <Image src="/brand/icon.png" alt="" width={34} height={34} className="h-8 w-8 object-contain" />
                    </div>
                  </div>

                  <div className="grid gap-4 p-5 sm:grid-cols-[0.9fr_1.1fr]">
                    <div className="rounded-2xl bg-[#002B55] p-4 text-white">
                      <ShoppingBag className="text-[#FFB800]" size={28} />
                      <p className="mt-5 text-sm font-bold text-blue-100">Plateformes abordees</p>
                      <p className="mt-2 text-2xl font-black">Amazon, eBay, SHEIN, Temu...</p>
                    </div>
                    <div className="space-y-3">
                      {featureCards.map((card) => {
                        const Icon = card.icon;
                        return (
                          <div key={card.title} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                            <div className="flex gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#002B55]">
                                <Icon size={20} />
                              </div>
                              <div>
                                <p className="font-black text-[#002B55]">{card.title}</p>
                                <p className="mt-1 text-xs leading-5 text-slate-600">{card.text}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t border-slate-200 bg-white p-5">
                    <p className="text-sm font-black text-[#002B55]">Participation 100 % gratuite</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Prevoir uniquement 1 400 HTG pour l&apos;acquisition de votre adresse postale personnelle utilisee pour
                      la carte et les activites pratiques. Ce ne sont pas des frais de formation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["Formation 100 % gratuite", "Sessions en ligne", "Accompagnement WhatsApp", "Exercices pratiques"].map(
              (item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <Check className="text-[#16A765]" size={22} />
                  <p className="mt-4 font-black text-[#002B55]">{item}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section id="apropos" className="bg-[#F5F7FA] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#16A765]">A propos de la formation</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#002B55] sm:text-4xl">
              Un parcours clair pour comprendre, comparer et acheter avec methode.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-slate-700">
            <p>
              Smartcore Academique aide les participants a comprendre les bases du commerce electronique, la recherche
              de fournisseurs, les moyens de paiement et les reflexes de securite indispensables avant d&apos;acheter en
              ligne.
            </p>
            <p>
              La formation met l&apos;accent sur des demonstrations, des decisions concretes et une progression accessible
              aux personnes qui veulent entreprendre, acheter pour elles-memes ou developper une activite.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <SectionTitle eyebrow="Ce que vous allez apprendre" title="Les competences essentielles pour passer a l'action." />
        <div className="mx-auto mt-10 grid max-w-7xl gap-3 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {learnItems.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#16A765]/10 text-[#16A765]">
                <Check size={18} />
              </div>
              <p className="font-bold text-[#152238]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="programme" className="bg-[#001E3C] py-20 text-white">
        <SectionTitle
          eyebrow="Programme"
          title="Neuf modules structures pour construire une base solide."
          dark
        />
        <div className="mx-auto mt-10 grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {modules.map((module, index) => (
            <article key={module} className="rounded-2xl border border-white/10 bg-white/[0.07] p-6 shadow-sm">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFB800] text-[#152238]">
                <BookOpen size={22} />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-100">Module {index + 1}</p>
              <h3 className="mt-2 text-lg font-black text-white">{module}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <SectionTitle eyebrow="Deroulement" title="Une experience simple, guidee et organisee." />
        <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-4">
            {flow.map(([title, text], index) => (
              <article key={title} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-[#002B55] text-sm font-black text-white">
                  {index + 1}
                </div>
                <h3 className="font-black text-[#002B55]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="avantages" className="bg-[#EAF4FF] py-20">
        <SectionTitle eyebrow="Pourquoi participer ?" title="Un cadre gratuit, pratique et rassurant." />
        <div className="mx-auto mt-10 grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {benefits.map(([title, text]) => (
            <article key={title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <BadgeCheck className="text-[#16A765]" size={26} />
              <h3 className="mt-5 text-lg font-black text-[#002B55]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="rounded-[2rem] bg-[#002B55] p-8 text-white shadow-xl shadow-slate-900/10">
            <p className="text-sm font-black uppercase tracking-wide text-[#FFB800]">Participation</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">La formation reste gratuite.</h2>
            <p className="mt-5 text-sm leading-7 text-blue-50">
              Les 1 400 HTG concernent uniquement l&apos;adresse postale personnelle utilisee dans le cadre de la creation de
              la carte et de certaines activites pratiques. Cette somme ne represente pas des frais de formation.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoTile icon={<CalendarDays />} title="Calendrier" text="Les seances et les liens sont communiques apres inscription." />
            <InfoTile icon={<Video />} title="Google Meet" text="Les sessions se deroulent en ligne avec demonstrations." />
            <InfoTile icon={<MessageCircle />} title="WhatsApp" text="Le groupe sert aux annonces et au suivi." />
            <InfoTile icon={<MapPin />} title="Adresse postale" text="Elle sert aux exercices lies a la carte et aux achats." />
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#F5F7FA] py-20">
        <SectionTitle eyebrow="FAQ" title="Reponses aux questions frequentes." />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 px-4 sm:px-6 lg:px-8">
          {faqItems.map((item) => (
            <details key={item.question} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <summary className="cursor-pointer list-none text-base font-black text-[#002B55]">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-700">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-[#001E3C] py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#FFB800]">Contact</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Besoin d&apos;une precision ?</h2>
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
  );
}

function HeroPill({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
      <div className="mb-3 text-[#FFB800]">{icon}</div>
      <p className="text-sm font-black">{title}</p>
      <p className="mt-1 text-xs text-blue-100">{text}</p>
    </div>
  );
}

function InfoTile({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#002B55]">
        {icon}
      </div>
      <h3 className="font-black text-[#002B55]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
    </div>
  );
}

function SectionTitle({ eyebrow, title, dark = false }: { eyebrow: string; title: string; dark?: boolean }) {
  return (
    <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
      <p className={`text-sm font-black uppercase tracking-wide ${dark ? "text-[#FFB800]" : "text-[#16A765]"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-3 text-3xl font-black tracking-tight sm:text-4xl ${dark ? "text-white" : "text-[#002B55]"}`}>
        {title}
      </h2>
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
