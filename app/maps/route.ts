import { redirect } from "next/navigation";
import { GBP_URL } from "@/lib/business";

export const dynamic = "force-static";

/** Enlace corto a la ficha de Google Maps: espinalservicios.com/maps. */
export function GET() {
  redirect(GBP_URL || "/cobertura");
}
