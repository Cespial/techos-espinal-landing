"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, Phone, X } from "lucide-react";
import {
  COMPANY_NAME,
  NAV_LINKS,
} from "@/lib/conversion";
import { track } from "@/lib/tracking";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type StickyHeaderProps = {
  waLink: string;
  telLink: string;
};

export default function StickyHeader({ waLink, telLink }: StickyHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ease-out ${
        isScrolled
          ? "border-slate-200/80 bg-white/92 shadow-[0_12px_30px_-28px_rgba(15,23,42,0.6)] backdrop-blur"
          : "border-transparent bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#inicio" className="inline-flex items-center gap-2 font-semibold tracking-tight">
          <Image src="/logo-espinal.svg" alt="Espinal Multiservicios" width={32} height={32} />
          <span>{COMPANY_NAME}</span>
        </a>

        <nav className="hidden items-center gap-5 md:flex" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="nav-link-hover relative text-sm text-slate-600 transition-all duration-300 ease-out hover:text-slate-950"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={telLink}
            onClick={() => track("cta_call_click", { source: "navbar" })}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium transition-all duration-300 ease-out hover:border-orange-300 hover:shadow-sm active:scale-[0.98]"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Llamar
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("cta_whatsapp_click", { source: "navbar" })}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#25D366] px-3 py-2 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-[#20bd5a] hover:shadow-sm active:scale-[0.98]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Pedir cotización
          </a>
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => {
            setIsMobileMenuOpen((prev) => {
              const next = !prev;
              track("mobile_menu_toggle", { open: next });
              return next;
            });
          }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-900 transition-all duration-300 ease-out hover:border-orange-300 md:hidden"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile menu with transition */}
      <div
        className={`overflow-hidden border-t transition-all duration-300 md:hidden ${
          isMobileMenuOpen
            ? "max-h-[400px] border-slate-200 opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <nav className="space-y-2" aria-label="Navegación móvil">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 transition-all duration-300 ease-out hover:border-orange-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  track("cta_whatsapp_click", { source: "mobile_menu" });
                }}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 text-xs font-semibold text-white active:scale-[0.98] sm:text-sm"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Pedir cotización
              </a>
              <a
                href={telLink}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  track("cta_call_click", { source: "mobile_menu" });
                }}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-900 active:scale-[0.98]"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Llamar
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
