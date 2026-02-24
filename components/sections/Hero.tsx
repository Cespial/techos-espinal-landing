"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, MapPin, ShieldCheck } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { PHONE_DISPLAY } from "@/lib/conversion";

type HeroProps = {
  whatsappLink: string;
  phoneLink: string;
  onWhatsAppClick: () => void;
  onCallClick: () => void;
};

const TRUST_BADGES = ["Precio claro", "Garantía por escrito", "350+ trabajos"];

function getSeasonalMessage(): string | null {
  const month = new Date().getMonth();
  if (month === 0 || month === 1) return "Empieza el año con la casa en orden";
  if (month === 3 || month === 4) return "Temporada de lluvias — agenda revisión de techo";
  if (month >= 8 && month <= 10) return "Segunda temporada de lluvias — protege tu cubierta";
  if (month === 11) return "Prepara tu casa para las fiestas";
  return null;
}

export default function Hero({
  whatsappLink,
  phoneLink,
  onWhatsAppClick,
  onCallClick,
}: HeroProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const seasonalMsg = getSeasonalMessage();

  return (
    <section
      id="inicio"
      className="relative flex min-h-[85vh] items-center overflow-hidden"
    >
      {/* Video background */}
      <div className="absolute inset-0">
        {!videoFailed ? (
          <video
            className="h-full w-full object-cover"
            style={{ animation: "hero-zoom 20s ease-in-out infinite alternate" }}
            src="/video/hero-main.mp4"
            poster="/video/slow-majestic-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setVideoFailed(true)}
          />
        ) : (
          <Image
            src="/video/slow-majestic-poster.jpg"
            alt="Equipo de Espinal Multiservicios trabajando en Medellín"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-20 text-center text-white lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          <span>Servicio en Medellín y todo el Valle de Aburrá</span>
        </div>

        {seasonalMsg && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300">
            <span>{seasonalMsg}</span>
          </div>
        )}

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
          Arreglamos techos, pintamos y reparamos la plomería de tu casa o negocio
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
          Vamos a tu casa, revisamos el problema, te damos un precio claro y lo resolvemos. Sin sorpresas.
        </p>

        {/* Trust badges - compact, above CTA */}
        <div className="mx-auto mt-6 flex flex-wrap justify-center gap-3">
          {TRUST_BADGES.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Primary CTA - WhatsApp */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            onClick={onWhatsAppClick}
            className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-8 py-4 text-lg font-bold text-white shadow-lg shadow-[#25D366]/30 transition-all hover:-translate-y-0.5 hover:bg-[#20bd5a] hover:shadow-lg hover:shadow-[#25D366]/20 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-black active:scale-[0.98]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Cotizar por WhatsApp gratis
          </a>

          {/* Secondary - call as text link */}
          <a
            href={phoneLink}
            onClick={onCallClick}
            className="text-sm text-white/80 underline decoration-white/40 underline-offset-4 transition-colors hover:text-white"
          >
            O llama al {PHONE_DISPLAY}
          </a>
        </div>

        {/* Guarantee badge */}
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-sm">
          <ShieldCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
          <span>Cotización sin costo — Respuesta en menos de 2 horas</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown
          className="h-6 w-6 text-white/60 animate-bounce"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
