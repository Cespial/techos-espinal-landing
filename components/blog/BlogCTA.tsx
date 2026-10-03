import type { ServiceLineId } from "@/lib/conversion";
import WaButton from "@/components/local/WaButton";

type BlogCTAProps = {
  serviceLine: ServiceLineId;
  postTitle: string;
  variant?: "inline" | "sticky";
};

const COPY_BY_LINE: Record<ServiceLineId, { heading: string; body: string }> = {
  techos: {
    heading: "¿Tienes un problema con el techo?",
    body: "Revisamos tu techo, te decimos qué pasa y cuánto cuesta arreglarlo. Sin compromiso.",
  },
  pintura: {
    heading: "¿Necesitas pintar o tratar tus paredes?",
    body: "Vamos, miramos el estado de las paredes y te damos un precio claro. Sin compromiso.",
  },
  plomeria: {
    heading: "¿Tienes una fuga o un desagüe tapado?",
    body: "Vamos a tu casa, encontramos el problema y te decimos cuánto cuesta. Sin compromiso.",
  },
};

export default function BlogCTA({ serviceLine, postTitle, variant = "inline" }: BlogCTAProps) {
  const copy = COPY_BY_LINE[serviceLine];
  const sticky = variant === "sticky";
  return (
    <div className={`rounded-2xl border border-slate-200 bg-slate-50 ${sticky ? "p-5" : "my-8 p-5 sm:p-6"}`}>
      <p className={`font-semibold text-slate-900 ${sticky ? "text-sm" : "text-base"}`}>{copy.heading}</p>
      <p className={`mt-1 text-slate-600 ${sticky ? "text-xs" : "text-sm"}`}>{copy.body}</p>
      <WaButton
        source={sticky ? "blog_sticky" : "blog_inline"}
        pageType="blog"
        linea={serviceLine}
        intent="blog"
        context={postTitle}
        label="Escríbenos por WhatsApp"
        className={`mt-3 ${sticky ? "w-full" : ""}`}
      />
    </div>
  );
}
