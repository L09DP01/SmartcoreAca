import Link from "next/link";
import { brand } from "@/lib/config";

export function Footer() {
  return (
    <footer className="bg-[#001E3C] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        <div>
          <p className="text-xl font-bold">{brand.name}</p>
          <p className="mt-2 text-sm text-blue-100">{brand.slogan}</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-blue-100">
          <Link href="/conditions" className="hover:text-white">Conditions de participation</Link>
          <Link href="/confidentialite" className="hover:text-white">Politique de confidentialité</Link>
          <Link href="/conditions#mentions" className="hover:text-white">Mentions légales</Link>
          <Link href="/#contact" className="hover:text-white">Contact</Link>
          <Link href="/#faq" className="hover:text-white">FAQ</Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-blue-100">
        © 2026 Smartcore Académique. Tous droits réservés.
      </div>
    </footer>
  );
}
