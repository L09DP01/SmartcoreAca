"use client";

import { Download, FileDown, RefreshCcw, Search, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { statuses } from "@/lib/config";
import { formatDateTime } from "@/lib/utils";
import type { RegistrationRecord, RegistrationStatus } from "@/lib/validations";
import { inputClass } from "./field";

const paymentLabels: Record<string, string> = {
  not_paid: "Non payé",
  pending: "En attente",
  paid: "Payé",
  failed: "Échoué",
  cancelled: "Annulé",
};

const registrationLabels: Record<string, string> = {
  draft: "Brouillon",
  confirmed: "Confirmée",
};

export function AdminDashboard({ initialRegistrations }: { initialRegistrations: RegistrationRecord[] }) {
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const stats = useMemo(() => {
    return {
      total: registrations.length,
      confirmed: registrations.filter((item) => item.registration_status === "confirmed").length,
      pending: registrations.filter((item) => item.status === "En attente").length,
      paid: registrations.filter((item) => item.payment_status === "paid").length,
      paymentPending: registrations.filter((item) => item.payment_status === "pending").length,
      cities: new Set(registrations.map((item) => item.city).filter(Boolean)).size,
    };
  }, [registrations]);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (city) params.set("city", city);
    if (status) params.set("status", status);
    if (paymentStatus) params.set("paymentStatus", paymentStatus);
    if (registrationStatus) params.set("registrationStatus", registrationStatus);
    if (date) params.set("date", date);
    return params.toString();
  }, [search, city, status, paymentStatus, registrationStatus, date]);

  async function refresh() {
    setLoading(true);
    const response = await fetch(`/api/admin/registrations?${query}`);
    const result = (await response.json()) as { registrations: RegistrationRecord[] };
    setRegistrations(result.registrations ?? []);
    setLoading(false);
  }

  function resetFilters() {
    setSearch("");
    setCity("");
    setStatus("");
    setPaymentStatus("");
    setRegistrationStatus("");
    setDate("");
  }

  async function updateStatus(id: string, nextStatus: RegistrationStatus) {
    const response = await fetch(`/api/admin/registrations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    const result = (await response.json()) as { registration?: RegistrationRecord };
    if (result.registration) {
      setRegistrations((current) => current.map((item) => (item.id === id ? result.registration! : item)));
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#16A765]">Administration</p>
            <h1 className="mt-2 text-3xl font-black text-[#002B55]">Tableau de bord des inscriptions</h1>
            <p className="mt-2 text-slate-600">Contrôle, suivi et rapport des participants Smartcore Académique.</p>
          </div>
          <a
            href={`/api/admin/registrations?${query ? `${query}&` : ""}format=csv`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#002B55] px-5 py-3 text-sm font-bold text-white"
          >
            <Download size={18} /> Télécharger le rapport CSV
          </a>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <StatCard label="Total" value={stats.total} />
          <StatCard label="Confirmées" value={stats.confirmed} />
          <StatCard label="En attente" value={stats.pending} />
          <StatCard label="Paiements reçus" value={stats.paid} />
          <StatCard label="Paiements en attente" value={stats.paymentPending} />
          <StatCard label="Villes" value={stats.cities} />
        </div>

        <div className="mt-8 rounded-2xl bg-white p-4 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr_1fr]">
            <div className="relative">
              <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
              <input
                className={`${inputClass} pl-10`}
                placeholder="Nom, e-mail, WhatsApp, numéro"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <input className={inputClass} placeholder="Ville" value={city} onChange={(event) => setCity(event.target.value)} />
            <input className={inputClass} type="date" value={date} onChange={(event) => setDate(event.target.value)} />
            <select className={inputClass} value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="">Tous les statuts</option>
              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select className={inputClass} value={paymentStatus} onChange={(event) => setPaymentStatus(event.target.value)}>
              <option value="">Tous paiements</option>
              {Object.entries(paymentLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <select
              className={inputClass}
              value={registrationStatus}
              onChange={(event) => setRegistrationStatus(event.target.value)}
            >
              <option value="">Tous états</option>
              {Object.entries(registrationLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-[#002B55]"
            >
              <RefreshCcw size={18} /> Réinitialiser
            </button>
            <button
              type="button"
              onClick={refresh}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFB800] px-5 py-3 text-sm font-bold text-[#152238]"
            >
              <Users size={18} /> {loading ? "Chargement..." : "Appliquer les filtres"}
            </button>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-[#EAF4FF] text-left text-xs font-bold uppercase tracking-wide text-[#002B55]">
                <tr>
                  <th className="px-4 py-4">Numéro</th>
                  <th className="px-4 py-4">Participant</th>
                  <th className="px-4 py-4">Contact</th>
                  <th className="px-4 py-4">Ville</th>
                  <th className="px-4 py-4">Objectif</th>
                  <th className="px-4 py-4">Paiement</th>
                  <th className="px-4 py-4">Date</th>
                  <th className="px-4 py-4">Statut</th>
                  <th className="px-4 py-4">Fiche</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {registrations.map((registration) => (
                  <tr key={registration.id} className="align-top">
                    <td className="px-4 py-4 font-bold text-[#002B55]">{registration.registration_number}</td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-[#152238]">
                        {registration.first_name} {registration.last_name}
                      </p>
                      <p className="text-slate-500">{registration.occupation}</p>
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      <p>{registration.email}</p>
                      <p>{registration.whatsapp}</p>
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      <p>{registration.city}</p>
                      <p className="text-xs text-slate-500">{registration.department}</p>
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      <p>{registration.main_goal}</p>
                      <p className="max-w-56 truncate text-xs text-slate-500">{registration.platforms.join(", ")}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-[#152238]">
                        {paymentLabels[registration.payment_status] ?? registration.payment_status}
                      </span>
                      <p className="mt-2 text-xs text-slate-500">{registration.amount_paid || 0} HTG</p>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{formatDateTime(registration.created_at)}</td>
                    <td className="px-4 py-4">
                      <select
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                        value={registration.status}
                        onChange={(event) => updateStatus(registration.id, event.target.value as RegistrationStatus)}
                      >
                        {statuses.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <p className="mt-2 text-xs text-slate-500">
                        {registrationLabels[registration.registration_status] ?? registration.registration_status}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <a
                        href={`/api/registrations/${registration.registration_number}/pdf?token=${registration.confirmation_token}`}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-2 font-bold text-[#002B55]"
                      >
                        <FileDown size={16} /> PDF
                      </a>
                    </td>
                  </tr>
                ))}
                {!registrations.length ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-10 text-center text-slate-500">
                      Aucune inscription trouvée.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-black text-[#002B55]">{value}</p>
    </div>
  );
}
