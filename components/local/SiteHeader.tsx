import Image from "next/image";
import { BRAND_COMPACT } from "@/lib/brand-layout";
import Link from "next/link";
import { Menu } from "lucide-react";
import { COMPANY_NAME, NAV_LINKS, type ServiceLineId } from "@/lib/conversion";
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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/95">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" aria-label={`${COMPANY_NAME}, inicio`} className="flex shrink-0 flex-col items-start rounded-sm">
          <Image src="/brand/espinal-compact-color.svg" alt="" width={BRAND_COMPACT.width} height={BRAND_COMPACT.height} priority className="h-10 w-auto max-w-[190px]" />
          <span style={{ marginLeft: BRAND_COMPACT.wordmarkOffset * 40 / BRAND_COMPACT.height }} className="hidden text-[11px] font-medium uppercase leading-4 tracking-[0.12em] text-ink lg:block">Multiservicios</span>
        </Link>

        <nav className="hidden items-center gap-4 lg:flex" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-slate-700 hover:text-slate-950">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden xl:block">
            <CallButton source="header" pageType={pageType} linea={linea} municipio={municipio} variant="ghost" label="Llamar" />
          </div>
          <div className="hidden md:block">
            <WaButton source="header" pageType={pageType} linea={linea} municipio={municipio} label="WhatsApp" />
          </div>
          <details className="relative lg:hidden">
            <summary
              className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-slate-300 text-slate-800 hover:border-slate-900 [&::-webkit-details-marker]:hidden"
              aria-label="Menú de navegación"
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
                  className="flex min-h-11 items-center rounded-xl px-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
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
