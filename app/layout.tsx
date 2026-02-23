import type { Metadata, Viewport } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import MicrosoftClarity from "@/components/analytics/MicrosoftClarity";
import { SITE_URL } from "@/lib/conversion";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Techos Espinal | Impermeabilizacion, Goteras y Canoas en Medellin",
    template: "%s | Techos Espinal",
  },
  description:
    "Techos Espinal: impermeabilizacion, goteras, canoas y arreglo de techos en Medellin, Valle de Aburra y Antioquia. Agenda inspeccion tecnica por WhatsApp o llamada.",
  keywords: [
    "impermeabilizacion Medellin",
    "reparacion de goteras Medellin",
    "canoas y bajantes Valle de Aburra",
    "arreglo de techos Antioquia",
    "techos espinal",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE_URL,
    siteName: "Techos Espinal",
    title: "Techos Espinal | Impermeabilizacion, Goteras y Canoas en Medellin",
    description:
      "Servicio tecnico de impermeabilizacion y reparacion de techos en Medellin y municipios del Valle de Aburra.",
    images: [
      {
        url: "/video/hero-fallback.svg",
        width: 1600,
        height: 900,
        alt: "Techos Espinal en Medellin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Techos Espinal | Impermeabilizacion, Goteras y Canoas en Medellin",
    description:
      "Agenda inspeccion tecnica por WhatsApp o llamada. Cobertura en Medellin y Valle de Aburra.",
    images: ["/video/hero-fallback.svg"],
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
