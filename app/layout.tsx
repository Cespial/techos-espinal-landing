import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import MicrosoftClarity from "@/components/analytics/MicrosoftClarity";
import { SITE_URL, COMPANY_NAME } from "@/lib/conversion";
import { buildOrganizationNode, WEBSITE_ID, ORGANIZATION_ID } from "@/lib/business";

const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
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
        url: "/og/og-default.png",
        width: 1200,
        height: 630,
        alt: "Espinal Multiservicios en Medellín",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Espinal Multiservicios | Techos, Pintura y Plomería en Medellín",
    description:
      "Cotiza por WhatsApp o llamada. Cobertura en Medellín, Valle de Aburrá y Antioquia.",
    images: ["/og/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  // Etiqueta de Search Console (respaldo del registro TXT en el DNS de Vercel).
  verification: GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : undefined,
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "es-CO": SITE_URL,
      "x-default": SITE_URL,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#ea580c",
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
        <meta name="geo.position" content="6.2518;-75.5636" />
        <meta name="ICBM" content="6.2518, -75.5636" />
        <link rel="preload" href="/video/slow-majestic-poster.jpg" as="image" fetchPriority="high" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="preconnect" href="https://wa.me" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": WEBSITE_ID,
              name: COMPANY_NAME,
              url: SITE_URL,
              inLanguage: "es-CO",
              publisher: { "@id": ORGANIZATION_ID },
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
              ...buildOrganizationNode(),
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
