import { WHATSAPP_NUMBER } from "@/lib/constants";

export function generateWhatsAppURL(params: {
  name?: string;
  plan?: string;
  business?: string;
  profession?: string;
  source?: string;
}) {
  const { name, plan, business, profession, source } = params;
  const parts: string[] = [];

  // Greeting with identity or intent
  if (name) {
    parts.push(`Hola! Soy ${name}.`);
  } else {
    parts.push("Hola! Quiero una página web profesional en 48 horas.");
  }

  // Plan interest
  if (plan && plan !== "No estoy seguro") {
    parts.push(`Me interesa el plan ${plan}.`);
  }

  // Profession or business type
  if (profession) {
    parts.push(`Soy ${profession}.`);
  } else if (business) {
    parts.push(`Tengo un negocio de ${business}.`);
  }

  // Closing question
  if (name) {
    parts.push("¿Qué necesitan para empezar?");
  }

  // Source attribution (appended subtly for sales team context)
  if (source) {
    parts.push(`[Desde: ${source}]`);
  }

  const msg = parts.join(" ");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
