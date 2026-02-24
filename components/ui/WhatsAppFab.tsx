"use client";

import { useEffect, useState } from "react";
import { buildWaLinkFaq } from "@/lib/conversion";
import { track } from "@/lib/tracking";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export default function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={buildWaLinkFaq()}
      target="_blank"
      rel="noreferrer"
      onClick={() => track("cta_whatsapp_click", { source: "fab_desktop" })}
      aria-label="Escríbenos por WhatsApp"
      className={`fixed bottom-6 right-6 z-[70] hidden items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl md:flex ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span>Escríbenos</span>
    </a>
  );
}
