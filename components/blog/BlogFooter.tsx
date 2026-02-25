import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import {
  COMPANY_NAME,
  PHONE_DISPLAY,
  SITE_URL,
  WA_BASE_URL,
  buildTelLink,
} from "@/lib/conversion";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export default function BlogFooter() {
  const waLink = `${WA_BASE_URL}?text=${encodeURIComponent("Hola, vi su blog y necesito una cotización.")}`;
  const telLink = buildTelLink();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/logo-espinal.svg"
                alt="Espinal Multiservicios"
                width={28}
                height={28}
              />
              <p className="text-lg font-semibold">{COMPANY_NAME}</p>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Techos, pintura y plomería para casas y negocios en Medellín y el
              Valle de Aburrá.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Respondemos rápido por WhatsApp o llamada.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#15803d] px-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-[#166d34] active:scale-[0.98]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Pedir cotización
            </a>
            <a
              href={telLink}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition-all duration-300 ease-out hover:border-orange-400 active:scale-[0.98]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Llamar
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-slate-200 pt-4 text-xs text-slate-500">
          <Link href="/servicios/techos" className="hover:text-slate-900">
            Servicios
          </Link>
          <Link href="/cobertura/medellin" className="hover:text-slate-900">
            Cobertura
          </Link>
          <Link href="/nosotros" className="hover:text-slate-900">
            Nosotros
          </Link>
          <Link href="/blog" className="hover:text-slate-900">
            Blog
          </Link>
          <Link href="/terminos" className="hover:text-slate-900">
            Términos y condiciones
          </Link>
          <Link href="/privacidad" className="hover:text-slate-900">
            Política de privacidad
          </Link>
          <a href={SITE_URL} className="hover:text-slate-900">
            Sitio principal
          </a>
          <span>Teléfono: {PHONE_DISPLAY}</span>
        </div>
      </div>
    </footer>
  );
}
