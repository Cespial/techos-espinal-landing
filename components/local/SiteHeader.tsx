import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { COMPANY_NAME, NAV_LINKS, type ServiceLineId } from "@/lib/conversion";
import { OWNER } from "@/lib/owner";
import type { PageType } from "@/lib/tracking";
import WaButton from "./WaButton";
import CallButton from "./CallButton";

type Props = { pageType: PageType; linea?: ServiceLineId; municipio?: string };

/**
 * Cabecera única del sitio. Server component: el menú móvil es un <details>
 * nativo, sin estado ni JavaScript propio.
 */
export default function SiteHeader({ pageType, linea, municipio }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 flex-1 items-center gap-2.5 lg:flex-none">
          <Image src="/logo-espinal.svg" alt="" width={34} height={34} priority />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-[15px] font-bold tracking-tight text-slate-900">{COMPANY_NAME}</span>
            <span className="truncate text-xs text-slate-600">de {OWNER.name}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-slate-700 hover:text-slate-950">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CallButton source="header" pageType={pageType} linea={linea} municipio={municipio} variant="ghost" label="Llamar" className="hidden md:inline-flex" />
          <WaButton source="header" pageType={pageType} linea={linea} municipio={municipio} label="WhatsApp" className="hidden sm:inline-flex" />
          <details className="relative lg:hidden">
            <summary
              className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-slate-300 text-slate-800 hover:border-slate-900 [&::-webkit-details-marker]:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </summary>
            <nav
              aria-label="Menú"
              className="absolute right-0 top-13 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
