import { Check, Upload, Clock, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const WHAT_YOU_PROVIDE = [
  "Tu logo (si tienes — si no, te ayudamos)",
  "Textos sobre tu negocio (te guiamos con preguntas)",
  "Fotos tuyas o de tu trabajo (opcionales)",
  "Tu número de WhatsApp",
];

const WHAT_WE_DELIVER = [
  "Página web publicada y funcionando",
  "Diseño profesional adaptado a tu negocio",
  "Optimización para Google (SEO básico)",
  "Botón de WhatsApp para que te contacten",
  "Se ve perfecto en celular y computador",
  "Acceso para que veas y apruebes antes de publicar",
];

const TIMELINE = [
  {
    day: "Día 1",
    title: "Diseño y estructura",
    desc: "Recibimos tu información y diseñamos tu página. Te enviamos una vista previa para que apruebes.",
  },
  {
    day: "Día 2",
    title: "Ajustes y publicación",
    desc: "Aplicamos tus comentarios y publicamos. Tu página queda activa y recibiendo clientes.",
  },
];

export default function Deliverables() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          title="Así de claro"
          subtitle="Sin sorpresas. Sabes exactamente qué necesitamos y qué recibes."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* What you provide */}
          <div className="rounded-[10px] border border-border bg-white p-6 sm:p-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-badge-bg">
                <Upload className="h-4 w-4 text-text-tertiary" aria-hidden="true" />
              </span>
              <h3 className="font-sans text-h3 text-foreground">Tú nos envías</h3>
            </div>
            <ul className="space-y-3">
              {WHAT_YOU_PROVIDE.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 font-sans text-body-sm leading-relaxed text-text-secondary"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What we deliver */}
          <div className="rounded-[10px] border border-border bg-white p-6 sm:p-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-badge-bg">
                <Check className="h-4 w-4 text-text-tertiary" aria-hidden="true" />
              </span>
              <h3 className="font-sans text-h3 text-foreground">Nosotros entregamos</h3>
            </div>
            <ul className="space-y-3">
              {WHAT_WE_DELIVER.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 font-sans text-body-sm leading-relaxed text-text-secondary"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mini-timeline */}
        <div className="mt-8 rounded-[10px] border border-border bg-white p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-badge-bg">
              <Clock className="h-4 w-4 text-text-tertiary" aria-hidden="true" />
            </span>
            <h3 className="font-sans text-h3 text-foreground">¿Qué significa &ldquo;48 horas&rdquo;?</h3>
          </div>
          <p className="mb-6 font-sans text-body-sm leading-relaxed text-text-secondary">
            El reloj empieza cuando recibimos tu información completa. Así funciona:
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {TIMELINE.map((step) => (
              <div key={step.day} className="rounded-lg border border-border/60 bg-badge-bg/50 p-4">
                <span className="font-sans text-caption font-medium text-foreground">{step.day}</span>
                <p className="mt-1 font-sans text-body-sm font-medium text-foreground">{step.title}</p>
                <p className="mt-1 font-sans text-tiny leading-relaxed text-text-secondary">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-6 flex items-start gap-3 rounded-[10px] border border-border bg-white p-5 sm:p-6">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-foreground" aria-hidden="true" />
          <div>
            <p className="font-sans text-body-sm font-medium text-foreground">
              Garantía de satisfacción
            </p>
            <p className="mt-1 font-sans text-tiny leading-relaxed text-text-secondary">
              Si no quedas conforme, trabajamos contigo hasta que lo estés, dentro de las revisiones incluidas en tu plan. Sin letra pequeña.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
