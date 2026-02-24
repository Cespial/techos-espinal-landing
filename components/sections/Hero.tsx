"use client";

import Image from "next/image";
import { useState } from "react";
import { CheckCircle2, MapPin, MessageCircle, Phone } from "lucide-react";

type HeroProps = {
  whatsappLink: string;
  phoneLink: string;
  onWhatsAppClick: () => void;
  onCallClick: () => void;
};

const TRUST_BULLETS = [
  "Precios claros desde el inicio",
  "Garantia por escrito",
  "Orden y limpieza en obra",
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
            alt="Trabajo real de Espinal Multiservicios en Medellin"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-20 text-center text-white lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          <span>Medellin y Valle de Aburra</span>
        </div>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Techos, pintura y plomeria con diagnostico y garantia
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
          Visita tecnica, cotizacion clara y ejecucion coordinada.
        </p>

        <div className="mx-auto mt-8 flex max-w-md flex-wrap justify-center gap-x-6 gap-y-3">
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
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            onClick={onWhatsAppClick}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-orange-600/30 transition-all hover:-translate-y-0.5 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Cotizar por WhatsApp
          </a>

          <a
            href={phoneLink}
            onClick={onCallClick}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.98]"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            Llamar ahora
          </a>
        </div>

        <p className="mt-4 text-xs text-white/50">
          Cotizacion sujeta a inspeccion tecnica.
        </p>
      </div>
    </section>
  );
}
