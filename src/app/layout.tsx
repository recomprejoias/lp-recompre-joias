import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { EmotionProvider } from "@/lib/EmotionProvider";

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
  title: "Recompre Joias | Joias Reais por Valores Acessíveis",
  description:
    "A Recompre Joias oferece joias em Ouro 18k (750) e Prata 925, seminovas, cuidadosamente selecionadas, com preços acessíveis e autenticidade garantida.",
  applicationName: "Recompre Joias",
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
  authors: [{ name: "Recompre Joias" }],
  creator: "Recompre Joias",
  metadataBase: new URL("https://recomprejoias.com.br"),
  openGraph: {
    title: "Recompre Joias | Joias Reais por Valores Acessíveis",
    description:
      "Joias em Ouro 18k e Prata 925, seminovas, cuidadosamente selecionadas, com preços acessíveis e autenticidade garantida!",
    url: "https://recomprejoias.com.br",
    siteName: "Recompre Joias",
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
    title: "Recompre Joias | Joias Reais por Valores Acessíveis",
    description:
      "Joias em Ouro 18k e Prata 925, seminovas, cuidadosamente selecionadas, com preços acessíveis e autenticidade garantida!",
    images: [
      {
        url: "/open-graph.png",
        alt: "Recompre Joias",
      },
    ],
  },
  icons: {
    icon: [
      {
        url: "/favicon.png",
        type: "image/png",
      },
    ],
    shortcut: ["/favicon.png"],
    apple: [
      {
        url: "/favicon.png",
        type: "image/png",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
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
