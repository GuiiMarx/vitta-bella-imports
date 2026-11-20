import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vitta Bella Imports | Perfumes Árabes Importados",
  description:
    "Sofisticação, elegância e perfumaria árabe. Coleções Asad, Yara e Fakhar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${playfair.variable} ${montserrat.variable} font-montserrat antialiased`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
