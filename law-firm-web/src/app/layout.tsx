import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
});

const lato = Lato({ 
  weight: ['300', '400', '700'],
  subsets: ["latin"],
  variable: '--font-lato'
});

export const metadata: Metadata = {
  title: "Justicia & Asociados - Bufete de Abogados",
  description: "Servicios legales profesionales con experiencia en litigios, derecho corporativo y más.",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${lato.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
