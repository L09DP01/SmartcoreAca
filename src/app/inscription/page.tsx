import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { RegistrationForm } from "@/components/registration-form";

export default function InscriptionPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F5F7FA] px-4 py-28 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <section className="rounded-3xl bg-[#001E3C] p-6 text-white shadow-xl shadow-slate-900/10 sm:p-8 lg:sticky lg:top-28">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FFB800]">
              Formation gratuite
            </p>
            <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
              Inscription à Smartcore Académique
            </h1>
            <p className="mt-4 text-sm leading-7 text-blue-100 sm:text-base">
              Remplissez le formulaire pour réserver votre place. Après validation, vous recevrez votre numéro
              d’inscription et les prochaines informations par e-mail ou WhatsApp.
            </p>
            <div className="mt-6 rounded-2xl bg-white p-5 text-[#152238]">
              <h2 className="font-bold text-[#002B55]">Participation 100 % gratuite</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Prévoir uniquement 1 400 HTG pour l’acquisition de votre adresse postale personnelle utilisée pour la
                création de la carte et certaines activités pratiques. Cette somme ne représente pas des frais de
                formation.
              </p>
            </div>
          </section>
          <RegistrationForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
