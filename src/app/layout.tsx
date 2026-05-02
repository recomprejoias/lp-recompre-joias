import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { EmotionProvider } from "@/lib/EmotionProvider";

const siteUrl = new URL("https://recomprejoias.com.br");
const siteName = "Recompre Joias";
const siteTitle = "Recompre Joias | Joias Reais por Valores Acessíveis";
const siteDescription =
  "A Recompre Joias oferece joias em Ouro 18k (750) e Prata 925, seminovas, cuidadosamente selecionadas, com preços acessíveis e autenticidade garantida.";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "joias",
    "ouro 18k",
    "prata 925",
    "joias seminovas",
    "joias de segunda mão",
    "recompre joias",
    "joias acessíveis",
    "joias autênticas",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  metadataBase: siteUrl,
  alternates: {
    canonical: "/",
  },
  category: "shopping",
  classification: "Joias seminovas em ouro 18k e prata 925",
  referrer: "origin-when-cross-origin",
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName,
    images: [
      {
        url: "/open-graph.png",
        width: 1200,
        height: 630,
        alt: "Recompre Joias",
        type: "image/png",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/open-graph.png",
        alt: "Recompre Joias",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#F2EFE9",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${playfair.variable}`}>
      <body><EmotionProvider>{children}</EmotionProvider></body>
    </html>
  );
}
