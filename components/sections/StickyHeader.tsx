"use client";

import { useState, useEffect } from "react";
import { Menu, Phone, X } from "lucide-react";
import {
  COMPANY_NAME,
  NAV_LINKS,
} from "@/lib/conversion";
import { track } from "@/lib/tracking";

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M20.5 3.5A11.8 11.8 0 0 0 12.06 0C5.47 0 .1 5.37.1 11.97c0 2.1.55 4.15 1.59 5.96L0 24l6.22-1.63a11.91 11.91 0 0 0 5.84 1.49h.01c6.59 0 11.95-5.37 11.95-11.97 0-3.2-1.25-6.2-3.52-8.39M12.07 21.84h-.01a9.9 9.9 0 0 1-5.04-1.39l-.36-.22-3.69.97.98-3.6-.23-.37a9.9 9.9 0 0 1-1.52-5.26c0-5.46 4.44-9.9 9.9-9.9a9.8 9.8 0 0 1 7.04 2.93 9.86 9.86 0 0 1 2.89 7.04c0 5.46-4.44 9.9-9.9 9.9m5.44-7.44c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.77.97-.95 1.16-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5-.89-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.12-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.66-1.62-.9-2.21-.24-.58-.49-.5-.66-.51h-.57c-.2 0-.52.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.22 5.1 4.51.71.31 1.26.5 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.01-1.42.25-.7.25-1.29.18-1.42-.08-.12-.27-.2-.57-.35" />
    </svg>
  );
}

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
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-600 text-sm font-bold text-white">
            EM
          </span>
          <span>{COMPANY_NAME}</span>
        </a>

        <nav className="hidden items-center gap-5 md:flex" aria-label="Navegacion principal">
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
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-orange-600 px-3 py-2 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-orange-500 hover:shadow-sm active:scale-[0.98]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Pedir cotizacion
          </a>
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
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

      {isMobileMenuOpen ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <nav className="space-y-2" aria-label="Navegacion movil">
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
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-orange-600 px-3 text-xs font-semibold text-white active:scale-[0.98] sm:text-sm"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Pedir cotizacion
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
      ) : null}
    </header>
  );
}
