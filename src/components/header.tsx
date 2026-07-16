"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";

const links = [
  ["Accueil", "/#accueil"],
  ["À propos", "/#apropos"],
  ["Programme", "/#programme"],
  ["Avantages", "/#avantages"],
  ["FAQ", "/#faq"],
  ["Contact", "/#contact"],
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/#accueil" aria-label="Retour à l’accueil">
          <Logo compact />
        </Link>
        <div className="hidden items-center gap-7 lg:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="text-sm font-medium text-slate-700 transition hover:text-[#002B55]">
              {label}
            </Link>
          ))}
        </div>
        <Link
          href="/#inscription"
          className="hidden rounded-full bg-[#FFB800] px-5 py-3 text-sm font-bold text-[#152238] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f0ac00] lg:inline-flex"
        >
          S’inscrire gratuitement
        </Link>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-[#002B55] lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Ouvrir le menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-[#EAF4FF]"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/#inscription"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-[#FFB800] px-5 py-3 text-center text-sm font-bold text-[#152238]"
            >
              S’inscrire gratuitement
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
