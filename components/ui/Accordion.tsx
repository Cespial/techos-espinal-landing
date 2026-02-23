"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItem[];
  section?: string;
};

export default function Accordion({ items, section = "faq" }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="rounded-[10px] border border-border bg-white divide-y divide-border">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index}>
            <button
              onClick={() => {
                const willOpen = !isOpen;
                setOpenIndex(willOpen ? index : null);
                trackEvent("accordion_toggle", {
                  cta_section: section,
                  accordion_question: item.question.slice(0, 80),
                  accordion_action: willOpen ? "open" : "close",
                });
              }}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${index}`}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-sans text-body font-medium text-foreground transition-colors duration-200 hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
            >
              <span>{item.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="shrink-0 text-text-tertiary"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-panel-${index}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 font-sans text-body-sm leading-relaxed text-text-secondary">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
