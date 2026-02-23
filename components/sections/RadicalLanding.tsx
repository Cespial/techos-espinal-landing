"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useScroll, useTransform } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cpu,
  FileText,
  Globe,
  ImageIcon,
  Lightbulb,
  Lock,
  MessageSquare,
  Palette,
  Plus,
  Rocket,
  Server,
} from "lucide-react";
import { useReducedMotionSafe } from "@/lib/motion";
import SectionVideoBackground from "@/components/ui/SectionVideoBackground";

type PipelineNode = {
  id: string;
  label: string;
  desc: string;
  icon?: ReactNode;
};

const PIPELINE = {
  inputs: [
    {
      id: "idea",
      label: "Briefing Estratégico",
      icon: <Lightbulb size={14} />,
      desc: "Análisis de mercado y definición de embudo de conversión personalizado.",
    },
    {
      id: "logo",
      label: "Activos de Marca",
      icon: <ImageIcon size={14} />,
      desc: "Integración de logos y paleta para identidad visual coherente.",
    },
    {
      id: "content",
      label: "Copy Persuasivo",
      icon: <FileText size={14} />,
      desc: "Redacción enfocada en ventas y jerarquía de información.",
    },
    {
      id: "style",
      label: "Dirección de Arte",
      icon: <Palette size={14} />,
      desc: "Definición de atmósfera visual premium alineada al sector.",
    },
    {
      id: "whatsapp",
      label: "Ecosistema Ventas",
      icon: <MessageSquare size={14} />,
      desc: "Configuración de botones de contacto y trackers de WhatsApp.",
    },
  ] satisfies PipelineNode[],
  engine: {
    id: "engine",
    label: "Sprint-Design™ Engine",
    icon: <Cpu size={44} strokeWidth={0.65} />,
    desc: "Motor propietario de despliegue rápido que paraleliza diseño UI con arquitectura de código.",
  } satisfies PipelineNode,
  outputs: [
    {
      id: "design",
      label: "01. Interfaz Elite",
      desc: "Diseño responsive de alta gama con enfoque Mobile-First.",
    },
    {
      id: "code",
      label: "02. Código Estático",
      desc: "Desarrollo ultra-rápido optimizado para Core Web Vitals.",
    },
    {
      id: "seo",
      label: "03. SEO Authority",
      desc: "Estructura semántica para dominar búsquedas en Bogotá, Medellín y Cali.",
    },
  ] satisfies PipelineNode[],
  final: {
    id: "final",
    label: "Tu Página en 48h",
    desc: "Puesta en vivo oficial con dominio conectado y SSL activo.",
  } satisfies PipelineNode,
};

const TIMELINE = [
  {
    hour: "H01-H04",
    title: "Arquitectura",
    desc: "Ingesta de activos y definición de la jerarquía de conversión.",
  },
  {
    hour: "H05-H20",
    title: "Sprint Diseño",
    desc: "Despliegue de la interfaz UI con el motor Sprint-Design™.",
  },
  {
    hour: "H21-H40",
    title: "Sprint Código",
    desc: "Compilación del frontend y optimización de latencia.",
  },
  {
    hour: "H41-H48",
    title: "QA & Live",
    desc: "Testeo de sistemas, SEO técnico y lanzamiento oficial.",
  },
];

const FAQ_ITEMS = [
  {
    q: "¿Es realmente en 48 horas?",
    a: "Sí. Nuestro motor Sprint-Design™ omite la burocracia tradicional. Si nos entregas los 5 insumos base, el contador inicia inmediatamente.",
  },
  {
    q: "¿Tendré control sobre el sitio?",
    a: "Sí. El sitio es 100% tuyo, con acceso y documentación. No imponemos mensualidades obligatorias por mantenimiento.",
  },
  {
    q: "¿Funciona para e-commerce?",
    a: "Sí. El plan Custom cubre tiendas online. Entregamos estructura base y configuración de pasarela en el sprint inicial.",
  },
  {
    q: "¿Y si no tengo logo o fotos?",
    a: "Podemos construir identidad base y usar bancos premium para no frenar la salida a mercado.",
  },
];

export default function RadicalLanding() {
  const [activeStep, setActiveStep] = useState<string | null>("idea");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const [showStartupVeil, setShowStartupVeil] = useState(true);
  const [startupVeilSoftened, setStartupVeilSoftened] = useState(false);
  const prefersReducedMotion = useReducedMotionSafe();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineSectionRef = useRef<HTMLElement>(null);
  const finalCtaSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: timelineScrollProgress } = useScroll({
    target: timelineSectionRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: finalCtaScrollProgress } = useScroll({
    target: finalCtaSectionRef,
    offset: ["start end", "end start"],
  });
  const timelineParallaxY = useTransform(timelineScrollProgress, [0, 1], [-9, 9]);
  const finalCtaParallaxY = useTransform(finalCtaScrollProgress, [0, 1], [-9, 9]);

  useEffect(() => {
    if (!isSimulating) {
      return;
    }

    const interval = setInterval(() => {
      setSimProgress((prev) => {
        if (prev >= 100) {
          window.clearInterval(interval);
          window.setTimeout(() => {
            setIsSimulating(false);
            setSimProgress(0);
          }, 900);
          return 100;
        }

        return prev + 1.5;
      });
    }, 30);

    return () => window.clearInterval(interval);
  }, [isSimulating]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let rafId = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const getCenter = (id: string) => {
      const el = container.querySelector<HTMLElement>(`[data-node-id="${id}"]`);
      if (!el) {
        return null;
      }

      const r = el.getBoundingClientRect();
      const c = container.getBoundingClientRect();

      return {
        x: r.left - c.left + r.width / 2,
        y: r.top - c.top + r.height / 2,
        right: r.left - c.left + r.width,
        left: r.left - c.left,
      };
    };

    const drawLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      isActive: boolean,
    ) => {
      const color = isActive || isSimulating ? "#0A0A0A" : "#E5E7EB";
      context.beginPath();
      context.strokeStyle = color;
      context.lineWidth = isActive || isSimulating ? 1.4 : 1;

      const midX = (x1 + x2) / 2;
      context.moveTo(x1, y1);
      context.lineTo(midX, y1);
      context.lineTo(midX, y2);
      context.lineTo(x2, y2);
      context.stroke();

      if (!prefersReducedMotion && (isActive || isSimulating)) {
        const time = Date.now() / 240;
        const pulse = (time % 8) / 8;
        let px = x1;
        let py = y1;

        if (pulse < 0.33) {
          px = x1 + (midX - x1) * (pulse / 0.33);
          py = y1;
        } else if (pulse < 0.66) {
          px = midX;
          py = y1 + (y2 - y1) * ((pulse - 0.33) / 0.33);
        } else {
          px = midX + (x2 - midX) * ((pulse - 0.66) / 0.34);
          py = y2;
        }

        context.beginPath();
        context.fillStyle = "#0A0A0A";
        context.arc(px, py, 2, 0, Math.PI * 2);
        context.fill();
      }
    };

    const animate = () => {
      const { width, height } = canvas.getBoundingClientRect();
      context.clearRect(0, 0, width, height);

      const hub = getCenter("engine");
      const finalNode = getCenter("final");
      if (!hub || !finalNode) {
        rafId = window.requestAnimationFrame(animate);
        return;
      }

      PIPELINE.inputs.forEach((input) => {
        const pos = getCenter(input.id);
        if (!pos) {
          return;
        }

        drawLine(pos.right, pos.y, hub.left, hub.y, activeStep === input.id);
      });

      PIPELINE.outputs.forEach((output) => {
        const pos = getCenter(output.id);
        if (!pos) {
          return;
        }

        drawLine(hub.right, hub.y, pos.left, pos.y, activeStep === output.id);
        drawLine(pos.right, pos.y, finalNode.left, finalNode.y, activeStep === "final");
      });

      rafId = window.requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [activeStep, isSimulating, prefersReducedMotion]);

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-reveal]"),
    );

    if (!nodes.length) {
      return;
    }

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
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
      {
        threshold: 0.15,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      const disableTimer = window.setTimeout(() => {
        setStartupVeilSoftened(true);
        setShowStartupVeil(false);
      }, 0);
      return () => window.clearTimeout(disableTimer);
    }

    const softenTimer = window.setTimeout(() => {
      setStartupVeilSoftened(true);
    }, 90);

    const removeTimer = window.setTimeout(() => {
      setShowStartupVeil(false);
    }, 300);

    return () => {
      window.clearTimeout(softenTimer);
      window.clearTimeout(removeTimer);
    };
  }, [prefersReducedMotion]);

  const selectedNode = useMemo(() => {
    const allNodes = [...PIPELINE.inputs, PIPELINE.engine, ...PIPELINE.outputs, PIPELINE.final];
    return allNodes.find((node) => node.id === activeStep) || null;
  }, [activeStep]);

  const startSprint = () => {
    setActiveStep("engine");
    setSimProgress(0);
    setIsSimulating(true);
  };

  const revealDelay = (delay: number) =>
    ({ "--reveal-delay": `${delay}ms` } as CSSProperties);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-black selection:bg-black selection:text-white">
      {showStartupVeil ? (
        <div
          aria-hidden="true"
          className={`startup-veil ${startupVeilSoftened ? "is-softened" : ""}`}
        />
      ) : null}

      <a
        href="https://wa.me/573001234567"
        target="_blank"
        rel="noreferrer"
        aria-label="Consultar Sprint por WhatsApp"
        className="interactive-btn motion-press motion-scale-in fixed bottom-5 right-5 z-[80] inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.12)] transition-transform hover:scale-105 md:bottom-8 md:right-8 md:gap-3 md:px-6"
      >
        <MessageSquare size={20} fill="currentColor" aria-hidden="true" />
        <span className="hidden text-[11px] font-black uppercase tracking-[0.2em] md:block">
          Consultar Sprint
        </span>
      </a>

      <nav className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-gray-100 bg-white/95 px-5 backdrop-blur-md md:px-12">
        <a href="#main-content" className="group flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center bg-black text-xs font-black text-white transition-transform group-hover:rotate-12">
            48
          </span>
          <span className="text-base font-black uppercase tracking-tight md:text-lg">TU PÁGINA EN 48H</span>
        </a>

        <div className="hidden items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 lg:flex">
          <a href="#proceso" className="interactive-link nav-link-hover transition-colors hover:text-black focus-visible:text-black">Proceso</a>
          <a href="#garantia" className="interactive-link nav-link-hover transition-colors hover:text-black focus-visible:text-black">Garantía</a>
          <a href="#precios" className="interactive-link nav-link-hover transition-colors hover:text-black focus-visible:text-black">Precios</a>
          <a href="#faqs" className="interactive-link nav-link-hover transition-colors hover:text-black focus-visible:text-black">FAQs</a>
        </div>

        <button
          type="button"
          onClick={startSprint}
          className="interactive-btn motion-press bg-black px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] transition-all hover:bg-gray-800 active:translate-y-1 active:shadow-none md:px-6"
        >
          Iniciar Proyecto
        </button>
      </nav>

      <section className="relative overflow-hidden border-b border-gray-100 px-6 pb-20 pt-20 text-center md:pb-24 md:pt-24">
          <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 bg-dot-grid-tech opacity-60" />
          {!prefersReducedMotion ? (
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-[0.16] grayscale"
              src="/media/Subtle_isometric_parallax_202602230825_igd1n.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-white" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="motion-fade-up mb-10 inline-flex items-center gap-3 rounded-sm border border-gray-200 bg-white px-4 py-2 text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 shadow-sm md:mb-12">
            <Activity size={14} className="text-emerald-500" aria-hidden="true" /> Sistema de Despliegue de Alta Disponibilidad
          </div>

          <h1 className="hero-headline motion-fade-up mx-auto mb-8 max-w-6xl text-[3rem] leading-[0.87] tracking-tighter text-black md:mb-10 md:text-[7rem]">
            El fin de las <span className="hero-keyword">agencias</span> <br />
            <span className="italic text-gray-400">lentas y costosas.</span>
          </h1>

          <p className="motion-fade-up motion-delay-80 mx-auto mb-12 max-w-2xl text-base font-medium leading-relaxed text-gray-500 md:mb-16 md:text-xl">
            Activa tu infraestructura de ventas en tiempo récord. No diseñamos sitios web; construimos
            <strong> maquinaria técnica </strong>
            diseñada para convertir tráfico en facturación en 48 horas.
          </p>

          <div className="motion-fade-up motion-delay-140 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <button
              type="button"
              onClick={startSprint}
              className="interactive-btn motion-press cta-glint group flex w-full items-center justify-center gap-3 bg-black px-8 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] transition-all hover:bg-gray-900 sm:w-auto md:px-12 md:py-5 md:text-[13px]"
            >
              Ejecutar Simulación Sprint
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex items-center">
              <div className="flex -space-x-3">
                {["CA", "MB", "SR", "AL"].map((initials) => (
                  <div
                    key={initials}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-[10px] font-black text-gray-700"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <span className="pl-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 md:pl-6 md:text-[11px]">
                +240 clientes satisfechos
              </span>
            </div>
          </div>

          <div className="mx-auto mt-8 h-1.5 w-full max-w-xl overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-black transition-all duration-200"
              style={{ width: `${simProgress}%`, opacity: isSimulating || simProgress > 0 ? 1 : 0.35 }}
            />
          </div>

          <div aria-hidden="true" className="hero-scroll-cue">
            <span className="hero-scroll-cue-line" />
            <span className="hero-scroll-cue-chevron" />
          </div>
        </div>
      </section>

      <section
        id="proceso"
        ref={containerRef}
        data-scroll-reveal
        className="scroll-reveal relative mx-auto min-h-[840px] w-full max-w-[1400px] overflow-hidden bg-dot-grid-tech py-16 md:py-20"
      >
        <h2 className="sr-only">Proceso</h2>
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 hidden xl:block" />

        <div className="relative z-10 hidden w-full grid-cols-12 items-center gap-8 px-10 xl:grid">
          <div className="col-span-3 space-y-8">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Ingesta de Datos</span>
            {PIPELINE.inputs.map((node) => (
              <button
                key={node.id}
                type="button"
                data-node-id={node.id}
                onMouseEnter={() => setActiveStep(node.id)}
                onFocus={() => setActiveStep(node.id)}
                className={`interactive-card group flex w-56 cursor-pointer items-center gap-4 border bg-white px-5 py-5 text-left transition-all duration-300 ${
                  activeStep === node.id
                    ? "border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
                    : "border-dashed border-gray-200 hover:border-black"
                }`}
              >
                <span className={`${activeStep === node.id ? "text-black" : "text-gray-300"} transition-colors`}>
                  {node.icon}
                </span>
                <span className="text-[10px] font-black uppercase tracking-tight">{node.label}</span>
              </button>
            ))}
          </div>

          <div className="col-span-6 flex justify-center">
            <div
              data-node-id="engine"
              onMouseEnter={() => setActiveStep("engine")}
              className={`relative flex h-80 w-80 flex-col items-center justify-center border bg-white transition-all duration-700 ${
                activeStep === "engine"
                  ? "border-black shadow-[40px_40px_0px_0px_rgba(0,0,0,0.03)]"
                  : "border-gray-100"
              } ${isSimulating ? "scale-[1.03]" : ""}`}
            >
              <span className="absolute left-3 top-3 h-3 w-3 bg-black" />
              <span className="absolute right-3 top-3 h-3 w-3 bg-black" />
              <span className="absolute bottom-3 left-3 h-3 w-3 bg-black" />
              <span className="absolute bottom-3 right-3 h-3 w-3 bg-black" />

              <div
                className={`mb-6 border border-gray-100 bg-white p-8 transition-all duration-700 ${
                  isSimulating ? "rotate-180 border-black" : "rotate-45"
                }`}
              >
                <div className={`${isSimulating ? "text-emerald-500" : "text-gray-200"}`}>{PIPELINE.engine.icon}</div>
              </div>

              <p className="px-10 text-center text-[12px] font-black uppercase leading-relaxed tracking-[0.45em]">
                Sprint-Design™ Engine
              </p>

              {isSimulating ? (
                <div className="mt-7 flex gap-2">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-black" style={{ animationDelay: "0s" }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-black" style={{ animationDelay: "0.2s" }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-black" style={{ animationDelay: "0.4s" }} />
                </div>
              ) : null}
            </div>
          </div>

          <div className="col-span-2 space-y-14">
            <span className="mb-2 block text-right text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Compilación</span>
            {PIPELINE.outputs.map((node) => (
              <button
                key={node.id}
                type="button"
                data-node-id={node.id}
                onMouseEnter={() => setActiveStep(node.id)}
                onFocus={() => setActiveStep(node.id)}
                className={`interactive-card relative ml-auto w-56 cursor-pointer border bg-white px-5 py-5 text-left transition-all duration-300 ${
                  activeStep === node.id
                    ? "border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
                    : "border-dashed border-gray-200 hover:border-black"
                }`}
                style={{ clipPath: "polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)" }}
              >
                <span className="text-[10px] font-black uppercase tracking-tight">{node.label}</span>
              </button>
            ))}
          </div>

          <div className="col-span-1 flex justify-end">
            <button
              type="button"
              data-node-id="final"
              onMouseEnter={() => setActiveStep("final")}
              onFocus={() => setActiveStep("final")}
              className="interactive-card group relative"
            >
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-black uppercase tracking-[0.5em] text-gray-400">
                Producción
              </span>
              <div
                className={`relative flex h-28 w-36 items-center justify-center border-2 bg-white text-center transition-all ${
                  activeStep === "final"
                    ? "border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,0.05)]"
                    : "border-gray-100"
                }`}
              >
                <Rocket size={20} className="absolute -right-4 -top-4 text-emerald-500" />
                <span className="text-[12px] font-black uppercase leading-tight">Tu Página{"\n"}en 48h</span>
              </div>
            </button>
          </div>
        </div>

        <div className="relative z-10 space-y-8 px-6 xl:hidden">
          <div className="mx-auto max-w-md space-y-3">
            {PIPELINE.inputs.map((node) => (
              <button
                key={node.id}
                type="button"
                data-node-id={node.id}
                onClick={() => setActiveStep(node.id)}
                className="interactive-card flex w-full items-center gap-4 rounded-lg border border-dashed border-gray-200 bg-white px-5 py-4 text-left"
              >
                <span className="text-gray-300">{node.icon}</span>
                <span className="text-[12px] font-black uppercase tracking-tight">{node.label}</span>
              </button>
            ))}
          </div>

          <div className="mx-auto h-10 w-px bg-gray-200" />

          <div
            data-node-id="engine"
            className="mx-auto flex h-44 w-44 items-center justify-center border border-gray-100 bg-white text-center shadow-[20px_20px_0px_0px_rgba(0,0,0,0.03)]"
          >
            <div>
              <div className="mx-auto mb-4 h-12 w-12 rotate-45 border border-gray-200 bg-white p-2 text-gray-500">
                <Cpu size={32} strokeWidth={0.7} className="-rotate-45" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em]">Sprint Engine</p>
            </div>
          </div>

          <div className="mx-auto h-10 w-px bg-gray-200" />

          <div className="mx-auto max-w-md space-y-3">
            {PIPELINE.outputs.map((node) => (
              <button
                key={node.id}
                type="button"
                data-node-id={node.id}
                onClick={() => setActiveStep(node.id)}
                className="interactive-card w-full border border-dashed border-gray-200 bg-white px-5 py-4 text-left text-[12px] font-black uppercase tracking-tight"
                style={{ clipPath: "polygon(0% 0%, 94% 0%, 100% 50%, 94% 100%, 0% 100%)" }}
              >
                {node.label}
              </button>
            ))}
          </div>

          <div className="mx-auto h-10 w-px bg-gray-200" />

          <div
            data-node-id="final"
            className="mx-auto flex w-40 flex-col items-center justify-center rounded-lg border border-gray-100 bg-white px-4 py-5"
          >
            <span className="mb-1 text-[9px] font-black uppercase tracking-[0.3em] text-gray-600">Entrega final</span>
            <span className="text-sm font-black">Tu Página en 48h</span>
          </div>
        </div>

        {selectedNode ? (
          <aside className="spec-card-enter absolute right-8 top-14 z-20 hidden w-[24rem] border-2 border-black bg-white p-8 shadow-[25px_25px_0px_0px_rgba(0,0,0,0.04)] xl:block">
            <div className="mb-8 flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Spec Sheet v2.5</span>
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            </div>
            <h3 className="mb-5 text-5xl italic leading-[0.9] tracking-tight">{selectedNode.label}</h3>
            <p className="mb-8 border-l-4 border-black pl-6 text-sm leading-relaxed text-gray-500">{selectedNode.desc}</p>
            <p className="mb-3 text-[9px] font-black uppercase tracking-[0.3em] text-gray-300">Validaciones Técnicas</p>
            <div className="space-y-2">
              {[
                "Optimización de activos",
                "Estructura semántica HTML5",
                "Performance Core Vitals",
              ].map((check) => (
                <p key={check} className="flex items-center gap-2 text-[11px] font-bold">
                  <CheckCircle2 size={12} className="text-emerald-500" /> {check}
                </p>
              ))}
            </div>
          </aside>
        ) : null}
      </section>

      <section
        id="garantia"
        ref={timelineSectionRef}
        className="section-perf relative isolate overflow-hidden bg-black px-6 py-24 text-white md:px-12 md:py-32"
      >
        <SectionVideoBackground parallaxY={timelineParallaxY} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div
            data-scroll-reveal
            className="scroll-reveal mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between"
          >
            <div className="max-w-2xl">
              <span className="mb-5 block text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Sprint Timeline</span>
              <h2 className="text-5xl leading-[0.9] tracking-tight md:text-7xl">
                Cada minuto cuenta. <br />
                <span className="italic text-gray-400">Sin burocracia.</span>
              </h2>
            </div>
            <div className="text-left md:text-right">
              <Clock size={44} className="mb-3 text-gray-700 md:ml-auto" />
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-300">Garantía de Tiempo Real</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-10">
            {TIMELINE.map((step, index) => (
              <article
                key={step.title}
                data-scroll-reveal
                style={revealDelay(index * 60)}
                className="scroll-reveal interactive-card-dark group border border-gray-800 p-7 transition-colors hover:border-white md:p-8"
              >
                <p className="mb-4 text-[10px] font-black tracking-widest text-emerald-500">{step.hour}</p>
                <h3 className="mb-4 text-2xl font-black uppercase tracking-tight">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-300 transition-colors group-hover:text-white">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="precios" className="section-perf bg-white px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div data-scroll-reveal className="scroll-reveal mb-16 text-center md:mb-24">
            <h2 className="mb-3 text-5xl italic tracking-tight">Inversión en Resultados</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Pricing Transparente . Sin Sorpresas</p>
            <p className="mx-auto mt-5 max-w-3xl text-base font-semibold text-black md:text-lg">
              Promesa de valor: <span className="italic">$1.000.000 + 48 horas = Página web lista para vender.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            <article
              data-scroll-reveal
              style={revealDelay(0)}
              className="scroll-reveal interactive-card relative flex h-full flex-col border-4 border-black bg-white p-10 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)]"
            >
              <p className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black px-4 py-1 text-[9px] font-black uppercase tracking-widest text-white">
                Oferta Principal
              </p>
              <div className="mb-8">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-emerald-700">Sprint Base 48H</p>
                <h3 className="text-4xl font-black tracking-tight">PÁGINA WEB EXPRESS</h3>
              </div>
              <ul className="mb-10 flex-1 space-y-4 text-sm font-semibold text-black">
                {[
                  "1 Página de Conversión",
                  "Mobile-First Design",
                  "Botón WhatsApp Directo",
                  "Hosting 1 Año Gratis",
                  "Entrega en 48 horas",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-black">
                1 millón + 48h = página web
              </p>
              <p className="mb-8 text-5xl italic tracking-tight">
                $1.000.000 <span className="text-sm not-italic text-gray-600">COP</span>
              </p>
              <button type="button" className="interactive-btn w-full bg-black py-5 text-[11px] font-black uppercase tracking-widest text-white transition-all hover:bg-gray-800">
                Quiero mi página en 48h
              </button>
            </article>

            <article
              data-scroll-reveal
              style={revealDelay(60)}
              className="scroll-reveal interactive-card flex h-full flex-col border border-gray-100 p-8 transition-all hover:border-black md:p-10"
            >
              <div className="mb-8">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-emerald-700">Full Sprint</p>
                <h3 className="text-4xl font-black tracking-tight">SITIO CORPORATIVO</h3>
              </div>
              <ul className="mb-10 flex-1 space-y-4 text-sm font-bold text-black">
                {[
                  "Hasta 5 Secciones",
                  "Blog / Noticias",
                  "SEO Local Optimizado",
                  "Google Analytics / Pixel",
                  "Formularios CRM",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={15} className="text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                + Compatible con Add-on Asesoría de Marca
              </p>
              <p className="mb-9 text-5xl italic tracking-tight">
                $2.9M <span className="text-sm not-italic text-gray-600">COP</span>
              </p>
              <button type="button" className="interactive-btn w-full bg-black py-5 text-[11px] font-black uppercase tracking-widest text-white transition-all hover:bg-gray-800">
                Iniciar Plan Full Web
              </button>
            </article>

            <article
              data-scroll-reveal
              style={revealDelay(120)}
              className="scroll-reveal interactive-card flex h-full flex-col border border-gray-100 p-8 transition-all hover:border-black md:p-10"
            >
              <div className="mb-8">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-gray-600">Tailored Sprint</p>
                <h3 className="text-3xl font-black tracking-tight">CUSTOM DEV</h3>
              </div>
              <ul className="mb-10 flex-1 space-y-4 text-sm text-gray-500">
                {[
                  "Funcionalidades API",
                  "E-commerce (Shopify/Woo)",
                  "Intranet / Login",
                  "Automatización Ventas",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={14} className="text-black" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                + Compatible con Add-on Asesoría de Marca
              </p>
              <p className="mb-8 text-3xl italic tracking-tight">
                Desde $4.5M <span className="text-sm not-italic text-gray-600">COP</span>
              </p>
              <button type="button" className="interactive-btn w-full border-2 border-black py-4 text-[10px] font-black uppercase tracking-widest transition-all hover:bg-black hover:text-white">
                Cotizar Proyecto
              </button>
            </article>
          </div>

          <article
            data-scroll-reveal
            style={revealDelay(140)}
            className="scroll-reveal mt-10 border-2 border-black bg-emerald-50/40 p-6 md:mt-12 md:p-8"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-700">
                  Add-on Transversal Opcional
                </p>
                <h3 className="text-3xl font-black tracking-tight md:text-4xl">Asesoría de Marca & Contenido</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
                  Complemento disponible para cualquier plan: eleva percepción de marca y coherencia en todos
                  tus canales.
                </p>
              </div>
              <p className="text-3xl italic tracking-tight md:text-4xl">
                +$650.000 <span className="text-sm not-italic text-gray-600">COP</span>
              </p>
            </div>
            <ul className="mt-5 grid grid-cols-1 gap-3 text-sm text-gray-700 md:grid-cols-2">
              {[
                "Manual de marca express (logo, usos, paleta y tipografías)",
                "Guía de estilo visual para sitio y piezas digitales",
                "Lineamientos de tono y copy para comunicación comercial",
                "Parrilla base para redes sociales (30 días)",
                "Checklist de optimización de perfil en Instagram/Facebook/LinkedIn",
                "Sesión de dirección estratégica de marca (60 min)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section id="faqs" className="section-perf bg-gray-50 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div data-scroll-reveal className="scroll-reveal mb-14 flex items-center gap-4 md:mb-20 md:gap-6">
            <span className="h-1 w-10 bg-black md:w-16" />
            <h2 className="text-4xl italic tracking-tight">Resolviendo Obstáculos</h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {FAQ_ITEMS.map((item, index) => (
              <details
                key={item.q}
                data-scroll-reveal
                style={revealDelay(index * 60)}
                className="scroll-reveal interactive-card group cursor-pointer border border-gray-100 bg-white p-6 transition-all hover:border-black focus-within:border-black md:p-8"
              >
                <summary className="flex list-none items-center justify-between text-[12px] font-black uppercase tracking-widest">
                  {item.q}
                  <Plus size={16} className="transition-transform group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p className="mt-6 max-w-2xl border-t border-gray-50 pt-6 text-sm leading-relaxed text-gray-500 md:mt-8 md:pt-8">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer
        ref={finalCtaSectionRef}
        className="section-perf relative isolate overflow-hidden bg-black px-6 py-28 text-center text-white md:px-12 md:py-40"
      >
        <SectionVideoBackground parallaxY={finalCtaParallaxY} />
        <div data-scroll-reveal className="scroll-reveal relative z-10 mx-auto max-w-5xl">
          <h2 className="mb-10 text-6xl leading-none tracking-tight md:text-9xl">
            Vende más <br />
            <span className="italic">esta misma semana.</span>
          </h2>

          <p className="mx-auto mb-12 max-w-xl text-lg font-medium text-gray-300 md:mb-16">
            Tu competencia sigue esperando propuestas. Tú puedes tener tu web profesional en vivo pasado mañana.
          </p>

          <button type="button" className="interactive-btn bg-white px-12 py-6 text-[12px] font-black uppercase tracking-[0.35em] text-black shadow-[15px_15px_0px_0px_rgba(255,255,255,0.1)] transition-all hover:bg-gray-200 md:px-16 md:py-8 md:text-[15px]">
            Lanzar Mi Sprint 48h
          </button>

          <div className="mt-16 grid grid-cols-2 gap-8 opacity-75 md:mt-24 md:grid-cols-4 md:gap-12" data-scroll-reveal style={revealDelay(60)}>
            <div className="flex flex-col items-center gap-2">
              <Globe size={22} aria-hidden="true" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">AWS Cloud Front</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Lock size={22} aria-hidden="true" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">SSL Encryption</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Server size={22} aria-hidden="true" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">99.9% Uptime</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Activity size={22} aria-hidden="true" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">Tailwind Architecture</span>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[42vw] w-[42vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
        />
      </footer>
    </div>
  );
}
