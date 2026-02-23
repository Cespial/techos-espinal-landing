"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, KeyboardEvent, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Hammer,
  Home,
  MapPin,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import {
  buildTelUrl,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  COMPANY_NAME,
  MUNICIPALITY_OPTIONS,
  NAV_LINKS,
  PHONE_DISPLAY,
  SERVICE_OPTIONS,
  SITE_URL,
  URGENCY_OPTIONS,
} from "@/lib/conversion";
import { track } from "@/lib/tracking";

type CtaOrigin =
  | "navbar"
  | "hero"
  | "service_card"
  | "floating"
  | "mobile_bar"
  | "form"
  | "footer";

type FormState = {
  name: string;
  phone: string;
  location: string;
  service: string;
  urgency: string;
};

const INITIAL_FORM_STATE: FormState = {
  name: "",
  phone: "",
  location: "Medellin",
  service: "Impermeabilizacion",
  urgency: "Esta semana",
};

const SERVICES = [
  {
    id: "impermeabilizacion",
    title: "Impermeabilizacion de cubiertas",
    description:
      "Sellamos puntos criticos y reforzamos superficies para controlar filtraciones sin obras innecesarias.",
    icon: ShieldCheck,
  },
  {
    id: "goteras",
    title: "Reparacion de goteras",
    description:
      "Diagnostico tecnico en sitio para ubicar origen de humedad y resolverla de forma puntual.",
    icon: Home,
  },
  {
    id: "canoas",
    title: "Canoas y bajantes",
    description:
      "Limpieza, reparacion y ajuste de canoas para proteger fachadas y evitar reboses en temporada de lluvia.",
    icon: Wrench,
  },
  {
    id: "estructura",
    title: "Arreglo general de techos",
    description:
      "Mantenimiento correctivo y preventivo con garantia por escrito segun alcance del trabajo.",
    icon: Hammer,
  },
] as const;

const FAQ_ITEMS = [
  {
    q: "¿Atienden solo Medellin?",
    a: "No. Atendemos Medellin y municipios principales del Valle de Aburra. Para otros municipios de Antioquia, coordinamos visita segun disponibilidad.",
  },
  {
    q: "¿La garantia es fija para todos los trabajos?",
    a: "No usamos promesas absolutas. La garantia se define por escrito segun diagnostico, materiales y alcance del servicio contratado.",
  },
  {
    q: "¿Como cotizan?",
    a: "Primero hacemos una inspeccion tecnica y luego enviamos una propuesta clara por WhatsApp con alcance, tiempos y valor.",
  },
] as const;

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.5 3.5A11.8 11.8 0 0 0 12.06 0C5.47 0 .1 5.37.1 11.97c0 2.1.55 4.15 1.59 5.96L0 24l6.22-1.63a11.91 11.91 0 0 0 5.84 1.49h.01c6.59 0 11.95-5.37 11.95-11.97 0-3.2-1.25-6.2-3.52-8.39M12.07 21.84h-.01a9.9 9.9 0 0 1-5.04-1.39l-.36-.22-3.69.97.98-3.6-.23-.37a9.9 9.9 0 0 1-1.52-5.26c0-5.46 4.44-9.9 9.9-9.9a9.8 9.8 0 0 1 7.04 2.93 9.86 9.86 0 0 1 2.89 7.04c0 5.46-4.44 9.9-9.9 9.9m5.44-7.44c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.77.97-.95 1.16-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5-.89-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.12-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.66-1.62-.9-2.21-.24-.58-.49-.5-.66-.51h-.57c-.2 0-.52.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.22 5.1 4.51.71.31 1.26.5 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.01-1.42.25-.7.25-1.29.18-1.42-.08-.12-.27-.2-.57-.35" />
    </svg>
  );
}

function Reveal({
  children,
  delay = 0,
  reduceMotion,
}: {
  children: React.ReactNode;
  delay?: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function TechosLanding() {
  const reduceMotionPreference = useReducedMotion();
  const reduceMotion = Boolean(reduceMotionPreference);
  const [isScrolled, setIsScrolled] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [sliderPercent, setSliderPercent] = useState(58);
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(FAQ_ITEMS[0].q);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const defaultMessage = useMemo(
    () =>
      buildWhatsAppMessage({
        location: "Medellin",
        service: "impermeabilizacion",
        urgency: "Esta semana",
      }),
    [],
  );

  const navbarWhatsAppUrl = useMemo(() => buildWhatsAppUrl(defaultMessage), [defaultMessage]);
  const telUrl = useMemo(() => buildTelUrl(), []);

  const shouldShowVideo = !reduceMotion && !videoFailed;

  const trackWhatsApp = (origin: CtaOrigin, payload?: Record<string, string>) => {
    track("cta_whatsapp_click", {
      origin,
      page: "home",
      ...payload,
    });
  };

  const trackCall = (origin: CtaOrigin) => {
    track("cta_call_click", {
      origin,
      page: "home",
    });
  };

  const onSliderKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    setSliderPercent((prev) => Math.min(95, Math.max(5, prev + direction)));
  };

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = buildWhatsAppMessage({
      name: formState.name,
      location: formState.location,
      service: formState.service,
      urgency: formState.urgency,
      phone: formState.phone,
    });

    const whatsappUrl = buildWhatsAppUrl(message);

    track("form_submit", {
      origin: "inspection_form",
      service: formState.service,
      urgency: formState.urgency,
      location: formState.location,
    });

    trackWhatsApp("form", { service: formState.service });

    const newWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    if (!newWindow) {
      window.location.href = telUrl;
    }

    setFormSubmitted(true);
  };

  return (
    <div className="bg-slate-50 text-slate-950 pb-20 md:pb-0">
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          isScrolled
            ? "border-slate-200/80 bg-white/92 shadow-[0_8px_30px_-24px_rgba(2,6,23,0.45)] backdrop-blur-xl"
            : "border-transparent bg-white/70"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#inicio" className="inline-flex items-center gap-2 font-semibold tracking-tight">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-600 text-sm font-bold text-white">
              TE
            </span>
            <span>{COMPANY_NAME}</span>
          </a>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Navegacion principal">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-sm text-slate-600 transition-colors duration-200 hover:text-slate-950"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href={telUrl}
              onClick={() => trackCall("navbar")}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium transition-all duration-200 hover:border-orange-300 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Llamar
            </a>
            <a
              href={navbarWhatsAppUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackWhatsApp("navbar")}
              className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section id="inicio" className="relative min-h-[82svh] overflow-hidden border-b border-slate-200 pt-28 md:pt-32">
          <div className="absolute inset-0">
            {shouldShowVideo ? (
              <motion.video
                key="hero-video"
                className="h-full w-full object-cover"
                src="/video/hero-main.mp4"
                poster="/video/hero-fallback.svg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onError={() => setVideoFailed(true)}
                animate={{ scale: [1.03, 1.06] }}
                transition={{ duration: 18, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
              />
            ) : (
              <Image
                src="/video/hero-fallback.svg"
                alt="Techos Espinal en Medellin"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-900/60 to-slate-950/80" />
            <div
              className="absolute inset-0 opacity-20 mix-blend-soft-light"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.36) 0.65px, transparent 0.65px)",
                backgroundSize: "3px 3px",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-slate-50" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 pb-14 sm:px-6 md:pb-20">
            <Reveal reduceMotion={reduceMotion}>
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur">
                Medellin · Valle de Aburra · Antioquia
              </span>
            </Reveal>

            <Reveal reduceMotion={reduceMotion} delay={0.08}>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
                Impermeabilizacion y reparacion de techos con respuesta rapida en Medellin
              </h1>
            </Reveal>

            <Reveal reduceMotion={reduceMotion} delay={0.14}>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 md:text-lg">
                Diagnostico tecnico, solucion clara y seguimiento por WhatsApp para que vuelvas a estar tranquilo cuando llueve.
              </p>
            </Reveal>

            <Reveal reduceMotion={reduceMotion} delay={0.2}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={navbarWhatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackWhatsApp("hero")}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Hablar con un experto
                </a>
                <a
                  href={telUrl}
                  onClick={() => trackCall("hero")}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur transition-all duration-200 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 active:scale-[0.98]"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Llamar ahora
                </a>
              </div>
            </Reveal>

            {reduceMotion ? (
              <p className="mt-4 text-xs text-slate-300">
                Detectamos preferencia de movimiento reducido y mostramos version estatica del hero.
              </p>
            ) : null}
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white py-7" aria-label="Diferenciales">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 sm:px-6 md:grid-cols-3">
            {[
              "Inspeccion tecnica antes de cotizar",
              "Garantia por escrito segun servicio",
              "Canal directo por WhatsApp y llamada",
            ].map((item) => (
              <p
                key={item}
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
              >
                {item}
              </p>
            ))}
          </div>
        </section>

        <section id="servicios" className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal reduceMotion={reduceMotion}>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Servicios principales</h2>
              <p className="mt-3 max-w-3xl text-slate-600">
                Soluciones enfocadas en controlar filtraciones, recuperar cubiertas y mantener techos en condiciones seguras.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {SERVICES.map((service, index) => {
                const serviceMessage = buildWhatsAppMessage({
                  service: service.title.toLowerCase(),
                  location: "Medellin",
                  urgency: "Esta semana",
                });
                const serviceUrl = buildWhatsAppUrl(serviceMessage);
                const Icon = service.icon;

                return (
                  <Reveal key={service.id} reduceMotion={reduceMotion} delay={index * 0.06}>
                    <article className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_40px_-34px_rgba(15,23,42,0.48)] transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-[0_18px_45px_-30px_rgba(234,88,12,0.32)]">
                      <div className="flex items-start justify-between gap-4">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <a
                          href={serviceUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => {
                            track("service_card_click", { service: service.id });
                            trackWhatsApp("service_card", { service: service.id });
                          }}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                        >
                          Consultar
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </div>
                      <h3 className="mt-4 text-xl font-semibold text-slate-900">{service.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.description}</p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="resultados" className="border-y border-slate-200 bg-white py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal reduceMotion={reduceMotion}>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Antes y despues del servicio</h2>
              <p className="mt-3 max-w-3xl text-slate-600">
                Ejemplo visual de referencia para explicar el nivel de mejora que buscamos en cada trabajo.
              </p>
            </Reveal>

            <Reveal reduceMotion={reduceMotion} delay={0.06}>
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-950 p-4 md:p-6">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                  <Image
                    src="/media/roof-after.svg"
                    alt="Techo despues de mantenimiento"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1100px"
                  />
                  <div
                    className="absolute inset-y-0 left-0 overflow-hidden"
                    style={{ width: `${sliderPercent}%` }}
                    aria-hidden="true"
                  >
                    <Image
                      src="/media/roof-before.svg"
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 1100px"
                    />
                  </div>
                  <div
                    className="absolute inset-y-0"
                    style={{ left: `calc(${sliderPercent}% - 1px)` }}
                    aria-hidden="true"
                  >
                    <div className="h-full w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(15,23,42,0.55)]" />
                    <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/60 text-xs font-semibold text-white backdrop-blur">
                      {sliderPercent}%
                    </div>
                  </div>
                  <span className="absolute left-3 top-3 rounded bg-black/55 px-2 py-1 text-xs font-medium text-white">
                    Antes
                  </span>
                  <span className="absolute right-3 top-3 rounded bg-orange-600/85 px-2 py-1 text-xs font-medium text-white">
                    Despues
                  </span>
                </div>

                <div className="mt-4">
                  <label htmlFor="before-after-slider" className="block text-sm text-slate-200">
                    Comparador antes/despues (tambien funciona con flechas izquierda/derecha)
                  </label>
                  <input
                    id="before-after-slider"
                    type="range"
                    min={5}
                    max={95}
                    value={sliderPercent}
                    onChange={(event) => setSliderPercent(Number(event.target.value))}
                    onKeyDown={onSliderKeyDown}
                    className="mt-2 h-2 w-full cursor-pointer accent-orange-500"
                    aria-valuetext={`${sliderPercent}% antes visible`}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="cobertura" className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
              <Reveal reduceMotion={reduceMotion}>
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Cobertura local en Medellin y Valle de Aburra</h2>
                  <p className="mt-3 text-slate-600">
                    Atendemos solicitudes residenciales y comerciales en Medellin y municipios cercanos con agenda coordinada por zona.
                  </p>
                  <p className="mt-3 text-slate-600">
                    Si tu inmueble esta en otro punto de Antioquia, te orientamos primero por WhatsApp y validamos disponibilidad de visita.
                  </p>

                  <ul className="mt-6 grid grid-cols-2 gap-2 text-sm text-slate-700 sm:grid-cols-3">
                    {MUNICIPALITY_OPTIONS.map((item) => (
                      <li key={item} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
                        <MapPin className="h-3.5 w-3.5 text-orange-600" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal reduceMotion={reduceMotion} delay={0.08}>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_40px_-34px_rgba(15,23,42,0.48)]">
                  <h3 className="text-xl font-semibold">Condiciones claras</h3>
                  <ul className="mt-4 space-y-3 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" aria-hidden="true" />
                      Inspeccion tecnica en sitio antes de definir alcance.
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" aria-hidden="true" />
                      Garantia por escrito segun materiales y tipo de trabajo.
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" aria-hidden="true" />
                      Cronograma acordado por WhatsApp y llamada.
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="contacto" className="border-t border-slate-200 bg-white py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
              <Reveal reduceMotion={reduceMotion}>
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Agendar inspeccion</h2>
                  <p className="mt-3 text-slate-600">
                    Completa estos datos y abrimos WhatsApp con el mensaje listo para coordinar tu visita tecnica.
                  </p>

                  <form onSubmit={onFormSubmit} className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                        Nombre
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                        Telefono
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(event) => setFormState((prev) => ({ ...prev, phone: event.target.value }))}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-slate-700">
                          Barrio / Municipio
                        </label>
                        <select
                          id="location"
                          value={formState.location}
                          onChange={(event) =>
                            setFormState((prev) => ({
                              ...prev,
                              location: event.target.value,
                            }))
                          }
                          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                        >
                          {MUNICIPALITY_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-slate-700">
                          Servicio
                        </label>
                        <select
                          id="service"
                          value={formState.service}
                          onChange={(event) =>
                            setFormState((prev) => ({
                              ...prev,
                              service: event.target.value,
                            }))
                          }
                          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                        >
                          {SERVICE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="urgency" className="block text-sm font-medium text-slate-700">
                        Urgencia
                      </label>
                      <select
                        id="urgency"
                        value={formState.urgency}
                        onChange={(event) => setFormState((prev) => ({ ...prev, urgency: event.target.value }))}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                      >
                        {URGENCY_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button
                        type="submit"
                        className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 active:scale-[0.98]"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        Enviar por WhatsApp
                      </button>
                      <a
                        href={telUrl}
                        onClick={() => trackCall("form")}
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition-all duration-200 hover:border-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 active:scale-[0.98]"
                      >
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        Llamar
                      </a>
                    </div>

                    {formSubmitted ? (
                      <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                        Mensaje preparado correctamente. Si WhatsApp no abre, usa la opcion de llamada.
                      </p>
                    ) : null}
                  </form>
                </div>
              </Reveal>

              <Reveal reduceMotion={reduceMotion} delay={0.08}>
                <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white md:p-7">
                  <h3 className="text-xl font-semibold">Canales directos</h3>
                  <p className="text-sm text-slate-300">
                    Siempre hablamos por canales simples para acelerar diagnostico y agendamiento.
                  </p>

                  <a
                    href={navbarWhatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackWhatsApp("footer")}
                    className="inline-flex w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-semibold transition-colors hover:border-orange-400"
                  >
                    WhatsApp directo
                    <WhatsAppIcon className="h-4 w-4" />
                  </a>

                  <a
                    href={telUrl}
                    onClick={() => trackCall("footer")}
                    className="inline-flex w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-semibold transition-colors hover:border-orange-400"
                  >
                    Llamar ahora
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </a>

                  <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 text-sm text-slate-300">
                    <p className="font-medium text-slate-100">Horario de atencion</p>
                    <p className="mt-2 inline-flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-orange-400" aria-hidden="true" />
                      Lunes a sabado · horario laboral
                    </p>
                    <p className="mt-3 text-slate-400">Telefono: {PHONE_DISPLAY}</p>
                    <p className="mt-1 text-slate-400">Cobertura: Medellin, Antioquia y Valle de Aburra</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-50 py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <Reveal reduceMotion={reduceMotion}>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Preguntas frecuentes</h2>
            </Reveal>

            <div className="mt-6 space-y-3">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaq === item.q;
                return (
                  <Reveal key={item.q} reduceMotion={reduceMotion} delay={index * 0.05}>
                    <div className="rounded-xl border border-slate-200 bg-white">
                      <button
                        type="button"
                        onClick={() => setOpenFaq((prev) => (prev === item.q ? null : item.q))}
                        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                        aria-expanded={isOpen}
                      >
                        {item.q}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                          aria-hidden="true"
                        />
                      </button>
                      {isOpen ? (
                        <div className="border-t border-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-600">{item.a}</div>
                      ) : null}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-sm text-slate-600 sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>
            {COMPANY_NAME} · Impermeabilizacion, goteras y canoas en Medellin y Valle de Aburra.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terminos" className="hover:text-slate-900">
              Terminos
            </Link>
            <Link href="/privacidad" className="hover:text-slate-900">
              Privacidad
            </Link>
            <a href={SITE_URL} className="hover:text-slate-900">
              Sitio
            </a>
          </div>
        </div>
      </footer>

      <div className="pointer-events-none fixed bottom-6 right-6 z-[70] hidden flex-col gap-3 md:flex">
        <div className="group relative pointer-events-auto">
          <span className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            WhatsApp
          </span>
          <a
            href={navbarWhatsAppUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir WhatsApp"
            onClick={() => trackWhatsApp("floating")}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-slate-900 shadow-lg transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 active:scale-[0.98]"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
        </div>

        <div className="group relative pointer-events-auto">
          <span className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Llamar
          </span>
          <a
            href={telUrl}
            aria-label="Llamar"
            onClick={() => trackCall("floating")}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 active:scale-[0.98]"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div
        className="fixed inset-x-0 bottom-0 z-[75] border-t border-slate-200 bg-white/95 px-3 py-2 backdrop-blur md:hidden"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.5rem)" }}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2">
          <a
            href={navbarWhatsAppUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackWhatsApp("mobile_bar")}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 text-sm font-semibold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 active:scale-[0.98]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href={telUrl}
            onClick={() => trackCall("mobile_bar")}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 active:scale-[0.98]"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Llamar
          </a>
        </div>
      </div>
    </div>
  );
}
