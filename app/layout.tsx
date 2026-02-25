import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import MicrosoftClarity from "@/components/analytics/MicrosoftClarity";
import { SITE_URL, COMPANY_NAME, PHONE_E164 } from "@/lib/conversion";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Espinal Multiservicios | Techos, Pintura y Plomería en Medellín",
    template: "%s | Espinal Multiservicios",
  },
  description:
    "Espinal Multiservicios en Medellín y Valle de Aburrá: techos y cubiertas, pintura y acabados, plomería. Cotiza por WhatsApp, llamada o formulario corto.",
  keywords: [
    "multiservicios Medellín",
    "techos y cubiertas Medellín",
    "pintura y acabados Valle de Aburrá",
    "plomería Antioquia",
    "espinal multiservicios",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE_URL,
    siteName: "Espinal Multiservicios",
    title: "Espinal Multiservicios | Techos, Pintura y Plomería en Medellín",
    description:
      "Soluciones para hogares y negocios en Medellín, Valle de Aburrá y Antioquia según disponibilidad.",
    images: [
      {
        url: "/video/slow-majestic-poster.jpg",
        width: 1600,
        height: 900,
        alt: "Espinal Multiservicios en Medellín",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Espinal Multiservicios | Techos, Pintura y Plomería en Medellín",
    description:
      "Cotiza por WhatsApp o llamada. Cobertura en Medellín, Valle de Aburrá y Antioquia.",
    images: ["/video/slow-majestic-poster.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "es-CO": SITE_URL,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CO" className={manrope.variable}>
      <head>
        <meta name="geo.region" content="CO-ANT" />
        <meta name="geo.placename" content="Medellín" />
        <link rel="preload" href="/video/slow-majestic-poster.jpg" as="image" fetchPriority="high" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="preconnect" href="https://wa.me" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: COMPANY_NAME,
              url: SITE_URL,
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: COMPANY_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}/logo-espinal.svg`,
              contactPoint: {
                "@type": "ContactPoint",
                telephone: PHONE_E164,
                contactType: "customer service",
                availableLanguage: "Spanish",
                areaServed: "CO",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Medellín",
                addressRegion: "Antioquia",
                addressCountry: "CO",
              },
              sameAs: [
                SITE_URL,
                `https://wa.me/573007336333`,
              ],
              knowsAbout: [
                "Reparación de techos",
                "Impermeabilización de cubiertas",
                "Reparación de goteras",
                "Pintura interior y exterior",
                "Resanes y acabados de paredes",
                "Tratamiento de humedad en paredes",
                "Reparación de fugas de agua",
                "Destape de desagües",
                "Cambio de grifería",
                "Mantenimiento del hogar",
                "Plomería residencial y comercial",
              ],
            }),
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased">
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>

        {children}
        <GoogleAnalytics />
        <MicrosoftClarity />
      </body>
    </html>
  );
}
