import { ShieldCheck, ThumbsUp, MessageCircle } from "lucide-react";

const BADGES = [
  {
    icon: ShieldCheck,
    title: "Pago seguro",
    description: "Tu información siempre protegida",
  },
  {
    icon: ThumbsUp,
    title: "Garantía de satisfacción",
    description: "Revisiones incluidas según tu plan",
  },
  {
    icon: MessageCircle,
    title: "Respuesta en 2 horas",
    description: "Lun-Sáb, 8am-6pm por WhatsApp",
  },
];

export default function TrustBadges() {
  return (
    <section className="py-8 md:py-12" aria-label="Garantías">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
          {BADGES.map((badge) => (
            <div key={badge.title} className="flex items-center gap-3">
              <badge.icon className="h-5 w-5 shrink-0 text-text-tertiary" />
              <div>
                <p className="font-sans text-body-sm font-medium text-foreground">{badge.title}</p>
                <p className="font-sans text-tiny text-text-secondary">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
