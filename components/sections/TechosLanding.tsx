"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useState,
  type ComponentType,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Droplets,
  Menu,
  Paintbrush,
  Phone,
  Wrench,
  X,
} from "lucide-react";
import {
  buildTelLink,
  buildWaLink,
  COMPANY_NAME,
  DEFAULT_CITY,
  LINE_OPTIONS,
  MUNICIPALITY_OPTIONS,
  NAV_LINKS,
  PHONE_DISPLAY,
  PLAN_DATA,
  SERVICE_DATA,
  SITE_URL,
  URGENCY_OPTIONS,
  type ServiceLineId,
} from "@/lib/conversion";
import { track } from "@/lib/tracking";

type LineIconProps = { className?: string };
type ResolverFormState = {
  nombre: string;
  telefono: string;
  municipio: string;
  linea: ServiceLineId;
  servicio: string;
  urgencia: string;
  detalle: string;
};

type QuoteModalState = {
  nombre: string;
  telefono: string;
  municipio: string;
  linea: ServiceLineId;
  servicio: string;
  urgencia: string;
};

const LINE_ICONS: Record<ServiceLineId, ComponentType<LineIconProps>> = {
  techos: Wrench,
  pintura: Paintbrush,
  plomeria: Droplets,
};

const FAQ_ITEMS = [
  {
    id: "faq-1",
    question: "¿Manejan garantia?",
    answer:
      "Si. Entregamos garantia por escrito segun servicio, alcance y condiciones del sitio.",
  },
  {
    id: "faq-2",
    question: "¿Como hacen el diagnostico?",
    answer:
      "Primero revisamos el problema en sitio y, segun el caso, usamos equipos de diagnostico para precisar la solucion.",
  },
  {
    id: "faq-3",
    question: "¿Atienden hogares y negocios?",
    answer:
      "Si. Atendemos hogares y negocios en Medellin, Valle de Aburra y municipios de Antioquia segun disponibilidad.",
  },
];

const INITIAL_RESOLVER_STATE: ResolverFormState = {
  nombre: "",
  telefono: "",
  municipio: "Medellin",
  linea: "techos",
  servicio: SERVICE_DATA.techos[0].name,
  urgencia: "Esta semana",
  detalle: "",
};

const INITIAL_QUOTE_STATE: QuoteModalState = {
  nombre: "",
  telefono: "",
  municipio: "Medellin",
  linea: "techos",
  servicio: SERVICE_DATA.techos[0].name,
  urgencia: "Solo cotizacion",
};

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

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div data-reveal className={`reveal-item ${className}`}>
      {children}
    </div>
  );
}

export default function TechosLanding() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [activeLine, setActiveLine] = useState<ServiceLineId>("techos");
  const [activeFaq, setActiveFaq] = useState(FAQ_ITEMS[0].id);
  const [sliderPercent, setSliderPercent] = useState<number>(58);
  const [showCallFallback, setShowCallFallback] = useState(false);
  const [quoteModalState, setQuoteModalState] = useState<QuoteModalState>(INITIAL_QUOTE_STATE);
  const [resolverState, setResolverState] = useState<ResolverFormState>(INITIAL_RESOLVER_STATE);

  const telLink = useMemo(() => buildTelLink(), []);
  const heroWaLink = useMemo(
    () =>
      buildWaLink({
        linea: "Multiservicios hogar",
        servicio: "Diagnostico inicial",
        municipio: DEFAULT_CITY,
        urgencia: "Solo cotizacion",
      }),
    [],
  );

  const activeLineData = useMemo(() => SERVICE_DATA[activeLine], [activeLine]);
  const resolverServices = useMemo(
    () => SERVICE_DATA[resolverState.linea],
    [resolverState.linea],
  );

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const shouldLock = isMobileMenuOpen || isQuoteModalOpen;
    document.body.style.overflow = shouldLock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, isQuoteModalOpen]);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (!nodes.length) {
      return;
    }

    if (shouldReduceMotion || typeof IntersectionObserver === "undefined") {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [shouldReduceMotion, activeLine]);

  const onLineSelect = (linea: ServiceLineId) => {
    setActiveLine(linea);
    track("service_tab_select", { source: "tabs", linea });
  };

  const openQuoteModal = ({ linea, servicio }: { linea: ServiceLineId; servicio?: string }) => {
    const serviceName = servicio || SERVICE_DATA[linea][0].name;
    setQuoteModalState((prev) => ({
      ...prev,
      linea,
      servicio: serviceName,
    }));
    setIsQuoteModalOpen(true);
  };

  const onQuoteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    track("form_submit", {
      source: "quote_modal",
      linea: quoteModalState.linea,
      servicio: quoteModalState.servicio,
      municipio: quoteModalState.municipio,
      urgencia: quoteModalState.urgencia,
    });

    const waLink = buildWaLink({
      linea: quoteModalState.linea,
      servicio: quoteModalState.servicio,
      municipio: quoteModalState.municipio,
      urgencia: quoteModalState.urgencia,
      nombre: quoteModalState.nombre,
      telefono: quoteModalState.telefono,
    });

    track("cta_whatsapp_click", {
      source: "modal",
      linea: quoteModalState.linea,
      servicio: quoteModalState.servicio,
    });

    const popup = window.open(waLink, "_blank", "noopener,noreferrer");

    if (!popup) {
      setShowCallFallback(true);
    }

    setIsQuoteModalOpen(false);
  };

  const onResolverSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    track("form_submit", {
      source: "resolver_ahora",
      linea: resolverState.linea,
      servicio: resolverState.servicio,
      municipio: resolverState.municipio,
      urgencia: resolverState.urgencia,
    });

    const waLink = buildWaLink({
      linea: resolverState.linea,
      servicio: resolverState.servicio,
      municipio: resolverState.municipio,
      urgencia: resolverState.urgencia,
      nombre: resolverState.nombre,
      telefono: resolverState.telefono,
      detalle: resolverState.detalle,
    });

    track("cta_whatsapp_click", {
      source: "resolver_form",
      linea: resolverState.linea,
      servicio: resolverState.servicio,
    });

    const popup = window.open(waLink, "_blank", "noopener,noreferrer");

    if (!popup) {
      setShowCallFallback(true);
    }
  };

  const onSliderKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }
    event.preventDefault();
    const change = event.key === "ArrowRight" ? 2 : -2;
    setSliderPercent((prev) => Math.max(5, Math.min(95, prev + change)));
  };

  return (
    <div className="bg-slate-50 text-slate-950 pb-20 md:pb-0">
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ease-out ${
          isScrolled
            ? "border-slate-200/80 bg-white/92 shadow-[0_12px_30px_-28px_rgba(15,23,42,0.6)] backdrop-blur"
            : "border-transparent bg-white/70"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#inicio" className="inline-flex items-center gap-2 font-semibold tracking-tight">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-600 text-sm font-bold text-white">
              EM
            </span>
            <span>{COMPANY_NAME}</span>
          </a>

          <nav className="hidden items-center gap-5 md:flex" aria-label="Navegacion principal">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-sm text-slate-600 transition-all duration-300 ease-out hover:text-slate-950"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href={telLink}
              onClick={() => track("cta_call_click", { source: "navbar" })}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium transition-all duration-300 ease-out hover:border-orange-300 hover:shadow-sm active:scale-[0.98]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Llamar
            </a>
            <a
              href={heroWaLink}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("cta_whatsapp_click", { source: "navbar" })}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-orange-600 px-3 py-2 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-orange-500 hover:shadow-sm active:scale-[0.98]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Hablar con un experto
            </a>
          </div>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-900 transition-all duration-300 ease-out hover:border-orange-300 md:hidden"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>

        {isMobileMenuOpen ? (
          <div className="border-t border-slate-200 bg-white md:hidden">
            <div className="mx-auto max-w-6xl px-4 py-4">
              <nav className="space-y-2" aria-label="Navegacion movil">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 transition-all duration-300 ease-out hover:border-orange-300"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href={heroWaLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    track("cta_whatsapp_click", { source: "mobile_menu" });
                  }}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-orange-600 px-3 text-sm font-semibold text-white active:scale-[0.98]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href={telLink}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    track("cta_call_click", { source: "mobile_menu" });
                  }}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-900 active:scale-[0.98]"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Llamar
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <main id="main-content">
        <section id="inicio" className="relative min-h-[84svh] overflow-hidden border-b border-slate-200 pt-28 md:pt-32">
          <div className="absolute inset-0">
            {!shouldReduceMotion && !videoFailed ? (
              <motion.video
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
                alt="Espinal Multiservicios en Medellin"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/82 via-slate-900/68 to-slate-950/80" />
            <div
                className="absolute inset-0 opacity-20 mix-blend-soft-light"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(255,255,255,0.32) 0.7px, transparent 0.7px)",
                  backgroundSize: "3px 3px",
                }}
              />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-slate-50" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-20">
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur">
                Valle de Aburra + Antioquia
              </span>
            </Reveal>

            <Reveal className="mt-5">
              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
                Soluciones integrales para tu hogar y negocio
              </h1>
            </Reveal>

            <Reveal className="mt-4">
              <p className="max-w-3xl text-base leading-relaxed text-slate-200 md:text-lg">
                Techos y cubiertas · Pintura y acabados · Plomeria. Atencion en Medellin y Valle de Aburra con enfoque tecnico y ordenado.
              </p>
            </Reveal>

            <Reveal className="mt-8">
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={heroWaLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("cta_whatsapp_click", { source: "hero" })}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-orange-500 hover:shadow-lg active:scale-[0.98]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Hablar con un experto (WhatsApp)
                </a>
                <a
                  href={telLink}
                  onClick={() => track("cta_call_click", { source: "hero" })}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition-all duration-300 ease-out hover:bg-white/20 hover:shadow-lg active:scale-[0.98]"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Llamar ahora
                </a>
              </div>
            </Reveal>

            <Reveal className="mt-4">
              <ul className="flex flex-wrap gap-2 text-xs text-slate-100">
                {[
                  "Precios claros",
                  "Trabajo limpio",
                  "Garantia por escrito (segun servicio)",
                ].map((item) => (
                  <li key={item} className="rounded-full border border-white/30 bg-white/10 px-3 py-1">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section id="servicios" className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Cotizacion por linea</h2>
                  <p className="mt-3 max-w-3xl text-sm text-slate-600 md:text-base">
                    Selecciona la linea, revisa servicios base y abre una cotizacion rapida.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openQuoteModal({ linea: activeLine })}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-orange-500 hover:shadow-lg active:scale-[0.98]"
                >
                  Cotizar esta linea
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </Reveal>

            <Reveal className="mt-6">
              <div className="flex flex-wrap gap-2">
                {LINE_OPTIONS.map((line) => {
                  const isActive = activeLine === line.id;
                  const Icon = LINE_ICONS[line.id];

                  return (
                    <button
                      key={line.id}
                      type="button"
                      onClick={() => onLineSelect(line.id)}
                      className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold transition-all duration-300 ease-out active:scale-[0.98] ${
                        isActive
                          ? "border-orange-300 bg-orange-50 text-orange-700"
                          : "border-slate-300 bg-white text-slate-700 hover:border-orange-200"
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {line.label}
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {activeLineData.map((item, index) => (
                <Reveal key={item.id} className={index > 0 ? "" : ""}>
                  <button
                    type="button"
                    onClick={() => {
                      track("service_item_click", { source: "tab_card", linea: activeLine, servicio: item.id });
                      openQuoteModal({ linea: activeLine, servicio: item.name });
                    }}
                    className="group h-full w-full rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-[0_14px_32px_-30px_rgba(15,23,42,0.55)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-[0_18px_38px_-26px_rgba(249,115,22,0.35)] active:scale-[0.98]"
                  >
                    <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.summary}</p>
                    <p className="mt-4 text-sm font-medium text-slate-700">
                      <span className="text-slate-500">Desde </span>
                      {item.basePrice}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Precio base</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange-700">
                      Cotizar servicio
                      <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-5">
              <p className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs leading-relaxed text-slate-600">
                Valores base. El costo final depende del area, acceso, materiales y estado actual.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="planes" className="border-y border-slate-200 bg-white py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Planes y precios</h2>
              <p className="mt-3 max-w-3xl text-sm text-slate-600 md:text-base">
                Paquetes orientativos para hogares y negocios. Ajustamos el alcance tras la inspeccion tecnica.
              </p>
            </Reveal>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {PLAN_DATA.map((plan, index) => (
                <Reveal key={plan.id} className={index === 1 ? "" : ""}>
                  <article className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-[0_14px_32px_-30px_rgba(15,23,42,0.55)] transition-all duration-300 ease-out hover:border-orange-200 hover:shadow-[0_18px_38px_-26px_rgba(249,115,22,0.35)]">
                    <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
                    <p className="mt-2 text-2xl font-bold text-slate-950">{plan.price}</p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-600">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={buildWaLink({
                        linea: "Plan de servicio",
                        servicio: plan.name,
                        municipio: DEFAULT_CITY,
                        urgencia: "Solo cotizacion",
                      })}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => track("cta_whatsapp_click", { source: "plan", plan: plan.id })}
                      className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-slate-800 hover:shadow-lg active:scale-[0.98]"
                    >
                      Cotizar este plan
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-5">
              <p className="text-xs text-slate-600">Sujeto a inspeccion tecnica y condiciones del sitio.</p>
            </Reveal>
          </div>
        </section>

        <section id="resultados" className="bg-slate-50 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Antes y despues</h2>
              <p className="mt-3 max-w-3xl text-sm text-slate-600 md:text-base">
                Referencia visual para entender el cambio esperado segun el servicio.
              </p>
            </Reveal>

            <Reveal className="mt-7">
              <div className="rounded-2xl border border-slate-200 bg-slate-950 p-4 md:p-6">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                  <Image
                    src="/media/roof-after.svg"
                    alt="Estado despues de la intervencion"
                    fill
                    sizes="(max-width: 768px) 100vw, 1100px"
                    className="object-cover"
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
                      sizes="(max-width: 768px) 100vw, 1100px"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-y-0" style={{ left: `calc(${sliderPercent}% - 1px)` }} aria-hidden="true">
                    <div className="h-full w-0.5 bg-white/90" />
                    <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/60 text-xs font-semibold text-white">
                      {sliderPercent}%
                    </div>
                  </div>
                  <span className="absolute left-3 top-3 rounded bg-black/55 px-2 py-1 text-xs font-medium text-white">Antes</span>
                  <span className="absolute right-3 top-3 rounded bg-orange-600/90 px-2 py-1 text-xs font-medium text-white">Despues</span>
                </div>

                <div className="mt-4">
                  <label htmlFor="before-after-slider" className="block text-sm text-slate-200">
                    Comparador antes y despues
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
                    aria-label="Comparador antes y despues"
                    aria-valuetext={`${sliderPercent}%`}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="cobertura" className="border-y border-slate-200 bg-white py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Cobertura local</h2>
              <p className="mt-3 text-sm text-slate-600 md:text-base">
                Atendemos hogares y negocios en Medellin, Valle de Aburra y municipios de Antioquia (segun disponibilidad).
              </p>
              <p className="mt-2 text-sm text-slate-600 md:text-base">
                Nuestro equipo especializado coordina visitas por zona para dar respuesta rapida y ordenada.
              </p>
            </Reveal>

            <Reveal className="mt-6">
              <ul className="grid grid-cols-2 gap-2 text-sm text-slate-700 sm:grid-cols-3 md:grid-cols-4">
                {MUNICIPALITY_OPTIONS.map((municipio) => (
                  <li key={municipio} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                      <ChevronDown className="h-3 w-3 -rotate-90" aria-hidden="true" />
                    </span>
                    {municipio}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-6">
              <a
                href={buildWaLink({
                  linea: "Confirmacion de cobertura",
                  servicio: "Visita tecnica",
                  municipio: DEFAULT_CITY,
                  urgencia: "Solo cotizacion",
                })}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("cta_whatsapp_click", { source: "coverage" })}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-orange-500 hover:shadow-lg active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Confirmar cobertura por WhatsApp
              </a>
            </Reveal>
          </div>
        </section>

        <section id="resolver-ahora" className="bg-slate-50 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
              <Reveal>
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Resolver ahora</h2>
                  <p className="mt-3 text-sm text-slate-600 md:text-base">
                    Completa este formulario corto y abrimos WhatsApp con tu solicitud prellenada.
                  </p>
                  <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                    <p className="font-semibold text-slate-900">Que incluye este paso</p>
                    <ul className="mt-2 space-y-1">
                      <li>Diagnostico inicial por linea de servicio</li>
                      <li>Cotizacion orientativa y disponibilidad</li>
                      <li>Coordinacion por WhatsApp o llamada</li>
                    </ul>
                    <p className="mt-3 text-xs text-slate-500">Sujeto a inspeccion tecnica y condiciones del sitio.</p>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <form onSubmit={onResolverSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_16px_36px_-30px_rgba(15,23,42,0.55)] md:p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-slate-700">
                      Nombre
                      <input
                        type="text"
                        required
                        value={resolverState.nombre}
                        onChange={(event) => setResolverState((prev) => ({ ...prev, nombre: event.target.value }))}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                      />
                    </label>
                    <label className="block text-sm font-medium text-slate-700">
                      Telefono
                      <input
                        type="tel"
                        required
                        value={resolverState.telefono}
                        onChange={(event) => setResolverState((prev) => ({ ...prev, telefono: event.target.value }))}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                      />
                    </label>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-slate-700">
                      Municipio
                      <select
                        value={resolverState.municipio}
                        onChange={(event) => setResolverState((prev) => ({ ...prev, municipio: event.target.value }))}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                      >
                        {MUNICIPALITY_OPTIONS.map((municipio) => (
                          <option key={municipio} value={municipio}>
                            {municipio}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block text-sm font-medium text-slate-700">
                      Linea
                      <select
                        value={resolverState.linea}
                        onChange={(event) => {
                          const nextLine = event.target.value as ServiceLineId;
                          const firstService = SERVICE_DATA[nextLine][0].name;
                          setResolverState((prev) => ({ ...prev, linea: nextLine, servicio: firstService }));
                        }}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                      >
                        {LINE_OPTIONS.map((line) => (
                          <option key={line.id} value={line.id}>
                            {line.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-slate-700">
                      Tipo de servicio
                      <select
                        value={resolverState.servicio}
                        onChange={(event) => setResolverState((prev) => ({ ...prev, servicio: event.target.value }))}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                      >
                        {resolverServices.map((service) => (
                          <option key={service.id} value={service.name}>
                            {service.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block text-sm font-medium text-slate-700">
                      Urgencia
                      <select
                        value={resolverState.urgencia}
                        onChange={(event) => setResolverState((prev) => ({ ...prev, urgencia: event.target.value }))}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                      >
                        {URGENCY_OPTIONS.map((urgency) => (
                          <option key={urgency} value={urgency}>
                            {urgency}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="mt-4 block text-sm font-medium text-slate-700">
                    Detalle
                    <textarea
                      rows={3}
                      value={resolverState.detalle}
                      onChange={(event) => setResolverState((prev) => ({ ...prev, detalle: event.target.value }))}
                      className="mt-1 w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                    />
                  </label>

                  <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    <button
                      type="submit"
                      className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-orange-500 hover:shadow-lg active:scale-[0.98]"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Hablar con un experto
                    </button>
                    <a
                      href={telLink}
                      onClick={() => track("cta_call_click", { source: "resolver_form" })}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-900 transition-all duration-300 ease-out hover:border-orange-300 active:scale-[0.98]"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      Llamar
                    </a>
                  </div>

                  {showCallFallback ? (
                    <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                      Si WhatsApp no se abrio, usa la llamada directa para continuar.
                    </p>
                  ) : null}
                </form>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Preguntas frecuentes</h2>
            </Reveal>

            <div className="mt-6 space-y-3">
              {FAQ_ITEMS.map((item) => {
                const isOpen = activeFaq === item.id;
                return (
                  <Reveal key={item.id}>
                    <div className="rounded-xl border border-slate-200 bg-slate-50">
                      <button
                        type="button"
                        onClick={() => setActiveFaq((prev) => (prev === item.id ? "" : item.id))}
                        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-slate-900 transition-all duration-300 ease-out hover:bg-white"
                        aria-expanded={isOpen}
                        aria-controls={`${item.id}-panel`}
                      >
                        {item.question}
                        <ChevronDown
                          className={`h-4 w-4 transition-all duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                          aria-hidden="true"
                        />
                      </button>
                      {isOpen ? (
                        <div id={`${item.id}-panel`} className="border-t border-slate-200 px-4 py-3 text-sm text-slate-600">
                          {item.answer}
                        </div>
                      ) : null}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-slate-950 py-10 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-semibold">{COMPANY_NAME}</p>
              <p className="mt-1 text-sm text-slate-300">
                Tecnicos especializados para techos, pintura y plomeria en Medellin y Valle de Aburra.
              </p>
              <p className="mt-1 text-xs text-slate-400">Te contactamos lo antes posible por WhatsApp o llamada.</p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => openQuoteModal({ linea: activeLine })}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-orange-500 active:scale-[0.98]"
              >
                Resolver ahora
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <a
                href={heroWaLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("cta_whatsapp_click", { source: "footer" })}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-600 px-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:border-orange-400 active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Hablar con un experto
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-slate-800 pt-4 text-xs text-slate-400">
            <Link href="/terminos" className="hover:text-white">
              Terminos y condiciones
            </Link>
            <Link href="/privacidad" className="hover:text-white">
              Politica de privacidad
            </Link>
            <a href={SITE_URL} className="hover:text-white">
              Sitio principal
            </a>
            <span>Telefono: {PHONE_DISPLAY}</span>
          </div>
        </div>
      </footer>

      <div className="pointer-events-none fixed bottom-6 right-6 z-[70] hidden md:block">
        <a
          href={heroWaLink}
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir WhatsApp"
          onClick={() => track("cta_whatsapp_click", { source: "floating" })}
          className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-slate-900 shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98]"
        >
          <WhatsAppIcon className="h-5 w-5" />
        </a>
      </div>

      <div
        className="fixed inset-x-0 bottom-0 z-[75] border-t border-slate-200 bg-white/95 px-3 py-2 backdrop-blur md:hidden"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.5rem)" }}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2">
          <a
            href={heroWaLink}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("cta_whatsapp_click", { source: "mobile_bar" })}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 text-sm font-semibold text-slate-900 active:scale-[0.98]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href={telLink}
            onClick={() => track("cta_call_click", { source: "mobile_bar" })}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 text-sm font-semibold text-white active:scale-[0.98]"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Llamar
          </a>
        </div>
      </div>

      {isQuoteModalOpen ? (
        <div className="fixed inset-0 z-[90] bg-slate-950/55 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Modal de cotizacion"
            className="mx-auto mt-20 max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl md:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-600">Cotizacion rapida</p>
                <h3 className="mt-1 text-2xl font-semibold text-slate-900">Cotizar esta linea</h3>
              </div>
              <button
                type="button"
                aria-label="Cerrar modal"
                onClick={() => setIsQuoteModalOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-700"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={onQuoteSubmit} className="mt-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Nombre
                  <input
                    type="text"
                    value={quoteModalState.nombre}
                    onChange={(event) =>
                      setQuoteModalState((prev) => ({ ...prev, nombre: event.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Telefono
                  <input
                    type="tel"
                    value={quoteModalState.telefono}
                    onChange={(event) =>
                      setQuoteModalState((prev) => ({ ...prev, telefono: event.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Linea
                  <select
                    value={quoteModalState.linea}
                    onChange={(event) => {
                      const nextLine = event.target.value as ServiceLineId;
                      setQuoteModalState((prev) => ({
                        ...prev,
                        linea: nextLine,
                        servicio: SERVICE_DATA[nextLine][0].name,
                      }));
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                  >
                    {LINE_OPTIONS.map((line) => (
                      <option key={line.id} value={line.id}>
                        {line.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Servicio
                  <select
                    value={quoteModalState.servicio}
                    onChange={(event) =>
                      setQuoteModalState((prev) => ({ ...prev, servicio: event.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                  >
                    {SERVICE_DATA[quoteModalState.linea].map((service) => (
                      <option key={service.id} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Municipio
                  <select
                    value={quoteModalState.municipio}
                    onChange={(event) =>
                      setQuoteModalState((prev) => ({ ...prev, municipio: event.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                  >
                    {MUNICIPALITY_OPTIONS.map((municipio) => (
                      <option key={municipio} value={municipio}>
                        {municipio}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Urgencia
                  <select
                    value={quoteModalState.urgencia}
                    onChange={(event) =>
                      setQuoteModalState((prev) => ({ ...prev, urgencia: event.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
                  >
                    {URGENCY_OPTIONS.map((urgency) => (
                      <option key={urgency} value={urgency}>
                        {urgency}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-orange-500 active:scale-[0.98]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Enviar por WhatsApp
                </button>
                <a
                  href={telLink}
                  onClick={() => track("cta_call_click", { source: "modal" })}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-900 active:scale-[0.98]"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Llamar
                </a>
              </div>
              <p className="text-xs text-slate-500">Sujeto a inspeccion tecnica y condiciones del sitio.</p>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
