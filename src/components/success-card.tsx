"use client";

import { Check, Copy, Download, Home, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { brand } from "@/lib/config";

export function SuccessCard({ number, token }: { number: string; token: string }) {
  const [copied, setCopied] = useState(false);

  async function copyNumber() {
    await navigator.clipboard.writeText(number);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="relative mx-auto max-w-2xl rounded-3xl bg-white p-6 text-center shadow-xl shadow-slate-900/10 sm:p-10">
      <div className="pointer-events-none absolute inset-x-8 top-4 flex justify-between text-[#FFB800]/50">
        <span>✦</span><span>•</span><span>✦</span><span>•</span>
      </div>
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#16A765] text-white">
        <Check size={42} />
      </div>
      <h1 className="mt-6 text-3xl font-black text-[#002B55]">Inscription réussie !</h1>
      <p className="mt-3 leading-7 text-slate-700">
        Félicitations, votre inscription à la formation Smartcore Académique a été enregistrée avec succès.
      </p>

      <div className="mt-7 rounded-2xl bg-[#F5F7FA] p-5">
        <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Votre numéro d’inscription</p>
        <p className="mt-2 text-3xl font-black text-[#002B55]">{number || "SCA-2026-00001"}</p>
        <button
          type="button"
          onClick={copyNumber}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-[#002B55]"
        >
          <Copy size={16} /> {copied ? "Copié" : "Copier le numéro"}
        </button>
      </div>

      <div className="mt-7 text-left">
        <p className="font-bold text-[#152238]">Vous recevrez prochainement :</p>
        <ul className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
          {["un e-mail de confirmation", "le lien du groupe WhatsApp", "le calendrier des séances", "les informations importantes", "les consignes relatives aux activités pratiques"].map((item) => (
            <li key={item} className="flex gap-2"><Check className="mt-0.5 text-[#16A765]" size={16} /> {item}</li>
          ))}
        </ul>
      </div>

      <p className="mt-6 rounded-xl bg-[#FFB800]/15 p-4 text-sm font-medium text-[#152238]">
        Vérifiez également votre dossier de courriers indésirables si vous ne recevez pas l’e-mail.
      </p>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <Link href={brand.whatsappGroupUrl} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#16A765] px-5 py-3 text-sm font-bold text-white">
          <MessageCircle size={18} /> Rejoindre le groupe WhatsApp
        </Link>
        <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-[#002B55]">
          <Home size={18} /> Retourner à l’accueil
        </Link>
      </div>

      <Link
        href={`/api/registrations/${encodeURIComponent(number)}/pdf?token=${encodeURIComponent(token)}`}
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#002B55] px-5 py-3 text-sm font-bold text-white"
      >
        <Download size={18} /> Télécharger ma confirmation d’inscription en PDF
      </Link>
    </div>
  );
}
