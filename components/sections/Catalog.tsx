"use client";

import { useRef, useState, type ComponentType, type MouseEvent } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  Brain,
  Scale,
  UtensilsCrossed,
  Scissors,
  Camera,
  Briefcase,
  Dumbbell,
  Heart,
} from "lucide-react";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { generateWhatsAppURL } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const CATALOG = [
  {
    name: "Psicóloga",
    desc: "Para que tus pacientes te encuentren y agenden cita fácil",
    Icon: Brain,
    category: "Salud",
  },
  {
    name: "Abogado",
    desc: "Transmite confianza y consigue consultas desde el primer día",
    Icon: Scale,
    category: "Servicios",
  },
  {
    name: "Restaurante",
    desc: "Menú digital, ubicación, y reservas. Todo lo que necesitas",
    Icon: UtensilsCrossed,
    category: "Creativos",
  },
  {
    name: "Estudio de Belleza",
    desc: "Muestra tu trabajo y llena tu agenda de citas",
    Icon: Scissors,
    category: "Creativos",
  },
  {
    name: "Fotógrafo",
    desc: "Un portafolio que hace que te contraten",
    Icon: Camera,
    category: "Creativos",
  },
  {
    name: "Consultor",
    desc: "Posiciónate como experto y genera leads calificados",
    Icon: Briefcase,
    category: "Servicios",
  },
  {
    name: "Entrenador",
    desc: "Vende tus planes y clases en línea",
    Icon: Dumbbell,
    category: "Salud",
  },
  {
    name: "Salud",
    desc: "Página profesional que inspira confianza en tus pacientes",
    Icon: Heart,
    category: "Salud",
  },
];

const CATEGORIES = ["Todos", "Salud", "Servicios", "Creativos"];

const cardEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

type CatalogItem = {
  name: string;
  desc: string;
  Icon: ComponentType<{ className?: string }>;
  category: string;
};

function CatalogCard({
  item,
  index,
  inView,
}: {
  item: CatalogItem;
  index: number;
  inView: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rawOpacity = useMotionValue(0);
  const spotlightOpacity = useSpring(rawOpacity, { stiffness: 220, damping: 30, mass: 0.5 });
  const smoothX = useSpring(mouseX, { stiffness: 260, damping: 35, mass: 0.45 });
  const smoothY = useSpring(mouseY, { stiffness: 260, damping: 35, mass: 0.45 });
  const spotlight = useMotionTemplate`radial-gradient(circle 200px at ${smoothX}px ${smoothY}px, rgba(10, 10, 10, 0.08), transparent 72%)`;
  const whatsappUrl = generateWhatsAppURL({ profession: item.name, source: "catalogo" });

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    animate(rawOpacity, 1, { duration: 0.22, ease: "easeOut" });
  };

  const handleMouseLeave = () => {
    animate(rawOpacity, 0, { duration: 0.3, ease: "easeOut" });
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: cardEase }}
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex min-h-[170px] flex-col overflow-hidden rounded-[10px] border border-border bg-white p-4 transition-[transform,border-color,box-shadow] duration-300 hover:border-border-dark hover:shadow-card-hover sm:min-h-[182px] sm:p-6"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10"
        aria-label={`Consultar precio de página para ${item.name}`}
        data-cta="true"
        data-cta-id={`catalog_${item.name.toLowerCase().replace(/\s+/g, "_")}_whatsapp`}
        data-cta-section="catalog"
        data-cta-intent="whatsapp"
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: spotlightOpacity,
          background: spotlight,
        }}
      />

      <item.Icon className="mb-4 h-5 w-5 text-text-tertiary" />
      <h3 className="mb-2 font-sans text-h3 leading-tight text-foreground">
        {item.name}
      </h3>
      <p className="font-sans text-body-sm leading-relaxed text-text-secondary sm:text-body">
        {item.desc}
      </p>
      <span className="mt-auto flex items-center gap-1 pt-4 font-sans text-caption text-text-tertiary transition-colors duration-200 group-hover:text-foreground">
        Consultar precio <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </motion.article>
  );
}

export default function Catalog() {
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, amount: 0.15 });
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered = activeCategory === "Todos"
    ? CATALOG
    : CATALOG.filter((item) => item.category === activeCategory);

  return (
    <section id="catalogo" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="Páginas web para cada profesión"
          subtitle="Adaptamos tu página al lenguaje de tu cliente para que te entiendan rápido y te contacten más fácil."
        />

        <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                trackEvent("catalog_filter", {
                  cta_section: "catalog",
                  filter_category: cat,
                });
              }}
              className={`shrink-0 rounded-full px-4 py-2 font-sans text-caption transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 ${
                activeCategory === cat
                  ? "bg-foreground text-white"
                  : "border border-border bg-badge-bg text-text-secondary hover:border-border-dark"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:gap-5 lg:grid-cols-4 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <CatalogCard key={item.name} item={item} index={index} inView={inView} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
