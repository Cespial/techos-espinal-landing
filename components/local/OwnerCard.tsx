import Image from "next/image";
import Link from "next/link";
import { OWNER } from "@/lib/owner";
import { COVERAGE_SCHEDULE } from "@/lib/conversion";

type Props = {
  variant?: "hero" | "full" | "compact";
  municipio?: string;
};

/**
 * La tarjeta de Henrry: el único bloque naranja de la página.
 * - hero: junto al H1, con la promesa de respuesta.
 * - full: sección propia con la bio.
 * - compact: una franja en páginas de servicio y municipio.
 */
export default function OwnerCard({ variant = "hero", municipio }: Props) {
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-4 rounded-2xl bg-[#ea580c] p-4 text-slate-950">
        <Portrait size={56} />
        <p className="text-sm leading-snug">
          <span className="font-bold">{OWNER.name}</span>, {OWNER.role.toLowerCase()}.{" "}
          {municipio ? `En ${municipio} voy yo mismo a revisar, sin costo.` : "Voy yo mismo a revisar, sin costo."}{" "}
          <Link href="/nosotros" className="font-semibold underline decoration-slate-950/40 underline-offset-4 hover:decoration-slate-950">
            Conóceme
          </Link>
        </p>
      </div>
    );
  }

  if (variant === "full") {
    return (
      <section className="py-16 md:py-24" aria-labelledby="owner-heading">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:items-center">
          <div className="rounded-3xl bg-[#ea580c] p-8 text-slate-950">
            <Portrait size={96} />
            <p className="mt-6 text-3xl font-bold tracking-tight">{OWNER.name}</p>
            <p className="mt-1 text-slate-900">{OWNER.role}</p>
            {OWNER.since && <p className="mt-4 text-sm text-slate-900">En el oficio desde {OWNER.since}.</p>}
          </div>
          <div>
            <h2 id="owner-heading" className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Quién va a tu casa
            </h2>
            <ul className="mt-5 space-y-3 text-base leading-relaxed text-slate-700">
              {OWNER.bio.map((line) => (
                <li key={line} className="border-l-2 border-orange-600 pl-4">
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-slate-600">{COVERAGE_SCHEDULE.hours} {COVERAGE_SCHEDULE.urgencyNote}</p>
            <Link href="/nosotros" className="mt-6 inline-flex min-h-11 items-center font-semibold text-orange-700 underline-offset-4 hover:underline">
              Conocer a {OWNER.givenName}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <aside className="rounded-3xl bg-[#ea580c] p-6 text-slate-950 shadow-[var(--shadow-brand)] md:p-8" aria-label={`Quién atiende: ${OWNER.name}`}>
      <div className="flex items-center gap-4">
        <Portrait size={72} />
        <div>
          <p className="text-2xl font-bold tracking-tight">{OWNER.name}</p>
          <p className="text-sm text-slate-900">{OWNER.role}</p>
        </div>
      </div>
      <p className="mt-5 text-base leading-relaxed">{OWNER.promise}</p>
      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-slate-900">Horario</dt>
          <dd className="font-semibold">Lunes a sábado, 7 a. m. a 6 p. m.</dd>
        </div>
        <div>
          <dt className="text-slate-900">Dónde</dt>
          <dd className="font-semibold">Medellín y 11 municipios</dd>
        </div>
      </dl>
    </aside>
  );
}

function Portrait({ size }: { size: number }) {
  if (OWNER.photo) {
    return (
      <Image
        src={OWNER.photo}
        alt={`${OWNER.name}, ${OWNER.role.toLowerCase()}`}
        width={size}
        height={size}
        className="rounded-2xl object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-2xl bg-white text-[#ea580c]"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      aria-hidden="true"
    >
      <span className="font-bold tracking-tight">{OWNER.givenName[0]}{OWNER.familyName[0]}</span>
    </span>
  );
}
