import type { Metadata, Viewport } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import MicrosoftClarity from "@/components/analytics/MicrosoftClarity";
import "./globals.css";

const playfair = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tupaginaen48.com"),
  title: {
    default: "Tu Página en 48 — Páginas Web Profesionales en 48 Horas | Colombia",
    template: "%s | Tu Página en 48",
  },
  description:
    "Diseñamos y entregamos tu página web profesional en 48 horas. Desde $1.000.000 COP. Alta conversión para profesionales y emprendedores en Medellín, Bogotá y toda Colombia.",
  keywords: [
    "páginas web Colombia",
    "diseño web Medellín",
    "página web rápida",
    "página web profesional Colombia",
    "diseño web económico",
    "landing page Colombia",
    "crear página web negocio",
    "página web para psicólogos",
    "página web para abogados",
    "página web para restaurantes",
    "diseño web Bogotá",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://tupaginaen48.com",
    siteName: "Tu Página en 48",
    title: "Tu Página en 48 — Páginas Web Profesionales en 48 Horas",
    description: "Páginas web de alta conversión entregadas en 48h. Desde $1M COP.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tu Página en 48",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tu Página en 48 — Páginas Web Profesionales en 48 Horas",
    description: "Páginas web de alta conversión entregadas en 48h. Desde $1M COP.",
    images: ["/og-image.png"],
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
    canonical: "https://tupaginaen48.com",
    languages: {
      "es-CO": "https://tupaginaen48.com",
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
    <html lang="es-CO" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="preconnect" href="https://wa.me" />
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
