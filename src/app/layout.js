import {ClerkProvider} from "@clerk/nextjs";
import { Bricolage_Grotesque, Playfair_Display, Caveat } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-ivypresto-fallback",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const caveat = Caveat({
  variable: "--font-lumios-fallback",
  subsets: ["latin"],
});

export const metadata = {
  title: "Diagnóstico do Lar - Casa Bela",
  description: "Descubra a vocação da sua casa.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${bricolage.variable} ${playfair.variable} ${caveat.variable} antialiased`}
      >
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}