import { buildWaLinkBlog, type ServiceLineId } from "@/lib/conversion";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type BlogCTAProps = {
  serviceLine: ServiceLineId;
  postTitle: string;
  variant?: "inline" | "sticky" | "banner";
};

const COPY_BY_LINE: Record<ServiceLineId, { heading: string; body: string }> = {
  techos: {
    heading: "¿Tenés un problema con el techo?",
    body: "Revisamos tu techo, te decimos qué pasa y cuánto cuesta arreglarlo. Sin compromiso.",
  },
  pintura: {
    heading: "¿Necesitás pintar o tratar tus paredes?",
    body: "Te visitamos, miramos el estado de las paredes y te damos un precio claro. Sin compromiso.",
  },
  plomeria: {
    heading: "¿Tenés una fuga o problema de plomería?",
    body: "Vamos a tu casa, encontramos el problema y te decimos cuánto cuesta. Sin compromiso.",
  },
};

export default function BlogCTA({
  serviceLine,
  postTitle,
  variant = "inline",
}: BlogCTAProps) {
  const waLink = buildWaLinkBlog(serviceLine, postTitle);
  const copy = COPY_BY_LINE[serviceLine];

  if (variant === "sticky") {
    return (
      <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
        <p className="text-sm font-semibold text-slate-900">{copy.heading}</p>
        <p className="mt-1 text-xs text-slate-600">{copy.body}</p>
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-lg bg-[#15803d] px-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-[#166d34] active:scale-[0.98]"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Pedir cotización gratis
        </a>
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6 text-center md:p-8">
        <p className="text-xl font-semibold text-slate-900">{copy.heading}</p>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
          {copy.body}
        </p>
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#15803d] px-6 text-base font-semibold text-white transition-all duration-300 ease-out hover:bg-[#166d34] hover:shadow-lg hover:shadow-[#15803d]/20 active:scale-[0.98]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Escribir por WhatsApp
        </a>
      </div>
    );
  }

  // inline (default)
  return (
    <div className="my-8 rounded-2xl border border-orange-200 bg-orange-50 p-5 sm:p-6">
      <p className="text-base font-semibold text-slate-900">{copy.heading}</p>
      <p className="mt-1 text-sm text-slate-600">{copy.body}</p>
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#15803d] px-5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-[#166d34] hover:shadow-lg hover:shadow-[#15803d]/20 active:scale-[0.98]"
      >
        <WhatsAppIcon className="h-4 w-4" />
        Pedir cotización gratis
      </a>
    </div>
  );
}
