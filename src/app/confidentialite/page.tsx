import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-32 sm:px-6">
        <h1 className="text-4xl font-black text-[#002B55]">Politique de confidentialité</h1>
        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-700">
          <p>
            Les informations collectées servent à gérer les inscriptions, contacter les participants, organiser les séances
            et transmettre les consignes liées à la formation.
          </p>
          <p>
            Les données peuvent inclure le nom, le prénom, l’e-mail, le numéro WhatsApp, la ville, le niveau d’études,
            l’expérience d’achat en ligne, les plateformes d’intérêt et l’objectif principal.
          </p>
          <p>
            L’accès aux inscriptions est réservé aux administrateurs autorisés. Les données ne doivent pas être publiées ni
            revendues.
          </p>
          <p>
            Un participant peut contacter Smartcore Académique pour demander une correction ou une suppression de ses
            informations lorsque cela est compatible avec les besoins d’organisation de la formation.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
