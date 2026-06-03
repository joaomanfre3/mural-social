import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Mural",
  description:
    "Seu mural pessoal de mensagens. Poste pensamentos curtos, curta e organize seu feed — uma mini rede social que roda só no seu navegador.",
  applicationName: "Mural",
  openGraph: {
    title: "Mural",
    description: "Seu mural pessoal de mensagens curtas. Roda só no seu navegador.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d1117",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
