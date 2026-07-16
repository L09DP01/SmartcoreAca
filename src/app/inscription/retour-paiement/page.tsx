import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PaymentReturnClient } from "@/components/payment-return/payment-return-client";

export default async function PaymentReturnPage({
  searchParams,
}: {
  searchParams: Promise<{ registration_id?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F3FFF8] px-4 py-28 sm:px-6">
        {params.registration_id ? (
          <PaymentReturnClient registrationId={params.registration_id} />
        ) : (
          <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl shadow-slate-900/10">
            <h1 className="text-2xl font-black text-[#002B55]">Lien de retour invalide</h1>
            <p className="mt-3 text-slate-700">L’identifiant d’inscription est manquant.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
