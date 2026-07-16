"use client";

import { CheckCircle2, Loader2, RefreshCcw, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type PaymentStatusResponse = {
  paymentStatus?: "not_paid" | "pending" | "paid" | "failed" | "cancelled";
  amountPaid?: number;
  error?: string;
};

const STORAGE_KEY = "smartcore-academique-registration-draft";

export function PaymentReturnClient({ registrationId }: { registrationId: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<PaymentStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");

  const loadStatus = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/registrations/${registrationId}/payment-status`);
      const result = (await response.json()) as PaymentStatusResponse;
      if (!response.ok) {
        setError(result.error ?? "Impossible de vérifier le paiement.");
        return;
      }
      setStatus(result);
    } catch {
      setError("La vérification a échoué. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }, [registrationId]);

  async function confirmRegistration() {
    setConfirming(true);
    setError("");
    try {
      const response = await fetch(`/api/registrations/${registrationId}/confirm`, {
        method: "POST",
      });
      const result = (await response.json()) as {
        registrationNumber?: string;
        token?: string;
        error?: string;
      };
      if (!response.ok) {
        setError(result.error ?? "Impossible de confirmer l’inscription.");
        return;
      }
      window.localStorage.removeItem(STORAGE_KEY);
      router.push(
        `/inscription/succes?numero=${encodeURIComponent(result.registrationNumber ?? "")}&token=${encodeURIComponent(
          result.token ?? "",
        )}`,
      );
    } catch {
      setError("La confirmation a échoué. Veuillez réessayer.");
    } finally {
      setConfirming(false);
    }
  }

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadStatus();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [loadStatus]);

  return (
    <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 text-center shadow-xl shadow-slate-900/10 sm:p-10">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF4FF] text-[#002B55]">
        {loading ? <Loader2 className="animate-spin" size={32} /> : <CheckCircle2 size={32} />}
      </div>
      <h1 className="mt-6 text-3xl font-black text-[#002B55]">Retour de paiement</h1>

      {loading ? (
        <p className="mt-3 text-slate-700">Vérification du statut réel du paiement...</p>
      ) : null}

      {!loading && status?.paymentStatus === "paid" ? (
        <div className="mt-6 rounded-2xl bg-[#16A765]/10 p-5 text-left">
          <p className="text-lg font-black text-[#16A765]">✓ Paiement confirmé</p>
          <p className="mt-2 text-sm text-[#152238]">Montant payé : {status.amountPaid ?? 1400} HTG</p>
          <p className="mt-1 text-sm text-[#152238]">Statut : Payé</p>
        </div>
      ) : null}

      {!loading && status?.paymentStatus === "pending" ? (
        <div className="mt-6 rounded-2xl bg-[#FFB800]/10 p-5 text-left text-[#152238]">
          <p className="font-bold">Votre paiement est en cours de vérification.</p>
          <p className="mt-2 text-sm leading-6">
            Si vous venez de payer, attendez quelques instants puis vérifiez à nouveau.
          </p>
        </div>
      ) : null}

      {!loading && status?.paymentStatus && status.paymentStatus !== "paid" && status.paymentStatus !== "pending" ? (
        <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-left text-[#152238]">
          <p className="font-bold">Paiement non confirmé.</p>
          <p className="mt-2 text-sm leading-6">
            Vous pouvez confirmer votre inscription sans payer maintenant. La formation reste gratuite.
          </p>
        </div>
      ) : null}

      {error ? <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
        {status?.paymentStatus === "pending" ? (
          <button
            type="button"
            onClick={loadStatus}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-[#002B55]"
          >
            <RefreshCcw size={18} /> Vérifier à nouveau
          </button>
        ) : null}
        <button
          type="button"
          onClick={confirmRegistration}
          disabled={confirming || loading}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#002B55] px-5 py-3 text-sm font-bold text-white disabled:opacity-60"
        >
          {confirming ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
          Confirmer mon inscription
        </button>
      </div>
    </div>
  );
}
