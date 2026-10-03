import { ChevronDown } from "lucide-react";
import JsonLd from "./JsonLd";

type Faq = { question: string; answer: string };
type Props = { items: Faq[]; heading?: string; withSchema?: boolean; tone?: "white" | "slate" };

/** Preguntas frecuentes con <details> nativo y, opcionalmente, FAQPage. */
export default function FaqSection({ items, heading = "Preguntas frecuentes", withSchema = true, tone = "white" }: Props) {
  if (items.length === 0) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return (
    <section id="faq" className={`border-t border-slate-200 py-16 md:py-24 ${tone === "slate" ? "bg-slate-50" : "bg-white"}`} aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 id="faq-heading" className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          {heading}
        </h2>
        <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
          {items.map((f) => (
            <details key={f.question} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-left text-base font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                {f.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="pb-5 text-base leading-relaxed text-slate-700">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
      {withSchema && <JsonLd data={schema} />}
    </section>
  );
}
