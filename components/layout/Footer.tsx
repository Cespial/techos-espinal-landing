import { SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { generateWhatsAppURL } from "@/lib/utils";

export default function Footer() {
  const whatsappUrl = generateWhatsAppURL({ source: "footer" });

  return (
    <footer className="border-t border-border pt-16 pb-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="order-1 lg:order-5">
            <h4 className="mb-4 font-sans text-overline uppercase text-text-tertiary">
              Contacto
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="true"
                  data-cta-id="footer_whatsapp"
                  data-cta-section="footer"
                  data-cta-intent="whatsapp"
                  className="inline-flex min-h-11 items-center py-1 font-sans text-body-sm text-text-secondary transition-colors duration-200 hover:text-foreground focus-visible:text-foreground"
                >
                  WhatsApp
                </a>
              </li>
              {SOCIAL_LINKS.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center py-1 font-sans text-body-sm text-text-secondary transition-colors duration-200 hover:text-foreground focus-visible:text-foreground"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-2 lg:order-2">
            <h4 className="mb-4 font-sans text-overline uppercase text-text-tertiary">
              Servicios
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#catalogo" className="inline-flex min-h-11 items-center py-1 font-sans text-body-sm text-text-secondary transition-colors duration-200 hover:text-foreground focus-visible:text-foreground">
                  Catálogo
                </a>
              </li>
              <li>
                <a href="#planes" className="inline-flex min-h-11 items-center py-1 font-sans text-body-sm text-text-secondary transition-colors duration-200 hover:text-foreground focus-visible:text-foreground">
                  Planes y precios
                </a>
              </li>
              <li>
                <a href="#portafolio" className="inline-flex min-h-11 items-center py-1 font-sans text-body-sm text-text-secondary transition-colors duration-200 hover:text-foreground focus-visible:text-foreground">
                  Resultados
                </a>
              </li>
            </ul>
          </div>

          <div className="order-3 lg:order-3">
            <h4 className="mb-4 font-sans text-overline uppercase text-text-tertiary">
              Empresa
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#proceso" className="inline-flex min-h-11 items-center py-1 font-sans text-body-sm text-text-secondary transition-colors duration-200 hover:text-foreground focus-visible:text-foreground">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="#contacto" className="inline-flex min-h-11 items-center py-1 font-sans text-body-sm text-text-secondary transition-colors duration-200 hover:text-foreground focus-visible:text-foreground">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div className="order-5 lg:order-4">
            <h4 className="mb-4 font-sans text-overline uppercase text-text-tertiary">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/terminos" className="inline-flex min-h-11 items-center py-1 font-sans text-body-sm text-text-secondary transition-colors duration-200 hover:text-foreground focus-visible:text-foreground">
                  Términos de Servicio
                </a>
              </li>
              <li>
                <a href="/privacidad" className="inline-flex min-h-11 items-center py-1 font-sans text-body-sm text-text-secondary transition-colors duration-200 hover:text-foreground focus-visible:text-foreground">
                  Política de Privacidad
                </a>
              </li>
            </ul>
          </div>

          <div className="order-4 lg:order-1">
            <div className="mb-3 flex items-center gap-2 text-foreground">
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10 0L20 10L10 20L0 10Z" />
              </svg>
              <span className="font-sans text-body-sm font-semibold tracking-tight">
                {SITE_NAME}
              </span>
            </div>
            <p className="font-sans text-body-sm leading-relaxed text-text-secondary">
              Páginas web profesionales entregadas en 48 horas para profesionales colombianos.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="font-sans text-tiny text-text-tertiary">
            &copy; {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.
          </p>
          <p className="font-sans text-tiny text-text-tertiary">
            Hecho en Medellín, Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
