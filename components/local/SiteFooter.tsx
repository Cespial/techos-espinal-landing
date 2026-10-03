import Image from "next/image";
import Link from "next/link";
import { COMPANY_NAME, PHONE_DISPLAY, PHONE_E164 } from "@/lib/conversion";
import { NAP, GBP_URL } from "@/lib/business";
import { OWNER } from "@/lib/owner";
import { LINE_OPTIONS } from "@/lib/conversion";

/** Pie único del sitio, con NAP visible y la línea de propiedad. */
export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 pb-24 pt-12 text-slate-900 md:pb-12">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Image src="/logo-espinal.svg" alt="" width={30} height={30} />
            <p className="text-lg font-bold tracking-tight">{COMPANY_NAME}</p>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-700">
            {COMPANY_NAME} es el oficio de {OWNER.name}: techos, pintura y plomería a domicilio para casas y
            negocios en {NAP.area}.
          </p>
          <address className="mt-4 space-y-1 text-sm not-italic text-slate-700">
            <p>
              <a href={`tel:${PHONE_E164}`} className="font-semibold text-slate-900 hover:underline">
                {PHONE_DISPLAY}
              </a>{" "}
              (WhatsApp y llamadas)
            </p>
            <p>{NAP.hours}</p>
            <p>Urgencias fuera de horario por WhatsApp.</p>
          </address>
        </div>

        <nav aria-label="Servicios">
          <p className="text-sm font-semibold">Servicios</p>
          <ul className="mt-3 space-y-1 text-sm text-slate-700">
            {LINE_OPTIONS.map((line) => (
              <li key={line.id}>
                <Link href={`/servicios/${line.id}`} className="inline-flex min-h-9 items-center hover:text-slate-950 hover:underline">
                  {line.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/cobertura" className="inline-flex min-h-9 items-center hover:text-slate-950 hover:underline">
                Los 12 municipios que atendemos
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Más">
          <p className="text-sm font-semibold">Más</p>
          <ul className="mt-3 space-y-1 text-sm text-slate-700">
            <li>
              <Link href="/nosotros" className="inline-flex min-h-9 items-center hover:text-slate-950 hover:underline">
                Quién es {OWNER.givenName}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="inline-flex min-h-9 items-center hover:text-slate-950 hover:underline">
                Guías y precios
              </Link>
            </li>
            {GBP_URL && (
              <li>
                <a href={GBP_URL} target="_blank" rel="noreferrer noopener" className="inline-flex min-h-9 items-center hover:text-slate-950 hover:underline">
                  Reseñas en Google
                </a>
              </li>
            )}
            <li>
              <Link href="/terminos" className="inline-flex min-h-9 items-center hover:text-slate-950 hover:underline">
                Términos y condiciones
              </Link>
            </li>
            <li>
              <Link href="/privacidad" className="inline-flex min-h-9 items-center hover:text-slate-950 hover:underline">
                Política de privacidad
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-4 text-xs text-slate-500 sm:px-6">
        © {new Date().getFullYear()} {OWNER.name}. {NAP.area}.
      </p>
    </footer>
  );
}
