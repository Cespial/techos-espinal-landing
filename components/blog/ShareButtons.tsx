"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { SITE_URL } from "@/lib/conversion";

type ShareButtonsProps = {
  slug: string;
  title: string;
};

export default function ShareButtons({ slug, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE_URL}/blog/${slug}`;

  const waShareLink = `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`;

  function handleCopy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-slate-600">Compartir:</span>
      <a
        href={waShareLink}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#15803d] transition-all duration-200 hover:border-[#15803d] hover:bg-[#15803d]/5"
        aria-label="Compartir por WhatsApp"
      >
        <WhatsAppIcon className="h-4 w-4" />
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50"
        aria-label="Copiar enlace"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
