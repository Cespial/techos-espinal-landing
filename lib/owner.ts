import { SITE_URL } from "./conversion";

/* ------------------------------------------------------------------ */
/*  DUEÑO: Henrry Espinal (fuente única)                              */
/* ------------------------------------------------------------------ */

export const PERSON_ID = `${SITE_URL}/#henrry-espinal`;

export const OWNER = {
  name: "Henrry Espinal",
  givenName: "Henrry",
  familyName: "Espinal",
  /** Cómo se presenta en la página. */
  role: "Fundador y técnico principal",
  /** Foto retrato en /public. null hasta recibirla: la UI no muestra marcador. */
  photo: null as string | null,
  /** Año en que empezó en el oficio. null hasta confirmarlo: no se publica cifra. */
  since: null as number | null,
  /** Frases cortas en primera persona. Se muestran solo las que existan. */
  bio: [
    "Nuestro equipo va a tu casa o negocio, revisa el problema y te explica qué hay que hacer.",
    "Te damos el precio por escrito antes de empezar y no lo cambiamos sin acordarlo contigo.",
    "Cada trabajo queda con garantía firmada.",
  ],
  promise: "Henrry y su equipo responden por WhatsApp en menos de 2 horas en horario laboral.",
  city: "Medellín",
} as const;

/** Fotos reales de trabajos. Vacío hasta que lleguen: la galería no se muestra. */
export type WorkPhoto = {
  src: string;
  alt: string;
  line: "techos" | "pintura" | "plomeria";
  municipio: string;
};
export const RECENT_WORK: WorkPhoto[] = [];
