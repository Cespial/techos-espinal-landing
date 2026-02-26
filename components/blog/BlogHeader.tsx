"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { COMPANY_NAME, BLOG_NAV_LINKS, WA_BASE_URL } from "@/lib/conversion";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export default function BlogHeader() {
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const waLink = `${WA_BASE_URL}?text=${encodeURIComponent("Hola, vi su blog y necesito una cotización.")}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ease-out ${
        isScrolled
          ? "border-slate-200/80 bg-white/92 shadow-[0_12px_30px_-28px_rgba(15,23,42,0.6)] backdrop-blur"
          : "border-transparent bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-semibold tracking-tight"
        >
          <Image
            src="/logo-espinal.svg"
            alt="Espinal Multiservicios"
            width={32}
            height={32}
          />
          <span>{COMPANY_NAME}</span>
        </Link>

        <nav
          className="hidden items-center gap-5 md:flex"
          aria-label="Navegación blog"
        >
          {BLOG_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link-hover relative text-sm text-slate-600 transition-all duration-300 ease-out hover:text-slate-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#15803d] px-3 py-2 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-[#166d34] hover:shadow-sm active:scale-[0.98]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Pedir cotización
          </a>
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-900 transition-all duration-300 ease-out hover:border-orange-300 md:hidden"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t transition-all duration-300 md:hidden ${
          isMobileMenuOpen
            ? "max-h-[400px] border-slate-200 opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <nav className="space-y-2" aria-label="Navegación móvil blog">
              {BLOG_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-medium text-slate-700 transition-all duration-300 ease-out hover:border-orange-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-3">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-lg bg-[#15803d] px-3 text-sm font-semibold text-white active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Pedir cotización
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
