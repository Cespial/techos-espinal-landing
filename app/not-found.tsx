import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/local/SiteHeader";
import SiteFooter from "@/components/local/SiteFooter";
import MobileStickyBar from "@/components/local/MobileStickyBar";
import WaButton from "@/components/local/WaButton";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/servicios/techos", label: "Reparación de techos" },
  { href: "/servicios/pintura", label: "Pintura y acabados" },
  { href: "/servicios/plomeria", label: "Plomería" },
  { href: "/cobertura", label: "Municipios que atendemos" },
  { href: "/blog", label: "Guías y precios" },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader pageType="home" />
      <main className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center md:py-24">
          <div>
            <p className="text-sm font-semibold text-orange-700">Error 404</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Esta página no existe, pero el equipo sí
            </h1>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-slate-700">
              El enlace está roto o la página cambió de lugar. Si tienes una gotera, una fuga o una pared por
              pintar, escríbenos y vamos a revisarla sin costo.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <WaButton source="final_cta" pageType="home" intent="duda" label="Escríbenos por WhatsApp" size="lg" />
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 px-6 font-semibold text-slate-800 hover:border-slate-400"
              >
                Ir al inicio
              </Link>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-semibold text-slate-700 underline-offset-4 hover:text-orange-700 hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl bg-[#f6f1e9]">
            <Image src="/illustrations/404.webp" alt="" fill sizes="(min-width: 768px) 24rem, 100vw" className="object-cover" />
          </div>
        </div>
      </main>
      <SiteFooter />
      <MobileStickyBar pageType="home" />
    </>
  );
}
