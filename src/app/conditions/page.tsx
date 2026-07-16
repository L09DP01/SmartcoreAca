import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function ConditionsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-32 sm:px-6">
        <h1 className="text-4xl font-black text-[#002B55]">Conditions de participation</h1>
        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-700">
          <p>
            La formation Smartcore Académique est gratuite. L’inscription permet de réserver une place et de recevoir les
            informations liées au calendrier, au groupe WhatsApp et aux séances en ligne.
          </p>
          <p>
            Les participants doivent fournir des informations exactes. L’équipe peut contacter un participant pour vérifier
            ou compléter les informations nécessaires à l’organisation de la formation.
          </p>
          <p>
            Le montant de 1 400 HTG concerne uniquement l’acquisition de l’adresse postale personnelle utilisée pour la
            création de la carte et certaines activités pratiques. Ce montant ne constitue pas des frais de formation.
          </p>
          <p>
            La formation ne garantit pas l’obtention automatique d’une carte, d’un compte PayPal ou d’un service tiers.
            Chaque prestataire applique ses propres conditions d’éligibilité et de vérification.
          </p>
          <h2 id="mentions" className="pt-6 text-2xl font-black text-[#002B55]">Mentions légales</h2>
          <p>
            Smartcore Académique édite cette page d’inscription afin de gérer les candidatures à la formation et la
            communication avec les participants.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
