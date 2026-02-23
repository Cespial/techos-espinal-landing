"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  FileText,
  Globe,
  Image as ImageIcon,
  Palette,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

import { FlowConnector, FlowDot } from "@/components/ui/FlowConnector";
import {
  DesktopCentralNode,
  DesktopInputNode,
  DesktopOutputNode,
  DesktopResultNode,
  MobileCentralNode,
  MobileInputNode,
  MobileOutputNode,
  MobileResultNode,
} from "@/components/ui/FlowNode";
import { cn } from "@/components/ui/cn";

type InputNode = {
  id: string;
  label: string;
  icon: LucideIcon;
  y: number;
};

type OutputNode = {
  id: string;
  label: string;
  order: string;
  y: number;
};

type FlowDiagramProps = {
  className?: string;
};

const INPUT_NODES: InputNode[] = [
  { id: "idea", label: "Tu idea", icon: Globe, y: 40 },
  { id: "logo", label: "Tu logo", icon: ImageIcon, y: 104 },
  { id: "content", label: "Tu contenido", icon: FileText, y: 168 },
  { id: "style", label: "Tu estilo", icon: Palette, y: 232 },
  { id: "whatsapp", label: "Tu WhatsApp", icon: Smartphone, y: 296 },
];

const INPUT_CONNECTOR_PATHS = [
  "M 183 62 L 260 62 L 260 192 L 340 192",
  "M 183 126 L 240 126 L 240 192 L 340 192",
  "M 183 190 L 340 192",
  "M 183 254 L 240 254 L 240 192 L 340 192",
  "M 183 318 L 260 318 L 260 192 L 340 192",
];

const OUTPUT_NODES: OutputNode[] = [
  { id: "design", label: "Diseño", order: "01", y: 110 },
  { id: "code", label: "Código", order: "02", y: 172 },
  { id: "seo", label: "SEO", order: "03", y: 234 },
];

const DIVERGENCE_CONNECTOR_PATHS = [
  "M 650 192 L 650 130 L 700 130",
  "M 650 192 L 700 192",
  "M 650 192 L 650 254 L 700 254",
];

const RESULT_CONNECTOR_PATHS = [
  "M 880 130 L 920 130 L 920 192 L 960 192",
  "M 880 192 L 960 192",
  "M 880 254 L 920 254 L 920 192 L 960 192",
];

const MOBILE_OUTPUT_NODES: OutputNode[] = [
  { id: "mobile-design", label: "Diseño", order: "01", y: 474 },
  { id: "mobile-code", label: "Código", order: "02", y: 518 },
  { id: "mobile-seo", label: "SEO", order: "03", y: 562 },
];

export default function FlowDiagram({ className }: FlowDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const inputNodesDelay = 0;
  const inputLinesDelay = 0.4;
  const centralNodeDelay = 0.8;
  const outputLinesDelay = 1.1;
  const outputNodesDelay = 1.4;
  const resultDelay = 1.8;

  return (
    <section
      className={cn("hero-to-diagram-connector relative py-16 md:py-24", className)}
      aria-label="Diagrama del proceso Tu Página en 48"
    >
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="font-sans text-overline uppercase text-text-tertiary">
          Nuestro proceso
        </p>
        <h2
          className="mt-3 font-serif font-semibold text-foreground"
          style={{ fontSize: "var(--font-size-h2)" }}
        >
          De tu idea a tu página
        </h2>
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-6 md:mt-14">
        <div
          ref={ref}
          className="flow-diagram-shell rounded-2xl border border-border/50 bg-background-alt p-6 md:p-10"
        >
        <svg
          viewBox="0 0 1100 480"
          className="flow-diagram-svg hidden h-auto w-full md:block"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Flujo desde inputs hasta entrega final"
        >
          <defs>
            <marker
              id="arrowhead"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 1 L 8 5 L 0 9" fill="none" stroke="#D4D4D4" strokeWidth="1.5" />
            </marker>
          </defs>

          {INPUT_NODES.map((node, index) => (
            <DesktopInputNode
              key={node.id}
              x={30}
              y={node.y}
              label={node.label}
              icon={node.icon}
              isInView={isInView}
              delay={inputNodesDelay + index * 0.08}
            />
          ))}

          {INPUT_CONNECTOR_PATHS.map((path, index) => (
            <FlowConnector
              key={`input-path-${index}`}
              d={path}
              isInView={isInView}
              delay={inputLinesDelay + index * 0.06}
              duration={0.6}
            />
          ))}

          <FlowDot x={340} y={192} r={4} isInView={isInView} delay={inputLinesDelay + 0.36} />

          <FlowConnector
            d="M 340 192 L 410 192"
            isInView={isInView}
            delay={inputLinesDelay + 0.34}
            duration={0.45}
            markerEnd="url(#arrowhead)"
          />

          <DesktopCentralNode isInView={isInView} delay={centralNodeDelay} />

          <FlowConnector
            d="M 580 192 L 650 192"
            isInView={isInView}
            delay={outputLinesDelay}
            duration={0.4}
          />

          <FlowDot x={650} y={192} r={4} isInView={isInView} delay={outputLinesDelay + 0.12} />

          {DIVERGENCE_CONNECTOR_PATHS.map((path, index) => (
            <FlowConnector
              key={`divergence-path-${index}`}
              d={path}
              isInView={isInView}
              delay={outputLinesDelay + 0.18 + index * 0.08}
              duration={0.45}
            />
          ))}

          {OUTPUT_NODES.map((node, index) => (
            <DesktopOutputNode
              key={node.id}
              x={700}
              y={node.y}
              order={node.order}
              label={node.label}
              isInView={isInView}
              delay={outputNodesDelay + index * 0.08}
            />
          ))}

          {RESULT_CONNECTOR_PATHS.map((path, index) => (
            <FlowConnector
              key={`result-path-${index}`}
              d={path}
              isInView={isInView}
              delay={outputLinesDelay + 0.52 + index * 0.08}
              duration={0.45}
            />
          ))}

          <FlowDot x={960} y={192} r={4} isInView={isInView} delay={outputLinesDelay + 0.78} />

          <FlowConnector
            d="M 960 192 L 990 192"
            isInView={isInView}
            delay={outputLinesDelay + 0.82}
            duration={0.35}
            markerEnd="url(#arrowhead)"
          />

          <DesktopResultNode isInView={isInView} delay={resultDelay} />
        </svg>

        <svg
          viewBox="0 0 320 700"
          className="flow-diagram-svg-mobile block h-auto w-full md:hidden"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Flujo vertical en mobile"
        >
          <defs>
            <marker
              id="arrowhead-mobile"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 1 L 8 5 L 0 9" fill="none" stroke="#D4D4D4" strokeWidth="1.5" />
            </marker>
          </defs>

          {INPUT_NODES.map((node, index) => (
            <MobileInputNode
              key={`mobile-${node.id}`}
              x={30}
              y={36 + index * 48}
              label={node.label}
              icon={node.icon}
              isInView={isInView}
              delay={inputNodesDelay + index * 0.08}
            />
          ))}

          <FlowConnector
            d="M 160 276 L 160 322"
            isInView={isInView}
            delay={inputLinesDelay}
            duration={0.45}
            markerEnd="url(#arrowhead-mobile)"
          />

          <MobileCentralNode isInView={isInView} delay={centralNodeDelay} />

          <FlowConnector
            d="M 160 432 L 160 474"
            isInView={isInView}
            delay={outputLinesDelay}
            duration={0.35}
            markerEnd="url(#arrowhead-mobile)"
          />

          {MOBILE_OUTPUT_NODES.map((node, index) => (
            <MobileOutputNode
              key={node.id}
              x={50}
              y={node.y}
              order={node.order}
              label={node.label}
              isInView={isInView}
              delay={outputNodesDelay + index * 0.08}
            />
          ))}

          <FlowConnector
            d="M 160 598 L 160 648"
            isInView={isInView}
            delay={resultDelay - 0.12}
            duration={0.35}
            markerEnd="url(#arrowhead-mobile)"
          />

          <MobileResultNode isInView={isInView} delay={resultDelay} />
        </svg>
        </div>
      </div>
    </section>
  );
}
