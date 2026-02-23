"use client";

import { useEffect } from "react";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type AnalyticsParams = Record<string, string | number | boolean | undefined>;
type DestinationType = "whatsapp" | "anchor" | "internal" | "external" | "submit" | "none";
type FunnelStage = "hero" | "problem" | "plans" | "final_cta" | "other";
type CTAElement = HTMLAnchorElement | HTMLButtonElement;

// GA4 naming convention:
// - cta_id: stable snake_case per CTA instance.
// - cta_section: normalized origin (hero, problem, plans, final_cta, etc).
// - cta_intent: user intent in snake_case (whatsapp, submit_form, browse_catalog...).
// - destination_type: whatsapp | anchor | internal | external | submit | none.

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (command: string, eventName: string, params?: AnalyticsParams) => void;
  }
}

function trackEvent(eventName: string, params?: AnalyticsParams) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 64);
}

function resolveSection(sectionValue: string | null | undefined) {
  const normalized = slugify(sectionValue || "");

  if (!normalized) {
    return "global";
  }

  const aliases: Record<string, string> = {
    inicio: "hero",
    hero: "hero",
    problema: "problem",
    problema_solucion: "problem",
    planes: "plans",
    plans: "plans",
    contacto: "final_cta",
    finalcta: "final_cta",
    final_cta: "final_cta",
    navbar_mobile: "navbar",
    floating_button: "floating",
    portafolio: "portfolio",
  };

  return aliases[normalized] || normalized;
}

function resolveFunnelStage(section: string): FunnelStage {
  if (section === "hero") {
    return "hero";
  }

  if (section === "problem") {
    return "problem";
  }

  if (section === "plans") {
    return "plans";
  }

  if (section === "final_cta") {
    return "final_cta";
  }

  return "other";
}

function resolveFunnelStep(stage: FunnelStage) {
  const order: Record<FunnelStage, number> = {
    hero: 1,
    problem: 2,
    plans: 3,
    final_cta: 4,
    other: 0,
  };

  return order[stage];
}

function isWhatsAppDestination(href: string, origin: string) {
  if (!href) {
    return false;
  }

  try {
    const parsed = new URL(href, origin);
    const hostname = parsed.hostname.toLowerCase();
    return hostname === "wa.me" || hostname.endsWith("whatsapp.com");
  } catch {
    return href.includes("wa.me") || href.includes("whatsapp");
  }
}

function resolveDestinationType(
  element: CTAElement,
  rawHref: string,
  resolvedHref: string,
  origin: string,
): DestinationType {
  if (element instanceof HTMLButtonElement && element.type === "submit") {
    return "submit";
  }

  if (isWhatsAppDestination(resolvedHref || rawHref, origin)) {
    return "whatsapp";
  }

  if (rawHref.startsWith("#")) {
    return "anchor";
  }

  if (!resolvedHref) {
    return "none";
  }

  return resolvedHref.startsWith(origin) ? "internal" : "external";
}

function resolveIntent(element: CTAElement, destinationType: DestinationType) {
  const declaredIntent = slugify(element.getAttribute("data-cta-intent") || "");
  if (declaredIntent) {
    return declaredIntent;
  }

  if (destinationType === "whatsapp") {
    return "whatsapp";
  }

  if (destinationType === "anchor") {
    return "navigate_anchor";
  }

  if (destinationType === "internal") {
    return "navigate_internal";
  }

  if (destinationType === "external") {
    return "navigate_external";
  }

  if (destinationType === "submit") {
    return "submit_form";
  }

  return element instanceof HTMLButtonElement ? "button_click" : "link_click";
}

function resolveLabel(element: CTAElement) {
  const declaredLabel = element.getAttribute("data-cta-label");
  if (declaredLabel?.trim()) {
    return declaredLabel.trim().replace(/\s+/g, " ").slice(0, 120);
  }

  const ariaLabel = element.getAttribute("aria-label");
  if (ariaLabel?.trim()) {
    return ariaLabel.trim().replace(/\s+/g, " ").slice(0, 120);
  }

  const text = (element.textContent || "").trim().replace(/\s+/g, " ");
  if (text) {
    return text.slice(0, 120);
  }

  return element.tagName.toLowerCase();
}

function resolveHrefForAnalytics(
  rawHref: string,
  resolvedHref: string,
  destinationType: DestinationType,
  origin: string,
) {
  if (destinationType === "anchor") {
    return rawHref;
  }

  if (!resolvedHref) {
    return "";
  }

  try {
    const parsed = new URL(resolvedHref, origin);
    if (destinationType === "whatsapp") {
      return `${parsed.origin}${parsed.pathname}`;
    }

    return parsed.origin === origin
      ? `${parsed.pathname}${parsed.hash}`
      : `${parsed.origin}${parsed.pathname}${parsed.hash}`;
  } catch {
    return rawHref || resolvedHref;
  }
}

function fallbackCtaId(
  element: CTAElement,
  ctaSection: string,
  ctaIntent: string,
  ctaLabel: string,
  href: string,
) {
  const trackedNodes = Array.from(
    document.querySelectorAll<HTMLElement>("a[data-cta],button[data-cta]"),
  );
  const index = Math.max(1, trackedNodes.indexOf(element) + 1);
  const descriptor = slugify(ctaLabel) || slugify(href) || element.tagName.toLowerCase();

  return `cta_${slugify(ctaSection)}_${slugify(ctaIntent)}_${descriptor}_${index}`.slice(0, 80);
}

function shouldTrackWithDedupe(
  key: string,
  eventName: string,
  recentEvents: Map<string, number>,
  now: number,
  dedupeWindowMs = 500,
) {
  const dedupeKey = `${eventName}:${key}`;
  const lastHit = recentEvents.get(dedupeKey);
  if (lastHit && now - lastHit < dedupeWindowMs) {
    return false;
  }

  recentEvents.set(dedupeKey, now);

  if (recentEvents.size > 300) {
    recentEvents.forEach((timestamp, existingKey) => {
      if (now - timestamp > 5000) {
        recentEvents.delete(existingKey);
      }
    });
  }

  return true;
}

export default function GoogleAnalytics() {
  useEffect(() => {
    if (!GA_ID || typeof window === "undefined") {
      return;
    }

    const origin = window.location.origin;
    const trackedDepths = new Set<number>();
    const depthMilestones = [25, 50, 75, 100];
    const seenSections = new Set<string>();
    const recentEvents = new Map<string, number>();

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) {
        return;
      }

      const currentDepth = Math.round((window.scrollY / maxScroll) * 100);

      depthMilestones.forEach((depth) => {
        if (currentDepth >= depth && !trackedDepths.has(depth)) {
          trackedDepths.add(depth);
          trackEvent("scroll_depth", {
            depth,
            page_path: window.location.pathname,
          });
        }
      });
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      const element = target.closest("a[data-cta],button[data-cta]") as CTAElement | null;
      if (!element) {
        return;
      }

      const sectionFromDom = element.closest("section[id], section[aria-labelledby]");
      const rawSection =
        sectionFromDom?.id || sectionFromDom?.getAttribute("aria-labelledby") || "global";
      const ctaSection = resolveSection(element.getAttribute("data-cta-section") || rawSection);

      const rawHref =
        element instanceof HTMLAnchorElement ? element.getAttribute("href") || "" : "";
      const resolvedHref = element instanceof HTMLAnchorElement ? element.href : "";

      const destinationType = resolveDestinationType(element, rawHref, resolvedHref, origin);
      const ctaIntent = resolveIntent(element, destinationType);
      const ctaLabel = resolveLabel(element);
      const href = resolveHrefForAnalytics(rawHref, resolvedHref, destinationType, origin);

      const ctaId =
        element.getAttribute("data-cta-id") ||
        fallbackCtaId(element, ctaSection, ctaIntent, ctaLabel, href);

      const funnelStage = resolveFunnelStage(ctaSection);
      const basePayload = {
        cta_id: ctaId,
        cta_section: ctaSection,
        cta_intent: ctaIntent,
        cta_label: ctaLabel,
        destination_type: destinationType,
        href,
        page_path: window.location.pathname,
        funnel_stage: funnelStage,
        funnel_step: resolveFunnelStep(funnelStage),
      };

      const dedupeKey = `${ctaId}|${ctaSection}|${ctaIntent}|${destinationType}|${href}|${ctaLabel}`;
      const now = Date.now();
      if (shouldTrackWithDedupe(dedupeKey, "cta_click", recentEvents, now)) {
        trackEvent("cta_click", basePayload);
      }

      if (
        destinationType === "whatsapp" &&
        shouldTrackWithDedupe(dedupeKey, "whatsapp_click", recentEvents, now)
      ) {
        trackEvent("whatsapp_click", basePayload);
      }
    };

    const sectionElements = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id], main section[aria-labelledby]"),
    );

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.45) {
            return;
          }

          const section = entry.target as HTMLElement;
          const sectionId =
            section.id ||
            section.getAttribute("aria-labelledby") ||
            section.dataset.analyticsSection ||
            "unknown_section";
          const normalizedSection = resolveSection(sectionId);

          if (seenSections.has(sectionId)) {
            return;
          }

          seenSections.add(sectionId);
          const funnelStage = resolveFunnelStage(normalizedSection);
          trackEvent("section_view", {
            section_id: sectionId,
            section_name: normalizedSection,
            funnel_stage: funnelStage,
            funnel_step: resolveFunnelStep(funnelStage),
            page_path: window.location.pathname,
          });
        });
      },
      {
        threshold: [0.45, 0.7],
        rootMargin: "0px 0px -15% 0px",
      },
    );

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    sectionElements.forEach((section) => sectionObserver.observe(section));
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      sectionObserver.disconnect();
    };
  }, []);

  if (!GA_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
}
