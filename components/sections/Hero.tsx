"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  CircleAlert,
  MapPin,
  MessageCircle,
  Phone,
  Star,
} from "lucide-react";

type HeroProps = {
  whatsappLink: string;
  phoneLink: string;
  onWhatsAppClick: () => void;
  onCallClick: () => void;
};

type TrustItem = {
  label: string;
};

const TRUST_ITEMS: TrustItem[] = [
  { label: "Precios claros desde el inicio" },
  { label: "Trabajo limpio y coordinado" },
  { label: "Garantia por escrito (segun servicio)" },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Hero({
  whatsappLink,
  phoneLink,
  onWhatsAppClick,
  onCallClick,
}: HeroProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const [videoFailed, setVideoFailed] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0.01 }
        : { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: reduceMotion
      ? { opacity: 1, y: 0, transition: { duration: 0.01 } }
      : {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
        },
  };

  const imageIn = {
    hidden: { opacity: 0, scale: 0.97 },
    show: reduceMotion
      ? { opacity: 1, scale: 1, transition: { duration: 0.01 } }
      : {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
        },
  };

  return (
    <section id="inicio" className="border-b border-slate-200 bg-white pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative"
          >
            <motion.div variants={item} className="inline-flex">
              <div
                className={cn(
                  "inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2",
                  "text-sm font-medium text-orange-600 ring-1 ring-orange-100",
                )}
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>Valle de Aburra + Antioquia</span>
              </div>
            </motion.div>

            <motion.h1
              variants={item}
              className={cn(
                "mt-6 text-slate-900 text-5xl font-extrabold tracking-tight",
                "leading-[1.02] lg:text-6xl",
              )}
            >
              Soluciones integrales para tu hogar y negocio
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Techos y cubiertas · Pintura y acabados · Plomeria. Coordinamos visitas en Medellin y
              el Valle de Aburra con diagnostico tecnico, orden en la ejecucion y cotizacion clara
              desde el inicio.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-6 flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4"
              role="note"
              aria-label="Guia rapida para casos urgentes"
            >
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100/70">
                <CircleAlert className="h-4 w-4 text-amber-700" aria-hidden="true" />
              </div>
              <p className="text-sm font-medium text-amber-900">
                Si tienes filtraciones o goteras, te guiamos para priorizar intervencion y costo base.
              </p>
            </motion.div>

            <motion.div variants={item} className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                onClick={onWhatsAppClick}
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5",
                  "font-semibold text-white shadow-lg shadow-orange-600/20 transition-colors hover:bg-orange-700",
                  "focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
                )}
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Hablar con un experto
              </motion.a>

              <motion.a
                href={phoneLink}
                onClick={onCallClick}
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5",
                  "font-semibold text-slate-700 transition-colors hover:bg-slate-50",
                  "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
                )}
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                Llamar ahora
              </motion.a>
            </motion.div>

            <motion.p variants={item} className="mt-3 text-xs text-slate-500">
              Respuesta en minutos (horario laboral).
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {TRUST_ITEMS.map((trustItem) => (
                <div
                  key={trustItem.label}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                  <span>{trustItem.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.p variants={item} className="mt-6 text-xs leading-relaxed text-slate-500">
              Cotizacion sujeta a inspeccion tecnica y condiciones del sitio.
            </motion.p>
          </motion.div>

          <motion.div variants={imageIn} initial="hidden" animate="show" className="relative">
            <div
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-100 bg-slate-200 shadow-2xl",
              )}
            >
              {!reduceMotion && !videoFailed ? (
                <motion.video
                  className="h-full w-full object-cover"
                  src="/video/hero-main.mp4"
                  poster="/video/slow-majestic-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onError={() => setVideoFailed(true)}
                  animate={reduceMotion ? undefined : { scale: [1, 1.03, 1] }}
                  transition={reduceMotion ? undefined : { duration: 12, ease: "easeInOut", repeat: Infinity }}
                />
              ) : (
                <Image
                  src="/video/slow-majestic-poster.jpg"
                  alt="Trabajo real de Espinal Multiservicios en Medellin"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/0" />

              <div
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(15,23,42,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.12) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />

              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
                transition={reduceMotion ? undefined : { duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                className={cn(
                  "absolute bottom-5 left-5 flex items-center gap-3 rounded-xl border border-white/50 bg-white/95 p-4 shadow-lg backdrop-blur",
                )}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50">
                  <Star className="h-4.5 w-4.5 text-yellow-500" aria-hidden="true" />
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-bold text-slate-800">
                    4.9/5 Calificacion en Medellin
                  </div>
                  <div className="text-xs text-slate-500">Atencion bien valorada</div>
                </div>
              </motion.div>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Video real del servicio: ejecucion, orden y acabado en sitio.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
