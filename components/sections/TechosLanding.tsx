"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ComponentType,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CloudSun,
  CheckCircle2,
  CircleAlert,
  ChevronDown,
  Droplets,
  FileText,
  MapPin,
  Menu,
  MessageCircle,
  Paintbrush,
  Phone,
  Search,
  ShieldCheck,
  Star,
  Thermometer,
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
  SERVICE_DATA,
  SITE_URL,
  URGENCY_OPTIONS,
  type ServiceLineId,
} from "@/lib/conversion";
import CoverageMap from "@/components/sections/CoverageMap";
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

type ProcessStep = {
  id: string;
  title: string;
  detail: string;
  note: string;
  icon: ComponentType<LineIconProps>;
};

type ServiceScenario = {
  id: string;
  linea: ServiceLineId;
  municipio: string;
  title: string;
  summary: string;
  service: string;
  urgencia: string;
};

type WeatherSnapshot = {
  municipality: string;
  temperature: number;
  feelsLike: number;
  humidity: number | null;
  description: string;
  updatedAt: string;
};

const LINE_ICONS: Record<ServiceLineId, ComponentType<LineIconProps>> = {
  techos: Wrench,
  pintura: Paintbrush,
  plomeria: Droplets,
};

const LINE_LABEL_BY_ID: Record<ServiceLineId, string> = {
  techos: "Techos y cubiertas",
  pintura: "Pintura y acabados",
  plomeria: "Plomeria",
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "brief",
    title: "Brief de necesidad",
    detail:
      "Escuchamos el problema, validamos urgencia y definimos la linea de servicio adecuada para tu caso.",
    note: "Inicias por WhatsApp o llamada, sin formularios largos.",
    icon: MessageCircle,
  },
  {
    id: "diagnostic",
    title: "Diagnostico en sitio",
    detail:
      "Revisamos acceso, estado actual y puntos criticos para proponer una solucion aterrizada.",
    note: "Equipos de diagnostico segun el caso.",
    icon: Search,
  },
  {
    id: "proposal",
    title: "Alcance y valor base",
    detail:
      "Definimos actividades, materiales y valor base para que tomes la decision con claridad.",
    note: "Siempre sujeto a inspeccion tecnica y condiciones del sitio.",
    icon: FileText,
  },
  {
    id: "execution",
    title: "Ejecucion coordinada",
    detail:
      "Programamos, ejecutamos y dejamos el area limpia con cierre tecnico y recomendaciones de cuidado.",
    note: "Garantia por escrito segun servicio y alcance.",
    icon: ShieldCheck,
  },
];

const LINE_STORY: Record<
  ServiceLineId,
  { title: string; summary: string; bullets: [string, string, string] }
> = {
  techos: {
    title: "Cubiertas preparadas para temporada de lluvias",
    summary:
      "Atendemos goteras, sellos, canoas y puntos de filtracion para hogares y locales en el Valle de Aburra.",
    bullets: [
      "Diagnostico de filtraciones visibles",
      "Intervencion segun acceso y pendiente",
      "Mantenimiento preventivo por zonas",
    ],
  },
  pintura: {
    title: "Acabados limpios para vivienda y comercio",
    summary:
      "Preparamos superficie, corregimos detalles y aplicamos acabados con enfoque en durabilidad y presentacion.",
    bullets: [
      "Resanes y correccion de superficie",
      "Pintura interior y exterior",
      "Retoques de entrega post-obra",
    ],
  },
  plomeria: {
    title: "Red hidraulica funcional y sin fugas recurrentes",
    summary:
      "Revisamos puntos criticos de cocina, bano y red interna para resolver fugas y obstrucciones.",
    bullets: [
      "Deteccion de fugas visibles",
      "Destapes y ajustes hidrosanitarios",
      "Mantenimiento preventivo basico",
    ],
  },
};

const FREQUENT_SCENARIOS: ServiceScenario[] = [
  {
    id: "lluvia-medellin",
    linea: "techos",
    municipio: "Medellin",
    title: "Goteras despues de lluvia fuerte",
    summary:
      "Revisamos cubierta, juntas y pendientes para definir correccion inmediata segun acceso.",
    service: "Reparacion de goteras",
    urgencia: "Esta semana",
  },
  {
    id: "canoas-envigado",
    linea: "techos",
    municipio: "Envigado",
    title: "Canoas con obstruccion recurrente",
    summary:
      "Limpieza, ajuste y verificacion de bajantes para mejorar evacuacion de agua.",
    service: "Mantenimiento de canoas y bajantes",
    urgencia: "Esta semana",
  },
  {
    id: "muros-bello",
    linea: "pintura",
    municipio: "Bello",
    title: "Muros con desgaste y manchas",
    summary:
      "Preparamos superficie, corregimos imperfecciones visibles y aplicamos acabado limpio.",
    service: "Resanes y acabados",
    urgencia: "Solo cotizacion",
  },
  {
    id: "fuga-itagui",
    linea: "plomeria",
    municipio: "Itagui",
    title: "Fuga en cocina o bano",
    summary:
      "Ubicamos punto de perdida visible y ajustamos conexiones para detener filtraciones.",
    service: "Reparacion de fugas",
    urgencia: "Hoy",
  },
  {
    id: "presion-sabaneta",
    linea: "plomeria",
    municipio: "Sabaneta",
    title: "Baja presion en puntos de consumo",
    summary:
      "Revisamos llaves y red interna para plantear ajuste de caudal segun instalacion.",
    service: "Revision de presion y caudal",
    urgencia: "Solo cotizacion",
  },
];

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

const HERO_CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const HERO_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

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

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const style: CSSProperties | undefined = delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <div data-reveal className={`reveal-item ${className}`} style={style}>
      {children}
    </div>
  );
}

function ServiceStorySvg({
  activeLine,
  shouldReduceMotion,
}: {
  activeLine: ServiceLineId;
  shouldReduceMotion: boolean;
}) {
  const roofIsActive = activeLine === "techos";
  const paintIsActive = activeLine === "pintura";
  const pipeIsActive = activeLine === "plomeria";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-2xl transition-colors duration-500 ${
          roofIsActive ? "bg-orange-200/80" : paintIsActive ? "bg-cyan-200/80" : "bg-emerald-200/80"
        }`}
        aria-hidden="true"
      />
      <svg
        viewBox="0 0 360 270"
        className="relative h-auto w-full"
        role="img"
        aria-label="Ilustracion de lineas de servicio para hogar"
      >
        <defs>
          <linearGradient id="roof-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fb923c" stopOpacity={roofIsActive ? 0.96 : 0.36} />
            <stop offset="100%" stopColor="#f97316" stopOpacity={roofIsActive ? 0.96 : 0.2} />
          </linearGradient>
          <linearGradient id="wall-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={paintIsActive ? "#67e8f9" : "#e2e8f0"} stopOpacity={paintIsActive ? 0.88 : 0.65} />
            <stop offset="100%" stopColor={paintIsActive ? "#0891b2" : "#cbd5e1"} stopOpacity={paintIsActive ? 0.82 : 0.6} />
          </linearGradient>
        </defs>

        <rect x="42" y="58" width="276" height="170" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
        <polygon points="180,24 84,86 276,86" fill="url(#roof-gradient)" stroke="#fed7aa" strokeWidth="1.4" />
        <rect x="108" y="92" width="144" height="112" rx="8" fill="url(#wall-gradient)" stroke="#cbd5e1" strokeWidth="1.2" />
        <rect x="166" y="136" width="30" height="68" rx="4" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.1" />
        <rect x="122" y="108" width="28" height="26" rx="4" fill="#e2e8f0" stroke="#bae6fd" strokeWidth="1.1" />
        <rect x="210" y="108" width="28" height="26" rx="4" fill="#e2e8f0" stroke="#bae6fd" strokeWidth="1.1" />

        <path
          d="M274 88 L274 190 L306 190"
          fill="none"
          stroke={pipeIsActive ? "#4ade80" : "#64748b"}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M306 190 L306 222 L260 222"
          fill="none"
          stroke={pipeIsActive ? "#22c55e" : "#64748b"}
          strokeWidth="4"
          strokeLinecap="round"
        />

        <text x="64" y="250" fill="#334155" fontSize="12" fontFamily="var(--font-inter)">
          Techos y cubiertas
        </text>
        <text x="156" y="250" fill="#334155" fontSize="12" fontFamily="var(--font-inter)">
          Pintura y acabados
        </text>
        <text x="258" y="250" fill="#334155" fontSize="12" fontFamily="var(--font-inter)">
          Plomeria
        </text>

        {!shouldReduceMotion ? (
          <motion.circle
            cx={roofIsActive ? 180 : paintIsActive ? 180 : 290}
            cy={roofIsActive ? 56 : paintIsActive ? 150 : 190}
            r={roofIsActive ? 18 : paintIsActive ? 20 : 16}
            fill={roofIsActive ? "#fb923c" : paintIsActive ? "#22d3ee" : "#4ade80"}
            opacity={0.2}
            animate={{ r: [16, 24, 16], opacity: [0.14, 0.28, 0.14] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : null}
      </svg>
    </div>
  );
}

function ProcessStorySvg({
  activeStepIndex,
  shouldReduceMotion,
}: {
  activeStepIndex: number;
  shouldReduceMotion: boolean;
}) {
  const clampedIndex = Math.min(PROCESS_STEPS.length - 1, Math.max(0, activeStepIndex));
  const progressX = 72 + clampedIndex * 86;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-5">
      <div
        className="pointer-events-none absolute -left-10 top-0 h-36 w-36 rounded-full bg-orange-200/60 blur-2xl"
        aria-hidden="true"
      />
      <svg
        viewBox="0 0 420 280"
        className="relative h-auto w-full"
        role="img"
        aria-label="Diagrama del proceso de trabajo en cuatro pasos"
      >
        <defs>
          <linearGradient id="process-route" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>

        <rect x="26" y="46" width="368" height="164" rx="18" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
        <path
          d="M72 132 C120 72, 200 72, 248 132 C292 184, 330 184, 348 132"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="6 8"
        />
        <motion.path
          d="M72 132 C120 72, 200 72, 248 132 C292 184, 330 184, 348 132"
          fill="none"
          stroke="url(#process-route)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="360"
          animate={{ strokeDashoffset: 360 - clampedIndex * 92 - 96 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }}
        />

        {PROCESS_STEPS.map((step, index) => {
          const x = 72 + index * 86;
          const y = index % 2 === 0 ? 132 : 112;
          const isActive = index <= clampedIndex;

          return (
            <g key={step.id}>
              <circle
                cx={x}
                cy={y}
                r={isActive ? 12 : 8}
                fill={isActive ? "#f97316" : "#94a3b8"}
                stroke={isActive ? "#fdba74" : "#cbd5e1"}
                strokeWidth="1.5"
              />
              <text
                x={x}
                y={y + 30}
                textAnchor="middle"
                fill={isActive ? "#0f172a" : "#475569"}
                fontSize="11"
                fontFamily="var(--font-inter)"
                fontWeight={isActive ? 700 : 500}
              >
                Paso {index + 1}
              </text>
            </g>
          );
        })}

        {!shouldReduceMotion ? (
          <motion.circle
            cx={progressX}
            cy={clampedIndex % 2 === 0 ? 132 : 112}
            r={15}
            fill="#fb923c"
            opacity={0.16}
            animate={{ r: [14, 21, 14], opacity: [0.12, 0.24, 0.12] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : null}
      </svg>
    </div>
  );
}

function ValleyStorySvg({
  activeLine,
  selectedMunicipality,
  shouldReduceMotion,
}: {
  activeLine: ServiceLineId;
  selectedMunicipality: string;
  shouldReduceMotion: boolean;
}) {
  const accentColor =
    activeLine === "techos"
      ? "#f97316"
      : activeLine === "pintura"
        ? "#0891b2"
        : "#16a34a";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
      <div
        className="pointer-events-none absolute -right-8 top-4 h-28 w-28 rounded-full bg-orange-100 blur-2xl"
        aria-hidden="true"
      />
      <svg
        viewBox="0 0 420 260"
        className="relative h-auto w-full"
        role="img"
        aria-label="Mapa narrativo de servicios en el Valle de Aburra"
      >
        <path
          d="M40 165 C52 90, 110 48, 176 40 C240 34, 302 58, 334 102 C360 136, 362 185, 330 214 C294 246, 244 244, 194 232 C136 218, 72 218, 40 165 Z"
          fill="#f8fafc"
          stroke="#cbd5e1"
          strokeWidth="1.5"
        />
        <path
          d="M84 176 C118 136, 144 118, 176 120 C205 122, 233 144, 272 142 C292 142, 313 133, 336 116"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="3"
          strokeDasharray="6 8"
          strokeLinecap="round"
        />
        <motion.path
          d="M84 176 C118 136, 144 118, 176 120 C205 122, 233 144, 272 142 C292 142, 313 133, 336 116"
          fill="none"
          stroke={accentColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="240"
          animate={{ strokeDashoffset: [240, 0] }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 1.25, ease: "easeOut", repeat: Infinity, repeatDelay: 1.8 }
          }
        />

        <circle cx="106" cy="164" r="8" fill="#f97316" />
        <circle cx="178" cy="122" r="8" fill="#f97316" />
        <circle cx="260" cy="142" r="8" fill="#f97316" />
        <circle cx="336" cy="116" r="9" fill="#0f172a" />

        {!shouldReduceMotion ? (
          <motion.circle
            cx="336"
            cy="116"
            r={18}
            fill="#f97316"
            opacity={0.16}
            animate={{ r: [16, 24, 16], opacity: [0.1, 0.24, 0.1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : null}

        <text x="80" y="200" fill="#334155" fontSize="12" fontFamily="var(--font-inter)">
          Medellin
        </text>
        <text x="156" y="98" fill="#334155" fontSize="12" fontFamily="var(--font-inter)">
          Envigado
        </text>
        <text x="245" y="168" fill="#334155" fontSize="12" fontFamily="var(--font-inter)">
          Sabaneta
        </text>
        <text x="308" y="98" fill="#0f172a" fontSize="12" fontWeight="700" fontFamily="var(--font-inter)">
          {selectedMunicipality}
        </text>
      </svg>
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
  const [activeProcessStep, setActiveProcessStep] = useState(PROCESS_STEPS[0].id);
  const [selectedCoverageMunicipality, setSelectedCoverageMunicipality] = useState("Medellin");
  const [weatherSnapshot, setWeatherSnapshot] = useState<WeatherSnapshot | null>(
    null,
  );
  const [weatherStatus, setWeatherStatus] = useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");
  const [showCallFallback, setShowCallFallback] = useState(false);
  const [quoteModalState, setQuoteModalState] = useState<QuoteModalState>(INITIAL_QUOTE_STATE);
  const [resolverState, setResolverState] = useState<ResolverFormState>(INITIAL_RESOLVER_STATE);

  const telLink = useMemo(() => buildTelLink(), []);
  const activeLineLabel = useMemo(() => LINE_LABEL_BY_ID[activeLine], [activeLine]);
  const heroWaLink = useMemo(
    () =>
      buildWaLink({
        linea: activeLineLabel,
        servicio: "Diagnostico inicial",
        municipio: selectedCoverageMunicipality || DEFAULT_CITY,
        urgencia: "Solo cotizacion",
      }),
    [activeLineLabel, selectedCoverageMunicipality],
  );

  const activeLineData = useMemo(() => SERVICE_DATA[activeLine], [activeLine]);
  const activeLineStory = useMemo(() => LINE_STORY[activeLine], [activeLine]);
  const resolverServices = useMemo(
    () => SERVICE_DATA[resolverState.linea],
    [resolverState.linea],
  );
  const activeProcessIndex = useMemo(
    () => Math.max(0, PROCESS_STEPS.findIndex((step) => step.id === activeProcessStep)),
    [activeProcessStep],
  );
  const activeProcessData = useMemo(
    () => PROCESS_STEPS[activeProcessIndex] ?? PROCESS_STEPS[0],
    [activeProcessIndex],
  );
  const coverageMunicipalities = useMemo(
    () => MUNICIPALITY_OPTIONS.filter((municipio) => municipio !== "Otro"),
    [],
  );
  const extraCoverageMunicipalities = useMemo(() => {
    return coverageMunicipalities.filter(
      (municipio) => municipio !== selectedCoverageMunicipality,
    );
  }, [coverageMunicipalities, selectedCoverageMunicipality]);
  const prioritizedScenarios = useMemo(
    () =>
      [...FREQUENT_SCENARIOS].sort(
        (a, b) => Number(b.linea === activeLine) - Number(a.linea === activeLine),
      ),
    [activeLine],
  );
  const coverageWaLink = useMemo(
    () =>
      buildWaLink({
        linea: "Confirmacion de cobertura",
        servicio: "Visita tecnica",
        municipio: selectedCoverageMunicipality || DEFAULT_CITY,
        urgencia: "Solo cotizacion",
      }),
    [selectedCoverageMunicipality],
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

  useEffect(() => {
    const controller = new AbortController();

    const fetchWeather = async () => {
      setWeatherStatus("loading");

      try {
        const response = await fetch(
          `/api/weather?municipio=${encodeURIComponent(selectedCoverageMunicipality)}`,
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error("weather_request_failed");
        }

        const payload = await response.json();

        if (!payload?.ok) {
          throw new Error("weather_payload_failed");
        }

        setWeatherSnapshot({
          municipality: payload.municipality,
          temperature: payload.temperature,
          feelsLike: payload.feelsLike,
          humidity: payload.humidity,
          description: payload.description,
          updatedAt: payload.updatedAt,
        });
        setWeatherStatus("ready");
      } catch {
        if (controller.signal.aborted) {
          return;
        }
        setWeatherStatus("error");
      }
    };

    fetchWeather();

    return () => controller.abort();
  }, [selectedCoverageMunicipality]);

  const onCoverageSelect = (
    municipio: string,
    source: "mapa" | "chip" | "scenario" | "mapbox",
  ) => {
    setSelectedCoverageMunicipality(municipio);
    setResolverState((prev) => ({ ...prev, municipio }));
    setQuoteModalState((prev) => ({ ...prev, municipio }));
    track("coverage_map_select", { municipio, source });
  };

  const onLineSelect = (linea: ServiceLineId, source: string = "tabs") => {
    setActiveLine(linea);
    track("service_tab_select", { source, linea });
  };

  const onProcessStepSelect = (
    stepId: string,
    source: "timeline" | "list" | "cta",
  ) => {
    setActiveProcessStep(stepId);
    track("process_step_select", { source, step: stepId });
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

  const ActiveProcessIcon = activeProcessData.icon;

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
                className="nav-link-hover relative text-sm text-slate-600 transition-all duration-300 ease-out hover:text-slate-950"
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
        <section id="inicio" className="border-b border-slate-200 bg-white pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <motion.div
                variants={HERO_CONTAINER_VARIANTS}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={HERO_ITEM_VARIANTS}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3.5 py-1.5 text-sm font-medium text-orange-600">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    Valle de Aburra + Antioquia
                  </span>
                </motion.div>

                <motion.h1
                  variants={HERO_ITEM_VARIANTS}
                  className="mt-5 text-5xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-6xl"
                >
                  Soluciones integrales para tu hogar y negocio
                </motion.h1>

                <motion.p
                  variants={HERO_ITEM_VARIANTS}
                  className="mt-6 text-lg leading-relaxed text-slate-600"
                >
                  Techos y cubiertas · Pintura y acabados · Plomeria. Coordinamos visitas en Medellin y el Valle de Aburra con diagnostico tecnico, orden en la ejecucion y cotizacion clara desde el inicio.
                </motion.p>

                <motion.div
                  variants={HERO_ITEM_VARIANTS}
                  className="mt-6 flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4"
                >
                  <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
                  <p className="text-sm font-medium text-amber-900">
                    Si tienes filtraciones o goteras, te guiamos para priorizar intervencion y costo base.
                  </p>
                </motion.div>

                <motion.div variants={HERO_ITEM_VARIANTS} className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <motion.a
                    href={heroWaLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => track("cta_whatsapp_click", { source: "hero", linea: activeLine })}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-600/20 transition-colors duration-300 hover:bg-orange-700"
                    whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
                    whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Hablar con un experto
                  </motion.a>
                  <motion.a
                    href={telLink}
                    onClick={() => track("cta_call_click", { source: "hero" })}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 transition-colors duration-300 hover:bg-slate-50"
                    whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
                    whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
                  >
                    <Phone className="h-5 w-5" aria-hidden="true" />
                    Llamar ahora
                  </motion.a>
                </motion.div>

                <motion.ul variants={HERO_ITEM_VARIANTS} className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
                  {[
                    "Precios claros desde el inicio",
                    "Trabajo limpio y coordinado",
                    "Garantia por escrito (segun servicio)",
                  ].map((item) => (
                    <li key={item} className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </motion.ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="lg:pl-2"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-100 bg-slate-200 shadow-2xl">
                  {!shouldReduceMotion && !videoFailed ? (
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
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
                    />
                  ) : (
                    <Image
                      src="/video/slow-majestic-poster.jpg"
                      alt="Trabajo de Espinal Multiservicios en Medellin"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />

                  <motion.div
                    className="absolute bottom-4 left-4 flex items-center gap-3 rounded-xl border border-white/50 bg-white/95 p-4 shadow-lg backdrop-blur"
                    animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
                    transition={shouldReduceMotion ? undefined : { duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Star className="h-5 w-5 text-amber-400" aria-hidden="true" />
                    <p className="text-sm font-bold text-slate-800">Atencion bien valorada en Medellin</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="servicios" className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Cotizacion en linea por linea de servicio
              </h2>
              <p className="mt-3 max-w-4xl text-sm text-slate-600 md:text-base">
                Pensado para Medellin y el Valle de Aburra: selecciona tu linea, revisa servicios reales y abre una cotizacion directa sin vueltas.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
              <Reveal className="lg:sticky lg:top-28 lg:self-start" delay={70}>
                <ServiceStorySvg activeLine={activeLine} shouldReduceMotion={shouldReduceMotion} />

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-sm font-semibold text-slate-900">{activeLineStory.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{activeLineStory.summary}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
                    {activeLineStory.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-500" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <div>
                <Reveal className="flex flex-wrap gap-2" delay={80}>
                  {LINE_OPTIONS.map((line) => {
                    const isActive = activeLine === line.id;
                    const Icon = LINE_ICONS[line.id];

                    return (
                      <button
                        key={line.id}
                        type="button"
                        onClick={() => onLineSelect(line.id, "servicios")}
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
                </Reveal>

                <Reveal className="mt-4" delay={130}>
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_34px_-30px_rgba(15,23,42,0.6)]">
                    {activeLineData.map((item, index) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          track("service_item_click", { source: "service_list", linea: activeLine, servicio: item.id });
                          openQuoteModal({ linea: activeLine, servicio: item.name });
                        }}
                        className={`group flex w-full items-start justify-between gap-4 px-4 py-4 text-left transition-all duration-300 ease-out hover:bg-slate-50 active:scale-[0.995] ${
                          index < activeLineData.length - 1 ? "border-b border-slate-200" : ""
                        }`}
                      >
                        <div>
                          <h3 className="text-sm font-semibold text-slate-900 md:text-base">{item.name}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.summary}</p>
                          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-orange-700">
                            Cotizar este servicio
                            <ArrowRight
                              className="h-3.5 w-3.5 transition-all duration-300 group-hover:translate-x-0.5"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-[11px] uppercase tracking-[0.08em] text-slate-500">Desde</p>
                          <p className="mt-1 text-sm font-semibold text-slate-900">{item.basePrice}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </Reveal>

                <Reveal className="mt-4 rounded-2xl border border-slate-200 bg-white p-4" delay={170}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-relaxed text-slate-600">
                      Valores base. El costo final depende del area, acceso, materiales y estado actual del sitio. Sujeto a inspeccion tecnica.
                    </p>
                    <button
                      type="button"
                      onClick={() => openQuoteModal({ linea: activeLine })}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-orange-500 hover:shadow-lg active:scale-[0.98]"
                    >
                      Abrir cotizacion rapida
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section id="proceso" className="border-y border-slate-200 bg-white py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Asi trabajamos, paso a paso
              </h2>
              <p className="mt-3 max-w-4xl text-sm text-slate-600 md:text-base">
                Un proceso claro, sin improvisacion: definimos prioridad, inspeccionamos, cotizamos y ejecutamos con orden.
              </p>
            </Reveal>

            <Reveal className="mt-6 flex flex-wrap gap-2" delay={60}>
              {PROCESS_STEPS.map((step, index) => {
                const isActive = activeProcessStep === step.id;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => onProcessStepSelect(step.id, "timeline")}
                    className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold transition-all duration-300 ease-out active:scale-[0.98] ${
                      isActive
                        ? "border-orange-300 bg-orange-50 text-orange-700"
                        : "border-slate-300 bg-white text-slate-700 hover:border-orange-200"
                    }`}
                    aria-pressed={isActive}
                  >
                    Paso {index + 1}
                    <span className="hidden text-xs font-medium text-slate-500 md:inline">
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </Reveal>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <Reveal delay={90}>
                <ProcessStorySvg
                  activeStepIndex={activeProcessIndex}
                  shouldReduceMotion={shouldReduceMotion}
                />
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Esta ruta muestra como avanzamos en un servicio real: de la definicion inicial a la ejecucion, con comunicacion clara y seguimiento en cada etapa.
                </p>
              </Reveal>

              <Reveal delay={130}>
                <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.4)] md:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-600">
                    Paso {activeProcessIndex + 1} de {PROCESS_STEPS.length}
                  </p>
                  <div className="mt-3 flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 text-orange-700">
                      <ActiveProcessIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">
                        {activeProcessData.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                        {activeProcessData.detail}
                      </p>
                      <p className="mt-3 text-sm text-slate-500">{activeProcessData.note}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onProcessStepSelect(
                          PROCESS_STEPS[Math.max(0, activeProcessIndex - 1)].id,
                          "list",
                        )
                      }
                      disabled={activeProcessIndex === 0}
                      className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-300 px-3 text-sm font-semibold text-slate-700 transition-all duration-300 ease-out hover:border-orange-300 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      Paso anterior
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onProcessStepSelect(
                          PROCESS_STEPS[
                            Math.min(PROCESS_STEPS.length - 1, activeProcessIndex + 1)
                          ].id,
                          "list",
                        )
                      }
                      disabled={activeProcessIndex === PROCESS_STEPS.length - 1}
                      className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-300 px-3 text-sm font-semibold text-slate-700 transition-all duration-300 ease-out hover:border-orange-300 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      Paso siguiente
                    </button>
                  </div>

                  <a
                    href={buildWaLink({
                      linea: "Proceso de servicio",
                      servicio: activeProcessData.title,
                      municipio: selectedCoverageMunicipality || DEFAULT_CITY,
                      urgencia: "Solo cotizacion",
                    })}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      track("cta_whatsapp_click", {
                        source: "process_focus",
                        step: activeProcessData.id,
                      })
                    }
                    className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-orange-500 hover:shadow-lg active:scale-[0.98]"
                  >
                    Hablar con un experto sobre este paso
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </article>

                <ul className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-slate-50">
                  {PROCESS_STEPS.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = activeProcessStep === step.id;

                    return (
                      <li key={step.id}>
                        <button
                          type="button"
                          onClick={() => onProcessStepSelect(step.id, "list")}
                          className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-all duration-300 ease-out ${
                            isActive ? "bg-white" : "hover:bg-white"
                          }`}
                          aria-pressed={isActive}
                        >
                          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-slate-900">
                              {index + 1}. {step.title}
                            </span>
                            <span className="mt-0.5 block text-xs text-slate-600">
                              {step.note}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="cobertura" className="bg-slate-50 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Cobertura local</h2>
              <p className="mt-3 text-sm text-slate-600 md:text-base">
                Atendemos hogares y negocios en Medellin, Valle de Aburra y municipios cercanos de Antioquia segun disponibilidad operativa.
              </p>
              <p className="mt-2 text-sm text-slate-600 md:text-base">
                Selecciona tu municipio para confirmar ruta y disponibilidad por WhatsApp.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <Reveal delay={70}>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                      Mapa operativo Valle de Aburra
                    </p>
                    <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                      {selectedCoverageMunicipality}
                    </span>
                  </div>
                  <CoverageMap
                    selectedMunicipality={selectedCoverageMunicipality}
                    onMunicipalitySelect={(municipio) =>
                      onCoverageSelect(municipio, "mapbox")
                    }
                  />
                </div>
              </Reveal>

              <div className="space-y-4">
                <Reveal delay={110}>
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm font-semibold text-slate-900">Municipio seleccionado</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{selectedCoverageMunicipality}</p>
                    <p className="mt-2 text-sm text-slate-600">
                      Confirma por WhatsApp disponibilidad de ruta para visita tecnica en {selectedCoverageMunicipality}.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={135}>
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm font-semibold text-slate-900">Condiciones actuales de referencia</p>
                    {weatherStatus === "loading" ? (
                      <p className="mt-2 text-sm text-slate-600">Consultando clima en {selectedCoverageMunicipality}...</p>
                    ) : null}

                    {weatherStatus === "ready" && weatherSnapshot ? (
                      <div className="mt-3 space-y-2 text-sm text-slate-600">
                        <p className="inline-flex items-center gap-2 text-slate-900">
                          <CloudSun className="h-4 w-4 text-orange-500" aria-hidden="true" />
                          {weatherSnapshot.description || "Condicion estable"}
                        </p>
                        <p className="inline-flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-orange-500" aria-hidden="true" />
                          {weatherSnapshot.temperature}°C (sensacion {weatherSnapshot.feelsLike}°C)
                        </p>
                        <p className="inline-flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-sky-500" aria-hidden="true" />
                          Humedad: {weatherSnapshot.humidity ?? "--"}%
                        </p>
                        <p className="text-xs text-slate-500">
                          Dato de referencia climatica para coordinar visita en {weatherSnapshot.municipality}.
                        </p>
                      </div>
                    ) : null}

                    {weatherStatus === "error" ? (
                      <p className="mt-2 text-sm text-slate-600">
                        Clima no disponible en este momento. Podemos coordinar visita igual por WhatsApp.
                      </p>
                    ) : null}
                  </div>
                </Reveal>

                <Reveal delay={150}>
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm font-semibold text-slate-900">
                      Otros municipios con atencion segun agenda
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {extraCoverageMunicipalities.map((municipio) => {
                        const isActive = selectedCoverageMunicipality === municipio;
                        return (
                          <button
                            key={municipio}
                            type="button"
                            onClick={() => onCoverageSelect(municipio, "chip")}
                            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-300 ease-out active:scale-[0.98] ${
                              isActive
                                ? "border-orange-300 bg-orange-50 text-orange-700"
                                : "border-slate-300 bg-white text-slate-700 hover:border-orange-200"
                            }`}
                          >
                            {municipio}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={190}>
                  <a
                    href={coverageWaLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      track("cta_whatsapp_click", {
                        source: "coverage",
                        municipio: selectedCoverageMunicipality,
                      })
                    }
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-orange-500 hover:shadow-lg active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Confirmar cobertura por WhatsApp
                  </a>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section id="escenarios-frecuentes" className="border-y border-slate-200 bg-white py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Storytelling de casos reales en el Valle de Aburra
              </h2>
              <p className="mt-3 max-w-4xl text-sm text-slate-600 md:text-base">
                Menos teoria y mas contexto real: revisa situaciones frecuentes por linea de servicio y abre tu caso con una ruta de atencion concreta.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <Reveal delay={70}>
                <ValleyStorySvg
                  activeLine={activeLine}
                  selectedMunicipality={selectedCoverageMunicipality}
                  shouldReduceMotion={shouldReduceMotion}
                />
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p>
                    Relacionamos cobertura, tipo de inmueble y urgencia para sugerir una ruta de trabajo realista desde el primer contacto.
                  </p>
                  <p>
                    Puedes tomar un escenario como base y abrir WhatsApp con la informacion prellenada para ahorrar tiempo.
                  </p>
                </div>
              </Reveal>

              <div className="rounded-2xl border border-slate-200 bg-white">
                {prioritizedScenarios.slice(0, 5).map((scenario, index) => (
                  <Reveal key={scenario.id} delay={90 + index * 40}>
                    <article
                      className={`px-4 py-4 transition-all duration-300 ease-out hover:bg-slate-50 md:px-5 ${
                        index < Math.min(prioritizedScenarios.length, 5) - 1 ? "border-b border-slate-200" : ""
                      }`}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                        {LINE_LABEL_BY_ID[scenario.linea]} · {scenario.municipio}
                      </p>
                      <h3 className="mt-1 text-base font-semibold text-slate-900">
                        {scenario.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">{scenario.summary}</p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <a
                          href={buildWaLink({
                            linea: LINE_LABEL_BY_ID[scenario.linea],
                            servicio: scenario.service,
                            municipio: scenario.municipio,
                            urgencia: scenario.urgencia,
                          })}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() =>
                            track("cta_whatsapp_click", {
                              source: "scenario",
                              linea: scenario.linea,
                              servicio: scenario.service,
                              municipio: scenario.municipio,
                            })
                          }
                          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-orange-500 active:scale-[0.98]"
                        >
                          Hablar de este caso
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            onLineSelect(scenario.linea, "scenario");
                            onCoverageSelect(scenario.municipio, "scenario");
                            openQuoteModal({ linea: scenario.linea, servicio: scenario.service });
                            track("service_item_click", {
                              source: "scenario",
                              linea: scenario.linea,
                              servicio: scenario.service,
                            });
                          }}
                          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition-all duration-300 ease-out hover:border-orange-300 active:scale-[0.98]"
                        >
                          Usar escenario en cotizacion
                        </button>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="resolver-ahora" className="bg-slate-50 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
              <Reveal>
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Resolver ahora</h2>
                  <p className="mt-3 text-sm text-slate-600 md:text-base">
                    Completa este formulario corto, sin pasos largos, y abrimos WhatsApp con tu solicitud prellenada.
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

      <footer className="border-t border-slate-200 bg-white py-10 text-slate-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-semibold">{COMPANY_NAME}</p>
              <p className="mt-1 text-sm text-slate-600">
                Equipo especializado en techos, pintura y plomeria para hogares y negocios en Medellin y Valle de Aburra.
              </p>
              <p className="mt-1 text-xs text-slate-500">Te contactamos lo antes posible por WhatsApp o llamada.</p>
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
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-800 transition-all duration-300 ease-out hover:border-orange-400 active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Hablar con un experto
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-slate-200 pt-4 text-xs text-slate-500">
            <Link href="/terminos" className="hover:text-slate-900">
              Terminos y condiciones
            </Link>
            <Link href="/privacidad" className="hover:text-slate-900">
              Politica de privacidad
            </Link>
            <a href={SITE_URL} className="hover:text-slate-900">
              Sitio principal
            </a>
            <span>Telefono: {PHONE_DISPLAY}</span>
          </div>
        </div>
      </footer>

      <div className="pointer-events-none fixed bottom-6 right-6 z-[70] hidden md:block">
        <div className="group relative">
          <span className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 translate-x-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
            WhatsApp
          </span>
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
                <h3 className="mt-1 text-2xl font-semibold text-slate-900">Cotizar por linea</h3>
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
