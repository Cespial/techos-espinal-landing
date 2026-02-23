"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import { FAQ as FAQ_DATA } from "@/lib/constants";
import { generateWhatsAppURL } from "@/lib/utils";

export default function FAQ() {
  const whatsappUrl = generateWhatsAppURL({ source: "faq" });

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          title="Preguntas frecuentes"
          subtitle="Todo lo que necesitas saber antes de dar el paso."
        />

        <Accordion items={FAQ_DATA} />

        <div className="mt-10 text-center">
          <p className="mb-4 font-sans text-body-sm text-text-secondary">
            ¿Tienes otra pregunta?
          </p>
          <Button
            variant="secondary"
            size="lg"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            ctaId="faq_whatsapp"
            ctaSection="faq"
            ctaIntent="whatsapp"
            ctaLabel="Escríbenos por WhatsApp"
            className="font-sans font-medium"
          >
            Escríbenos por WhatsApp &rarr;
          </Button>
        </div>
      </div>
    </section>
  );
}
