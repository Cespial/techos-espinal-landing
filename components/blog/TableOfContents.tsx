"use client";

import { useState, useEffect } from "react";
import type { HeadingItem } from "@/lib/blog-utils";

type TableOfContentsProps = {
  headings: HeadingItem[];
};

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Tabla de contenidos" className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
        En este artículo
      </p>
      <ul className="mt-3 space-y-1">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block rounded-lg px-2 py-1.5 text-sm transition-colors duration-200 ${
                h.level === 3 ? "pl-5" : ""
              } ${
                activeId === h.id
                  ? "bg-orange-50 font-semibold text-orange-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
