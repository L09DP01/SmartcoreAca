"use client";

import { Download, FileDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { statuses } from "@/lib/config";
import { formatDateTime } from "@/lib/utils";
import type { RegistrationRecord, RegistrationStatus } from "@/lib/validations";
import { inputClass } from "./field";

export function AdminDashboard({ initialRegistrations }: { initialRegistrations: RegistrationRecord[] }) {
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const total = registrations.length;

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (city) params.set("city", city);
    if (status) params.set("status", status);
    if (date) params.set("date", date);
    return params.toString();
  }, [search, city, status, date]);

  async function refresh() {
    setLoading(true);
    const response = await fetch(`/api/admin/registrations?${query}`);
    const result = (await response.json()) as { registrations: RegistrationRecord[] };
    setRegistrations(result.registrations ?? []);
    setLoading(false);
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
    <div className="min-h-screen bg-[#F5F7FA] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#16A765]">Administration</p>
            <h1 className="mt-2 text-3xl font-black text-[#002B55]">Inscriptions Smartcore Académique</h1>
            <p className="mt-2 text-slate-600">Total affiché : {total}</p>
          </div>
          <a
            href={`/api/admin/registrations?${query ? `${query}&` : ""}format=csv`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#002B55] px-5 py-3 text-sm font-bold text-white"
          >
            <Download size={18} /> Exporter CSV
          </a>
        </div>

        <div className="mt-8 grid gap-3 rounded-2xl bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
            <input className={`${inputClass} pl-10`} placeholder="Rechercher un participant" value={search} onChange={(event) => setSearch(event.target.value)} />
          </div>
          <input className={inputClass} placeholder="Ville" value={city} onChange={(event) => setCity(event.target.value)} />
          <input className={inputClass} type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          <select className={inputClass} value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="">Tous les statuts</option>
            {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <button type="button" onClick={refresh} className="rounded-full bg-[#FFB800] px-5 py-3 text-sm font-bold text-[#152238]">
            {loading ? "Recherche..." : "Filtrer"}
          </button>
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
                      <p className="font-semibold text-[#152238]">{registration.first_name} {registration.last_name}</p>
                      <p className="text-slate-500">{registration.main_goal}</p>
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      <p>{registration.email}</p>
                      <p>{registration.whatsapp}</p>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{registration.city}</td>
                    <td className="px-4 py-4 text-slate-600">{formatDateTime(registration.created_at)}</td>
                    <td className="px-4 py-4">
                      <select
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                        value={registration.status}
                        onChange={(event) => updateStatus(registration.id, event.target.value as RegistrationStatus)}
                      >
                        {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
                      </select>
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
                    <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
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
