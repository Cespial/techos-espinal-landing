import { redirect } from "next/navigation";
import { GBP_REVIEW_URL, GBP_URL } from "@/lib/business";

export const dynamic = "force-static";

/**
 * Enlace corto para pedir reseñas por WhatsApp: espinalservicios.com/resena.
 * Redirige al formulario de reseña de la ficha de Google; si aún no existe,
 * a la ficha o al home.
 */
export function GET() {
  redirect(GBP_REVIEW_URL || GBP_URL || "/");
}
