"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { generateWhatsAppURL } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { cn } from "@/components/ui/cn";

export default function Navbar() {
  const whatsappUrl = generateWhatsAppURL({ source: "nav" });
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("#inicio");

  useEffect(() => {
    const html = document.documentElement;

    if (open) {
      document.body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      html.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      html.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setOpen(false);
      }
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    let ticking = false;
    let lastY = window.scrollY;

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const nextScrolled = currentY > 12;

        setIsScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));

        if (!open && currentY > 120) {
          const hide = currentY > lastY + 4;
          const show = currentY < lastY - 2;

          if (hide) {
            setIsHidden((prev) => (prev ? prev : true));
          } else if (show) {
            setIsHidden((prev) => (prev ? false : prev));
          }
        } else {
          setIsHidden((prev) => (prev ? false : prev));
        }

        lastY = currentY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  useEffect(() => {
    const sectionIds = ["inicio", ...NAV_LINKS.map((item) => item.href.replace("#", ""))];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length === 0) {
          return;
        }

        const next = `#${visibleEntries[0].target.id}`;
        setActiveSection((prev) => (prev === next ? prev : next));
      },
      {
        threshold: [0.1, 0.25, 0.4, 0.6],
        rootMargin: "-36% 0px -46% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    setActiveSection(href);
    const sectionId = href.replace("#", "");
    const target = document.getElementById(sectionId);
    if (target) {
      requestAnimationFrame(() => {
        const offset = window.innerWidth < 640 ? 84 : 88;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
      });
    }
  };

  return (
    <motion.header
      initial={false}
      animate={shouldReduceMotion ? {} : { y: isHidden ? -80 : 0 }}
      transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur transition-all duration-300",
        isScrolled
          ? "border-border/60 bg-white/95 shadow-sm"
          : "border-transparent bg-white/80",
      )}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className={cn("mx-auto flex w-full max-w-7xl items-center justify-between px-4 transition-[height] duration-300 sm:px-6", isScrolled ? "h-14" : "h-[72px]")}>
        <a href="#inicio" onClick={handleNavigate("#inicio")} className="flex min-h-11 items-center gap-2 text-foreground focus-visible:text-foreground">
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10 0L20 10L10 20L0 10Z" />
          </svg>
          <span className="font-sans text-[15px] font-semibold tracking-tight">
            {SITE_NAME}
          </span>
        </a>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavigate(link.href)}
              className={cn(
                "relative inline-flex min-h-11 items-center font-sans text-caption transition-colors duration-200 focus-visible:text-foreground",
                activeSection === link.href
                  ? "text-foreground after:absolute after:-bottom-[6px] after:left-1/2 after:-translate-x-1/2 after:h-[1.5px] after:w-4 after:rounded-full after:bg-foreground after:content-['']"
                  : "nav-link-hover relative text-text-secondary hover:text-foreground",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button
          variant="primary"
          size="sm"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          ctaId="navbar_primary_whatsapp"
          ctaSection="navbar"
          ctaIntent="whatsapp"
          className="hidden font-sans text-body-sm font-medium md:inline-flex"
        >
          Quiero mi página
        </Button>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors duration-200 hover:bg-badge-bg focus-visible:border-foreground md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-y-auto border-t bg-white transition-[max-height] duration-300 ease-in-out md:hidden ${
          open ? "max-h-[calc(100dvh-88px)] border-border" : "max-h-0 border-transparent"
        }`}
      >
        <nav className="px-4 sm:px-6" aria-label="Navegación móvil">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavigate(link.href)}
              className={cn(
                "flex min-h-11 items-center border-b border-border py-4 font-sans text-body transition-colors duration-200 focus-visible:text-foreground",
                activeSection === link.href ? "text-foreground" : "text-text-secondary",
              )}
            >
              {link.label}
            </a>
          ))}

          <Button
            variant="primary"
            size="lg"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            ctaId="navbar_mobile_whatsapp"
            ctaSection="navbar_mobile"
            ctaIntent="whatsapp"
            className="my-4 font-sans text-body-sm font-medium"
          >
            Quiero mi página
          </Button>
        </nav>
      </div>
    </motion.header>
  );
}
