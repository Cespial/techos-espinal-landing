export const COMPANY_NAME = "Techos Espinal";
export const SITE_URL = "https://techos-espinal-landing.vercel.app";

export const PHONE_DISPLAY = "+57 300 000 0000";
export const PHONE_E164 = "+573000000000";
export const WA_NUMBER = "573000000000";

export const WA_BASE_URL = `https://wa.me/${WA_NUMBER}`;

export const SERVICE_OPTIONS = [
  "Impermeabilizacion",
  "Canoas y bajantes",
  "Reparacion de goteras",
  "Arreglo de techos",
] as const;

export const URGENCY_OPTIONS = ["Hoy", "Esta semana", "Solo cotizacion"] as const;

export const MUNICIPALITY_OPTIONS = [
  "Medellin",
  "Bello",
  "Envigado",
  "Itagui",
  "Sabaneta",
  "La Estrella",
  "Caldas",
  "Copacabana",
  "Girardota",
  "Barbosa",
  "Otro municipio",
] as const;

export const NAV_LINKS = [
  { id: "servicios", label: "Servicios" },
  { id: "resultados", label: "Antes/Despues" },
  { id: "cobertura", label: "Cobertura" },
  { id: "contacto", label: "Contacto" },
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];
export type UrgencyOption = (typeof URGENCY_OPTIONS)[number];
export type MunicipalityOption = (typeof MUNICIPALITY_OPTIONS)[number];

export function buildTelUrl() {
  return `tel:${PHONE_E164}`;
}

export type WhatsAppMessageInput = {
  name?: string;
  location?: string;
  service?: string;
  urgency?: string;
  phone?: string;
};

export function buildWhatsAppMessage({
  name,
  location,
  service,
  urgency,
  phone,
}: WhatsAppMessageInput) {
  const safeName = name?.trim() || "";
  const safeLocation = location?.trim() || "Medellin";
  const safeService = service?.trim() || "impermeabilizacion";
  const safeUrgency = urgency?.trim() || "Solo cotizacion";

  const base = `Hola, soy ${safeName || "[NOMBRE]"}. Estoy en ${safeLocation} (Antioquia). Necesito ${safeService}. Urgencia: ${safeUrgency}. ¿Me pueden confirmar disponibilidad y darme una cotizacion?`;

  if (!phone?.trim()) {
    return base;
  }

  return `${base} Mi telefono es ${phone.trim()}.`;
}

export function buildWhatsAppUrl(message: string) {
  return `${WA_BASE_URL}?text=${encodeURIComponent(message)}`;
}
