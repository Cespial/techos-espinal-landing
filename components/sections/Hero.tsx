"use client";

import Image from "next/image";
import { useState } from "react";
import { CalendarDays, CheckCircle2, MapPin, Phone } from "lucide-react";

type HeroProps = {
  whatsappLink: string;
  phoneLink: string;
  onWhatsAppClick: () => void;
  onCallClick: () => void;
};

const TRUST_BULLETS = [
  "Precio claro antes de empezar — sin costos ocultos",
  "Garantía por escrito en cada trabajo que hacemos",
  "Dejamos todo limpio y ordenado al terminar",
];

export default function Hero({
  whatsappLink,
  phoneLink,
  onWhatsAppClick,
  onCallClick,
}: HeroProps) {
  const [videoFailed, setVideoFailed] = useState(false);

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

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
          Arreglamos techos, pintamos y reparamos la plomería de tu casa o negocio
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
          Vamos a tu casa, revisamos el problema, te damos un precio claro y lo resolvemos. Sin sorpresas.
        </p>

        <div className="mx-auto mt-8 flex max-w-lg flex-wrap justify-center gap-x-6 gap-y-3">
          {TRUST_BULLETS.map((bullet) => (
            <div
              key={bullet}
              className="flex items-center gap-2 text-sm font-medium text-white/90"
            >
              <CheckCircle2
                className="h-4 w-4 shrink-0 text-emerald-400"
                aria-hidden="true"
              />
              <span>{bullet}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#agendar"
            onClick={onWhatsAppClick}
            className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-xl bg-orange-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-orange-600/30 transition-all hover:-translate-y-0.5 hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-600/20 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.98]"
          >
            <CalendarDays className="h-5 w-5" aria-hidden="true" />
            Agendar visita gratis
          </a>

          <a
            href={phoneLink}
            onClick={onCallClick}
            className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.98]"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            Llamar ahora
          </a>
        </div>

        <p className="mt-5 text-sm text-white/60">
          La visita técnica y la cotización no tienen costo. Respondemos en menos de 2 horas.
        </p>
      </div>
    </section>
  );
}
