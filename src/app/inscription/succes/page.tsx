import { Suspense } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SuccessCard } from "@/components/success-card";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ numero?: string; token?: string }>;
}) {
  const params = await searchParams;
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F3FFF8] px-4 py-28 sm:px-6">
        <Suspense>
          <SuccessCard number={params.numero ?? ""} token={params.token ?? ""} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
