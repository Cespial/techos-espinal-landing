"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import {
  buildTelLink,
  buildWaLinkHero,
  buildWaLinkCoverage,
  DEFAULT_CITY,
  LINE_OPTIONS,
  SERVICE_DATA,
  type ServiceLineId,
} from "@/lib/conversion";
import { track } from "@/lib/tracking";

import StickyHeader from "@/components/sections/StickyHeader";
import Hero from "@/components/sections/Hero";
import ServiceTabs from "@/components/sections/ServiceTabs";
import HowWeWork from "@/components/sections/HowWeWork";
import BeforeAfterGallery from "@/components/sections/BeforeAfterGallery";
import CoverageAvailability from "@/components/sections/CoverageAvailability";
import FaqFooter from "@/components/sections/FaqFooter";
import MobileStickyBar from "@/components/sections/MobileStickyBar";
import QuoteModal from "@/components/sections/QuoteModal";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

type WeatherSnapshot = {
  municipality: string;
  temperature: number;
  feelsLike: number;
  humidity: number | null;
  description: string;
  updatedAt: string;
};

type QuoteModalOpenInput = {
  linea: ServiceLineId;
  servicio?: string;
  source: string;
};

/* ------------------------------------------------------------------ */
/*  Reveal helper (scroll-triggered)                                  */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const style: CSSProperties | undefined =
    delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <div data-reveal className={`reveal-item ${className}`} style={style}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main orchestrator                                                 */
/* ------------------------------------------------------------------ */

export default function TechosLanding() {
  const shouldReduceMotion = Boolean(useReducedMotion());

  /* ---------- Core state ---------- */
  const [activeLine, setActiveLine] = useState<ServiceLineId>("techos");
  const [selectedCoverageMunicipality, setSelectedCoverageMunicipality] =
    useState("Medellin");
  const [weatherSnapshot, setWeatherSnapshot] =
    useState<WeatherSnapshot | null>(null);
  const [weatherStatus, setWeatherStatus] = useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");

  /* ---------- Quote modal state ---------- */
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteLinea, setQuoteLinea] = useState<ServiceLineId>("techos");
  const [quoteServicio, setQuoteServicio] = useState<string | undefined>();

  /* ---------- Derived ---------- */
  const activeLineLabel = useMemo(
    () => LINE_OPTIONS.find((l) => l.id === activeLine)?.label ?? "Multiservicios",
    [activeLine],
  );

  const telLink = useMemo(() => buildTelLink(), []);

  const heroWaLink = useMemo(
    () =>
      buildWaLinkHero(
        selectedCoverageMunicipality || DEFAULT_CITY,
        activeLineLabel,
      ),
    [activeLineLabel, selectedCoverageMunicipality],
  );

  const coverageWaLink = useMemo(
    () => buildWaLinkCoverage(selectedCoverageMunicipality || DEFAULT_CITY),
    [selectedCoverageMunicipality],
  );

  /* ---------- Effects ---------- */

  // Scroll-reveal observer
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (!nodes.length) return;

    if (shouldReduceMotion || typeof IntersectionObserver === "undefined") {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  // Lock body when modal open
  useEffect(() => {
    document.body.style.overflow = isQuoteModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isQuoteModalOpen]);

  // Weather fetch
  useEffect(() => {
    const controller = new AbortController();

    const fetchWeather = async () => {
      setWeatherStatus("loading");

      try {
        const response = await fetch(
          `/api/weather?municipio=${encodeURIComponent(selectedCoverageMunicipality)}`,
          { signal: controller.signal },
        );

        if (!response.ok) throw new Error("weather_request_failed");

        const payload = await response.json();
        if (!payload?.ok) throw new Error("weather_payload_failed");

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
        if (controller.signal.aborted) return;
        setWeatherStatus("error");
      }
    };

    fetchWeather();
    return () => controller.abort();
  }, [selectedCoverageMunicipality]);

  /* ---------- Handlers ---------- */

  const onCoverageSelect = (
    municipio: string,
    source: "mapa" | "chip" | "mapbox",
  ) => {
    setSelectedCoverageMunicipality(municipio);
    track("coverage_map_select", { municipio, source });
  };

  const openQuoteModal = ({ linea, servicio, source }: QuoteModalOpenInput) => {
    const serviceName = servicio || SERVICE_DATA[linea][0].name;
    setQuoteLinea(linea);
    setQuoteServicio(serviceName);
    setIsQuoteModalOpen(true);
    track("quote_modal_open", { source, linea, servicio: serviceName });
  };

  /* ---------- Render ---------- */

  return (
    <div className="bg-white text-slate-950 pb-20 md:pb-0">
      <StickyHeader waLink={heroWaLink} telLink={telLink} />

      <main id="main-content">
        <Hero
          whatsappLink={heroWaLink}
          phoneLink={telLink}
          onWhatsAppClick={() =>
            track("cta_whatsapp_click", { source: "hero", linea: activeLine })
          }
          onCallClick={() => track("cta_call_click", { source: "hero" })}
        />

        <ServiceTabs />

        <HowWeWork waLink={heroWaLink} telLink={telLink} />

        <BeforeAfterGallery />

        <CoverageAvailability
          selectedMunicipality={selectedCoverageMunicipality}
          onSelect={onCoverageSelect}
          weather={weatherSnapshot}
          weatherStatus={weatherStatus}
          waLink={coverageWaLink}
        />

        <FaqFooter waLink={heroWaLink} telLink={telLink} />
      </main>

      <MobileStickyBar waLink={heroWaLink} telLink={telLink} />

      {isQuoteModalOpen ? (
        <QuoteModal
          initialLinea={quoteLinea}
          initialServicio={quoteServicio}
          initialMunicipio={selectedCoverageMunicipality}
          onClose={() => setIsQuoteModalOpen(false)}
        />
      ) : null}
    </div>
  );
}
